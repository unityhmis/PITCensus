import pytest
from base64 import b64encode
import threading
import uuid
import time
import random
import flask
from pitapp import database
import pitapp.routes
from pitapp.config import PitConfig

class StressTestFixture:
    def __init__(self):
        stress_test_config = PitConfig.copy()
        stress_test_config['database']['pityear'] = 'stress_test'
        self.db = database.MongoDatabase(stress_test_config)
        self.db.connect()

@pytest.fixture
def stress_test_fixture():
    return StressTestFixture()

# --------------------------------------------

def thread_test_function(**kwargs):
    flask_app = kwargs["flask_app"]
    headers = {
        "x-api-key" : PitConfig['web']['dataauthkey'],
    }
    with flask_app.test_client() as client:
        for _ in range(0, 50):
            time.sleep(random.random() * 0.05)
            dummy_record = {"first_name": uuid.uuid4(), "last_name": "more_testing"}
            response = client.post('/completedSurvey', headers=headers, data=dummy_record)
            assert response.status_code == 200

def test_multiple_threads_can_use_submit_api(stress_test_fixture):
    app = flask.Flask(__name__)
    app.testing = True
    pitapp.routes.PitRoutes(app, stress_test_fixture.db, None, flask.make_response, lambda *args: None)

    before_record_count = stress_test_fixture.db.getTotalRecordCount()
    threads = [ ]
    with app.test_request_context():
        for _ in range(0, 5):
            new_thread = threading.Thread(None, thread_test_function, None, kwargs={"flask_app": app})
            new_thread.start()
            threads.append(new_thread)
    for thread in threads:
        thread.join()

    after_record_count = stress_test_fixture.db.getTotalRecordCount()
    assert after_record_count == before_record_count + 250
