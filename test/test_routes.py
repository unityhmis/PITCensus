import pytest
import pitmocks
import flask
from pitapp import routes

def empty_template_renderer(template_name, context=None):
    pass

def empty_response_handler(response_content, return_code):
    pass

class PitTestFixture:
    def __init__(self):
        self.flask = pitmocks.mock_flask()
        self.database = pitmocks.create_mock_database()
        self.routes = routes.PitRoutes(self.flask, self.database, None, 
            empty_response_handler, empty_template_renderer)

@pytest.fixture
def pit_test_fixture():
    return PitTestFixture()

# --------------------------------------------------------------------------- #

def test_adds_corret_number_of_routes(pit_test_fixture):
    assert len(pit_test_fixture.flask.added_rules) == 6
    
def test_adds_correct_endpoints(pit_test_fixture):
    expected_rules = [
        "/",
        "/admin",
        "/completedSurvey",
        "/getSurveyCount",
        "/getLastSurveys/<amount>",
        "/getAllSurveys"
    ]
    assert pit_test_fixture.flask.added_rules == expected_rules

def test_adds_correct_http_methods(pit_test_fixture):
    expected_methods = {
        "/": ["GET"],
        "/admin": ["GET"],
        "/completedSurvey": ["POST"],
        "/getSurveyCount": ["GET"],
        "/getLastSurveys/<amount>": ["GET"],
        "/getAllSurveys": ["GET"]
    }
    assert pit_test_fixture.flask.added_methods == expected_methods

def test_getLastSurveys_makes_correct_database_calls(pit_test_fixture):
    pit_test_fixture.routes.getLastSurveys(100)
    pit_test_fixture.database.getMostRecentRecords.assert_called_with(100)

def test_getSurveyCount_makes_correct_database_calls(pit_test_fixture):
    pit_test_fixture.routes.getSurveyCount()
    pit_test_fixture.database.getTotalRecordCount.assert_called()

def test_home_page_requires_auth(pit_test_fixture):
    app = flask.Flask(__name__)
    app.testing = True
    with app.test_request_context():
        response = pit_test_fixture.routes.index()
        assert response is None

def test_admin_page_requires_auth(pit_test_fixture):
    app = flask.Flask(__name__)
    app.testing = True
    with app.test_request_context():
        response = pit_test_fixture.routes.admin()
        assert response.status_code == 401

def test_api_endpoints_require_auth(pit_test_fixture):
    app = flask.Flask(__name__)
    app.testing = True
    with app.test_request_context():
        assert pit_test_fixture.routes.completedSurvey_public().status_code == 401
        assert pit_test_fixture.routes.getSurveyCount_public().status_code == 401
        assert pit_test_fixture.routes.getLastSurveys_public(1).status_code == 401