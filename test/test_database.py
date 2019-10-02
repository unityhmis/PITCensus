import pytest
from pitapp import database

def test_database_returns_correct_connection_string():
    mock_pit_config = {
        'database' : {
            'host': "some_ip_here",
            'port': 1337,
            'username': 'user',
            'password': 'pass',
            'table_name': 'my_table'
        }
    }
    db = database.MongoDatabase(mock_pit_config)
    connection_string = db.getConnectionString()
    assert connection_string == "mongodb://user:pass@some_ip_here:1337/my_table"