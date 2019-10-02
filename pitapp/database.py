#!/usr/bin/env python
# Functions to handle database connections
import pymongo

class MongoDatabase:
    """
    Implements a database connection with a MongoDB instance
    """
    def __init__(self, config):
        self._client = None
        self._current_collection = None
        self._config = config

    def connect(self):
        self._client = self._getDB()
        collection_year = self._config['database']['pityear']
        self._current_collection = self._client["pit"][collection_year]

    def findRecords(self, queryObject):
        return self._current_collection.find(queryObject)

    def getTotalRecordCount(self):
        return self._current_collection.count()

    def addNewRecord(self, record):
        self._current_collection.insert(record)

    def getMostRecentRecords(self, number_of_records):
        results = list(self._current_collection.find().sort("_id", -1).limit(int(number_of_records)))
        return results

    def getConnectionString(self):
        host = self._config['database']['host']
        port = int(self._config['database']['port'])
        username = self._config['database']['username']
        password = self._config['database']['password']
        table_name = self._config['database']['table_name']
        return "mongodb://{}:{}@{}:{}/{}".format(username, password, host, port, table_name)

    def getCurrentCollection(self):
        return self._current_collection

    def _getDB(self):
        return pymongo.MongoClient(self.getConnectionString())
