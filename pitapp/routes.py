import flask
from flask import Flask, request, render_template, make_response, url_for
from authentication import requires_auth, requires_api_key
from chart_generator import ChartGenerator
from config import PitConfig
import sys, json
import csv_writer
from bson import json_util

class PitRoutes:
	def __init__(self, flask, database, config, 
				make_response_handler, render_template_handler):
		self._database = database
		self._config = config
		self._make_response = make_response_handler
		self._render_template = render_template_handler
		self._chart_generator = ChartGenerator(database)
		flask.add_url_rule("/", "index", methods=["GET"], view_func=self.index)
		flask.add_url_rule("/admin", "admin", methods=['GET'], view_func=self.admin)
		flask.add_url_rule("/completedSurvey", "completedSurvey", methods=["POST"], view_func=self.completedSurvey_public)
		flask.add_url_rule("/getSurveyCount", "getSurveyCount", methods=['GET'], view_func=self.getSurveyCount_public)
		flask.add_url_rule("/getLastSurveys/<amount>", "getLastSurveys", methods=['GET'], view_func=self.getLastSurveys_public)
		flask.add_url_rule("/getAllSurveys", "getAllSurveys", methods=['GET'], view_func=self.getAllSurveys_public)

	# ------------------- Web Pages ------------------- #

	def index(self):
		return self._render_template("index.html")

	@requires_auth(PitConfig['web']['adminusername'], PitConfig['web']['adminpassword'])
	def admin(self):
		pie_charts = self._chart_generator.get_pie_chart_list()
		survey_count = self.getSurveyCount().get_data()
		return self._render_template('admin.html', pie_charts=pie_charts, surveys=survey_count, config=PitConfig)

	# ------------------- Public Rest API Endpoints ------------------- #

	@requires_api_key(PitConfig['web']['dataauthkey'])
	def completedSurvey_public(self):
		return self.completedSurvey()

	@requires_api_key(PitConfig['web']['dataauthkey'])
	def getSurveyCount_public(self):
		return self.getSurveyCount()

	@requires_api_key(PitConfig['web']['dataauthkey'])
	def getLastSurveys_public(self, amount):
		return self.getLastSurveys(amount)

	@requires_api_key(PitConfig['web']['dataauthkey'])
	def getAllSurveys_public(self):
		return self.getAllSurveys()

	# ------------------- Rest API Implementation ------------------- #

	def completedSurvey(self):
		self._database.addNewRecord(dict(request.form))
		return self._make_response("OK", 200)

	def getSurveyCount(self):
		count = self._database.getTotalRecordCount()
		return self._make_response(str(count), 200)

	def getLastSurveys(self, amount):
		results = self._database.getMostRecentRecords(amount)
		return self._make_response(json.dumps(results, default=json_util.default), 200)

	def getAllSurveys(self):
		count = self._database.getTotalRecordCount()
		results = self._database.getMostRecentRecords(count)
		stringified = csv_writer.getCsvString(json.dumps(results, default=json_util.default))
		return self._make_response(stringified, 200)
