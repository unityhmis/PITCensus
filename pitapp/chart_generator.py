#!/usr/bin/env python
import database
import pygal
from collections import defaultdict
import datetime
import numpy as np
import math

class ChartGenerator:
	def __init__(self, database):
		self._database = database

	def get_pie_chart_list(self):
		return [
			self.get_veteran_chart(),
			self.get_deployment_site_chart(),
			self.get_age_chart(),
			self.get_income_chart()
			#Add more pie charts here
		]

	def get_deployment_site_chart(self):
		labels = {
			"Brandon - First Presbyterian Church of Brandon": "Brandon",
			"Downtown - Hyde Park United Methodist": "Hyde Park",
			"West Tampa - West Tampa Resource Center": "West Tampa",
			"Plant City - Plant City Resource Center": "Plant City",
			"Ruskin - Ruskin (SouthShore) Resource Center": "Ruskin",
			"Town 'N County - Hillsborough County Sheriffs Office Substation": "Town 'N County",
			"University Area - University Community Resource Center": "University Area",
			"West Shore - Florida Bahamas Synod": "West Shore",
			"Youth Count - Camelot Community Center": "Camelot",
			"Hillsborough County Public Schools": "Hillsbo. Schools",
			"Hillsborough County PARKS": "Hillsbo. PARKS",
			"The Spring of Tampa Bay": "Tampa Spring",
			"Other supportive service provider": "Other Provider"
		}
		return self.get_pie_chart('How many surveys at each deployment site?', "deployment_site", labels)

	def get_veteran_chart(self):
		labels = {
			"yes": "Veteran",
			"no": "Not Veteran"
		}
		return self.get_pie_chart('Are people experiencing homelessness veterans?', "veteran_status", labels)

	def get_income_chart(self):
		labels = {
			"Yes": "Has Income",
			"No": "No Income"
		}
		return self.get_pie_chart('Do people experiencing homelessness receive income?', "income", labels)

	def get_age_chart(self):
		graph_bins = [0, 16, 25, 62, 1000]
		gatherer = AgeDataGatherer()
		age_bins = gatherer.get_homeless_age_buckets(self._database, graph_bins)
		labels = {
			"0": "0-15",
			"16": "16-24",
			"25": "25-61",
			"62": "62+"
		}
		return self.get_pie_chart_given_answers("How old are people experiencing homelessness?", age_bins, labels)

	# Returns a pie chart counting answers for "surveyQuestion"
	# answerLabels: Dictionary for human-readable labels from survey answer keys
	def get_pie_chart(self, title, surveyQuestion, answerLabels):
		answers = self.get_survey_results(surveyQuestion)
		return self.get_pie_chart_given_answers(title, answers, answerLabels)

	# Returns a pie chart given a set of key-value pairs of an answer an count
	# answerAndCountDict: Dictionary containing the questions and count for that question
	# answerLabels: Dictionary for human-readable labels from survey answer keys
	def get_pie_chart_given_answers(self, title, answerAndCountDict, answerLabels):
		style = pygal.style.Style(
			background='transparent',
			title_font_size=30,
			tooltip_font_size=20,
			legend_font_size=22,
			font_family='Arial',
			colors=['#be0d34', '#d95e18', '#f6cf46', '#000000', '#e8972d', '#f7e76c', '#693B13', '#B98A7E']
		)
		config = pygal.Config(
			truncate_legend=-1
			# Add chart configuration options here.
		)
		pie_chart = pygal.Pie(config=config, style=style)
		pie_chart.title = title

		answerAndCountList = answerAndCountDict.items()
		answerAndCountList.sort()
		for answer, count in answerAndCountList:
			label = answerLabels[answer] if answer in answerLabels else answer
			pie_chart.add(label, count)

		total_count = sum(pair[1] for pair in answerAndCountList)

		return pie_chart, total_count

	#Searches database for a quesion and returns a dictionary of the count of the answers
	def get_survey_results(self, surveyQuestion):
		resultsDict = defaultdict(int)
		results = self._database.findRecords({surveyQuestion:{'$exists': True}})
		for result in results:
			answer = result[surveyQuestion][0]  #TODO: Questions with multiple answers?
			resultsDict[answer] += 1
		return resultsDict

class AgeDataGatherer:
	"""
	Assists in the querying, gathering, and grouping of possible age data from a survey,
	including age number, birth date, and age of kids or others.
	"""

	def get_homeless_age_buckets(self, database, graph_bins):
		all_ages = self._query_and_filter_homeless_ages(database)
		bin_count, bin_edges = np.histogram(all_ages, graph_bins)
		ageCountMap = { }
		for bin in zip(bin_edges, bin_count):
			ageCountMap[str(bin[0])] = int(bin[1])
		return ageCountMap

	def _query_and_filter_homeless_ages(self, database):
		query = {
			"$or": [
				{ "dob[dob][year]": { "$exists": True} },
				{ "age": { "$exists": True} },
				{ "homeless_children" : { "$gt": "0"} },
				{ "homeless_adults" : { "$gt": "0"} }
			]
		}
		mongo_results = database.findRecords(query)
		homeless_ages = map(self._get_homeless_ages, mongo_results)
		flat_homeless_ages = self._flatten_list(homeless_ages)
		return flat_homeless_ages

	def _get_homeless_ages(self, record):
		results = [ ]
		get_int = lambda dict, key : int(dict[key][0])
		if "age" in record:
			results.append(get_int(record, "age"))
		elif "dob[dob][year]" in record:
			birth_date = datetime.datetime(get_int(record, "dob[dob][year]"), 1, 1)
			survey_date = self._get_survey_date(record)
			age = int(math.ceil((survey_date - birth_date).days / 365))
			results.append(age)
		if "homeless_children" in record:
			results.append(self._get_child_homeless_ages(record, "homeless_children_info"))
		if "homeless_adults" in record:
			results.append(self._get_child_homeless_ages(record, "homeless_adults_info"))
		return results

	def _get_survey_date(self, record):
		if "survey_date" in record:
			survey_date_us_format = record["survey_date"][0]
			return datetime.datetime.strptime(survey_date_us_format, "%m/%d/%Y")
		else:
			return datetime.datetime.today()

	def _get_child_homeless_ages(self, record, key_base):
		results = [ ]
		for i in range(100):
			full_key = "{0}[{1}][age]".format(key_base, i)
			if not full_key in record:
				break
			results.append(int(record[full_key][0]))
		return results

	def _flatten_list(self, lis):
		"""Given a list, possibly nested to any level, return it flattened."""
		new_lis = []
		for item in lis:
			if type(item) == type([]):
				new_lis.extend(self._flatten_list(item))
			else:
				new_lis.append(item)
		return new_lis
