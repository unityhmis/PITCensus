from mock import Mock, MagicMock

# A class to mock the flask.Flask object.
class mock_flask:
    def __init__(self):
        self.added_rules = []
        self.added_methods = {}

    def add_url_rule(self, rule, endpoint=None, view_func=None,
                     provide_automatic_options=None, **options):
        self.added_rules.append(rule)
        self.added_methods[rule] = options['methods']

# A class to mock the PIT Database connection object.
def create_mock_database():
    db = Mock()
    db.findRecords = MagicMock()
    db.getTotalRecordCount = MagicMock()
    db.addNewRecord = MagicMock()
    db.getMostRecentRecords = MagicMock(return_value=90)
    return db
