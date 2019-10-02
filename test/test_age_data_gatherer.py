import pytest
from pitapp.chart_generator import AgeDataGatherer

ASHLEY_GRAPH_BINS = [0, 16, 25, 62, 10000]

class MockAgeNumberDatabase:
    def findRecords(self, query):
        data = [
            { u'age': [u'0'], u'survey_time': [u'18:59'], u'survey_date': [u'1/27/2019'] },
            { u'age': [u'16'] },
            { u'age': [u'36'], u'survey_date': [u'1/27/2019'] },
            { u'age': [u'5'] },
            { u'age': [u'99'] },
            { u'age': [u'-10'] },
            { u'age': [u'22'], u'dob[dob][year]': [u'thisIsIgnoredOrElseAnExceptionWillOccur'] }
        ]
        return data

class MockAgeDateDatabase:
    def findRecords(self, query):
        data = [
            { u'dob[dob][month]': [u'May'], u'survey_date': [u'1/27/2019'], u'dob[dob][year]': [u'1988'] },
            { u'survey_date': [u'1/27/2119'], u'dob[dob][year]': [u'10'] },
            { u'survey_date': [u'1/27/3019'], u'dob[dob][year]': [u'2018'] },
            { u'dob[dob][year]': [u'1995'] },
        ]
        return data

class MockChildAgeDatabase:
    def findRecords(self, query):
        data = [
            { u'homeless_adults_info[1][age]': [u'4'],
              u'homeless_children_info[1][gender]': [u'Male'],
              u'homeless_children': [u'3'],
              u'homeless_adults': [u'2'],
              u'homeless_children_info[2][age]': [u'13'],
              u'homeless_children_info[1][age]': [u'6'],
              u'homeless_children_info[0][age]': [u'9'],
              u'homeless_adults_info[0][age]': [u'8'],
              u'volunteer': [u'lol']
            }
        ]
        return data

class MockEmptyDatabase:
    def findRecords(self, query):
        return [ ]

def test_age_data_gather_returns_expected_bins_with_age_numbers():
    mock_database = MockAgeNumberDatabase()
    gatherer = AgeDataGatherer()
    age_bins = gatherer.get_homeless_age_buckets(mock_database, ASHLEY_GRAPH_BINS)
    assert age_bins == {'0': 2, '16': 2, '25': 1, '62': 1}

def test_age_data_gather_returns_expected_bins_with_age_dates():
    mock_database = MockAgeDateDatabase()
    gatherer = AgeDataGatherer()
    age_bins = gatherer.get_homeless_age_buckets(mock_database, ASHLEY_GRAPH_BINS)
    assert age_bins == {'0': 0, '16': 1, '25': 1, '62': 2}

def test_age_data_gather_returns_expected_bins_with_child_ages():
    mock_database = MockChildAgeDatabase()
    gatherer = AgeDataGatherer()
    age_bins = gatherer.get_homeless_age_buckets(mock_database, ASHLEY_GRAPH_BINS)
    assert age_bins == {'0': 5, '16': 0, '25': 0, '62': 0}

def test_age_data_gather_returns_expected_bins_with_no_data():
    mock_database = MockEmptyDatabase()
    gatherer = AgeDataGatherer()
    age_bins = gatherer.get_homeless_age_buckets(mock_database, ASHLEY_GRAPH_BINS)
    assert age_bins == {'0': 0, '16': 0, '25': 0, '62': 0}