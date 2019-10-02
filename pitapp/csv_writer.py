import pandas as pandas
import re

def listOfOneBecomesJustThatElement(str):
    return re.sub('\[(([^,]*)+)\]', '\\1', str)

def getCsvString(json):
    data = pandas.read_json(json)
    csvString = data.to_csv(encoding='utf-8')
    result = listOfOneBecomesJustThatElement(csvString)
    return result