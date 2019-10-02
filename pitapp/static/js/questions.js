var surveyData = {
   pages: [
      {
         name: "observation",
         questions: [
            {
               type: "radiogroup",
               name: "on_observation",
               title: "(Volunteer question) Was this survey completed on observation?",
               choices: [
                  {
                     value: "yes",
                     text: "Yes"
                  },
                  {
                     value: "no",
                     text: "No"
                  }
               ]
            }
         ]
      },
      {
         name: "qualification",
         questions: [
            {
               type: "radiogroup",
               name: "completed_survey",
               title: "Have you completed this survey earlier today?",
               choices: [
                  {
                     value: "yes",
                     text: "Yes"
                  },
                  {
                     value: "no",
                     text: "No"
                  }
               ]
            },
            {
               type: "radiogroup",
               name: "where_stay_last",
               title: "Where did you stay last night?",
               choices: [
                  {
                     value: "nonHomelessSituation",
                     text: "Non-Homeless situation. Examples include: Rental apartment/home, permanent supportive housing, long term care or nursing home, residential project or halfway house, or hotel/motel paid for by self."
                  },
                  {
                     value: "notFit",
                     text: "Place not meant for habitation (car, street, abandoned building, etc.)"
                  },
                  {
                     value: "hotel",
                     text: "Hotel/Motel paid for by an agency or organization"
                  },
                  {
                     value: "transitionalHousingName",
                     text: "Transitional Housing"
                  },
                  {
                     value: "psychiatric90",
                     text: "Psychiatric facility"
                  },
                  {
                     value: "substanceAbuse90",
                     text: "Substance abuse treatment facility"
                  },
                  {
                     value: "hospital90",
                     text: "Hospital"
                  },
                  {
                     value: "jail90",
                     text: "Jail, prison, detention facility"
                  },
                  {
                     value: "emergencyShelterName",
                     text: "Emergency shelter"
                  },
                  {
                     value: "inOwnApartment",
                     text: "In my own house/apartment/unit"
                  },
                  {
                     value: "fosterCareHomeOrGroup",
                     text: "Foster care home or foster care group home"
                  },
                  {
                     value: "withFamilyTemporarily",
                     text: "Temporarily staying with family"
                  },
                  {
                     value: "withFriendsOrSignificantOtherTemporarily",
                     text: "Temporarily staying with friends or a significant other"
                  },
                  {
                     value: "withFamilyPermanantly",
                     text: "Permanently staying with family"
                  },
                  {
                     value: "withFriendsOrSignificantOtherPermanately",
                     text: "Permanently staying with friends or significant other"
                  }
               ]
            },
            {
               type: "radiogroup",
               name: "older_than_25_and_not_homeless",
               visibleIf: "{currently_homeless} = \"no\" or ({where_stay_last} <> \"notFit\" and {where_stay_last} <> \"emergencyShelterName\" and {where_stay_last} <> \"transitionalHousingName\" and {where_stay_last} <> \"hotel\" and {where_stay_last} notempty)",
               title: "Are you 25 years of age or older?",
               choices: [
                  {
                     value: "yes",
                     text: "Yes"
                  },
                  {
                     value: "no",
                     text: "No"
                  }
               ]
            },
            {
               type: "text",
               name: "name_facility",
               visible: false,
               title: "Name of Facility:"
            }
         ]
      },
      {
         name: "generalquestions",
         questions: [
            {
               type: "text",
               name: "first_and_last_name",
               title: "Please tell me your first and last name:"
            },
            {
               type: "text",
               name: "ssn",
               inputType: "number",
               title: "Last 4 of your SSN:"
            },
            {
               type: "dropdown",
               name: "age",
               title: "What is your age?",
               choices: [
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17",
                  "18",
                  "19",
                  "20",
                  "21",
                  "22",
                  "23",
                  "24",
                  "25",
                  "26",
                  "27",
                  "28",
                  "29",
                  "30",
                  "31",
                  "32",
                  "33",
                  "34",
                  "35",
                  "36",
                  "37",
                  "38",
                  "39",
                  "40",
                  "41",
                  "42",
                  "43",
                  "44",
                  "45",
                  "46",
                  "47",
                  "48",
                  "49",
                  "50",
                  "51",
                  "52",
                  "53",
                  "54",
                  "55",
                  "56",
                  "57",
                  "58",
                  "59",
                  "60",
                  "61",
                  "62",
                  "63",
                  "64",
                  "65",
                  "66",
                  "67",
                  "68",
                  "69",
                  "70",
                  "71",
                  "72",
                  "73",
                  "74",
                  "75",
                  "76",
                  "77",
                  "78",
                  "79",
                  "80",
                  "81",
                  "82",
                  "83",
                  "84",
                  "85",
                  "86",
                  "87",
                  "88",
                  "89",
                  "90",
                  "91",
                  "92",
                  "93",
                  "94",
                  "95",
                  "96",
                  "97",
                  "98",
                  "99",
                  "100"
               ]
            },
            {
               type: "matrixdropdown",
               name: "dob",
               title: "What is your date of birth? (optional)",
               columns: [
                  {
                     name: "month",
                     title: "Month",
                     cellType: "dropdown",
                     choices: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"
                     ]
                  },
                  {
                     name: "year",
                     title: "Year",
                     choices: [
                        "1900",
                        "1901",
                        "1902",
                        "1903",
                        "1904",
                        "1905",
                        "1906",
                        "1907",
                        "1908",
                        "1909",
                        "1910",
                        "1911",
                        "1912",
                        "1913",
                        "1914",
                        "1915",
                        "1916",
                        "1917",
                        "1918",
                        "1919",
                        "1920",
                        "1921",
                        "1922",
                        "1923",
                        "1924",
                        "1925",
                        "1926",
                        "1927",
                        "1928",
                        "1929",
                        "1930",
                        "1931",
                        "1932",
                        "1933",
                        "1934",
                        "1935",
                        "1936",
                        "1937",
                        "1938",
                        "1939",
                        "1940",
                        "1941",
                        "1942",
                        "1943",
                        "1944",
                        "1945",
                        "1946",
                        "1947",
                        "1948",
                        "1949",
                        "1950",
                        "1951",
                        "1952",
                        "1953",
                        "1954",
                        "1955",
                        "1956",
                        "1957",
                        "1958",
                        "1959",
                        "1960",
                        "1961",
                        "1962",
                        "1963",
                        "1964",
                        "1965",
                        "1966",
                        "1967",
                        "1968",
                        "1969",
                        "1970",
                        "1971",
                        "1972",
                        "1973",
                        "1974",
                        "1975",
                        "1976",
                        "1977",
                        "1978",
                        "1979",
                        "1980",
                        "1981",
                        "1982",
                        "1983",
                        "1984",
                        "1985",
                        "1986",
                        "1987",
                        "1988",
                        "1989",
                        "1990",
                        "1991",
                        "1992",
                        "1993",
                        "1994",
                        "1995",
                        "1996",
                        "1997",
                        "1998",
                        "1999",
                        "2000",
                        "2001",
                        "2002",
                        "2003",
                        "2004",
                        "2005",
                        "2006",
                        "2007",
                        "2008",
                        "2009",
                        "2010",
                        "2011",
                        "2012",
                        "2013",
                        "2014",
                        "2015",
                        "2016",
                        "2017",
                        "2018",
                        "2019"
                     ]
                  }
               ],
               rows: [
                  {
                     value: "dob",
                     text: "DOB"
                  }
               ]
            },
            {
               type: "radiogroup",
               name: "gender",
               title: "Are you:",
               choices: [
                  {
                     value: "male",
                     text: "Male"
                  },
                  {
                     value: "female",
                     text: "Female"
                  },
                  {
                     value: "mtf",
                     text: "Transgender M to F"
                  },
                  {
                     value: "ftm",
                     text: "Transgender F to M"
                  },
                  {
                     value: "other",
                     text: "Gender Non-Conforming"
                  }
               ]
            },
            {
               type: "radiogroup",
               name: "hispanic",
               title: "Are you Hispanic or Latino?",
               choices: [
                  {
                     value: "yes",
                     text: "Yes"
                  },
                  {
                     value: "no",
                     text: "No"
                  }
               ]
            },
            {
               type: "checkbox",
               name: "race",
               title: "What is your race?",
               hasOther: true,
               choices: [
                  {
                     value: "americanIndian",
                     text: "American Indian/Alaskan Native"
                  },
                  {
                     value: "asian",
                     text: "Asian"
                  },
                  {
                     value: "black",
                     text: "Black/African American"
                  },
                  {
                     value: "native",
                     text: "Native Hawaiian/Other Pacific Islander"
                  },
                  {
                     value: "white",
                     text: "White"
                  }
               ]
            },
            {
               type: "radiogroup",
               name: "homelessness_duration",
               title: "How long have you been in this episode of homelessness?",
               choices: [
                  {
                     value: "oneWeek",
                     text: "1 week or less"
                  },
                  {
                     value: "weekToMonth",
                     text: "more than 1 week, but less than 1 month"
                  },
                  {
                     value: "oneToThreeMonths",
                     text: "1 - 3 months"
                  },
                  {
                     value: "threeMonthsToYear",
                     text: "more than 3 months, but less than 1 year"
                  },
                  {
                     value: "yearOrMore",
                     text: "1 year or longer"
                  }
               ]
            },
            {
               type: "radiogroup",
               name: "shelter_frequency",
               title: "How many times have you been on the streets, Emergency Shelter, or Safe Haven in the past three years including today?",
               choices: [
                  {
                     value: "never",
                     text: "Never in the 3 years"
                  },
                  {
                     value: "one",
                     text: "One Time"
                  },
                  {
                     value: "two",
                     text: "Two Times"
                  },
                  {
                     value: "three",
                     text: "Three Times"
                  },
                  {
                     value: "fourOrMore",
                     text: "Four or More Times"
                  }
               ]
            },
            {
               type: "dropdown",
               name: "shelter_months",
               title: "Total number of months you have been homeless on the street, Emergency Shelter, or Safe Haven in the past three years?",
               choices: [
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17",
                  "18",
                  "19",
                  "20",
                  "21",
                  "22",
                  "23",
                  "24",
                  "25",
                  "26",
                  "27",
                  "28",
                  "29",
                  "30",
                  "31",
                  "32",
                  "33",
                  "34",
                  "35",
                  "36"
               ]
            },
            {
               type: "radiogroup",
               name: "county_duration",
               title: "How long have you been staying in Hillsborough County?",
               choices: [
                  {
                     value: "oneWeekOrLess",
                     text: "1 week or less"
                  },
                  {
                     value: "weekToMonth",
                     text: "More than 1 week, but less than 1 month"
                  },
                  {
                     value: "oneToThreeMonths",
                     text: "1 to 3 months"
                  },
                  {
                     value: "moreThanThreeMonthsLessThanYear",
                     text: "More than 3 months, but less than 1 year"
                  },
                  {
                     value: "yearOrMore",
                     text: "1 year or longer"
                  }
               ]
            },
            {
               type: "radiogroup",
               name: "homelessness_cause",
               title: "What is the primary cause of your homelessness?",
               hasOther: true,
               choices: [
                  {
                     value: "finance",
                     text: "Employment/financial reasons"
                  },
                  {
                     value: "family",
                     text: "Family problems"
                  },
                  {
                     value: "immigration",
                     text: "Recent immigration"
                  },
                  {
                     value: "housing",
                     text: "Housing issues"
                  },
                  {
                     value: "disaster",
                     text: "Natural/other disasters"
                  },
                  {
                     value: "medical",
                     text: "Medical/disability problems"
                  },
                  {
                     value: "ranOrKickedFromHome",
                     text: "Ran away or kicked out of home"
                  },
                  {
                     value: "sexualIdentityConflicts",
                     text: "Conflicts around sexual identity or orientation"
                  }
               ]
            },
            {
               type: "radiogroup",
               name: "homelessness_for_domestic_violence",
               title: "Are you experiencing homelessness because you are currently fleeing domestic violence, dating violence, sexual assault, or stalking?",
               choices: [
                  {
                     value: "yes",
                     text: "Yes"
                  },
                  {
                     value: "no",
                     text: "No"
                  }
               ]
            },
            {
               type: "radiogroup",
               name: "foster_status",
               title: "Were you ever in foster care as a child?",
               choices: [
                  {
                     value: "yes",
                     text: "Yes"
                  },
                  {
                     value: "no",
                     text: "No"
                  }
               ]
            },
            {
               type: "radiogroup",
               name: "disability_status",
               title: "Do you have a disabling condition?",
               choices: [
                  {
                     value: "yes",
                     text: "Yes"
                  },
                  {
                     value: "no",
                     text: "No"
                  }
               ]
            },
            {
               type: "checkbox",
               name: "disability_type",
               visible: false,
               title: "What type of disabling condition do you have (you may select more than one condition)?",
               choices: [
                  {
                     value: "physical",
                     text: "Physical"
                  },
                  {
                     value: "developmental",
                     text: "Developmental"
                  },
                  {
                     value: "mental",
                     text: "Mental health"
                  },
                  {
                     value: "alcohol",
                     text: "Alcohol Abuse"
                  },
                  {
                     value: "drug",
                     text: "Drug Abuse"
                  },
                  {
                     value: "hiv",
                     text: "HIV/AIDS"
                  }
               ]
            },
            {
               type: "radiogroup",
               name: "veteran_status",
               title: "Have you ever served on Active Duty in the US Military?",
               choices: [
                  {
                     value: "yes",
                     text: "Yes"
                  },
                  {
                     value: "no",
                     text: "No"
                  }
               ]
            },
            {
               type: "radiogroup",
               name: "military_branch",
               visible: false,
               title: "What Branch of the Military did you serve?",
               choices: [
                  {
                     value: "army",
                     text: "Army"
                  },
                  {
                     value: "airForce",
                     text: "Air Force"
                  },
                  {
                     value: "navy",
                     text: "Navy"
                  },
                  {
                     value: "marines",
                     text: "Marines"
                  },
                  {
                     value: "coastGuard",
                     text: "Coast Guard"
                  }
               ]
            },
            {
               type: "matrixdropdown",
               name: "military_dates",
               visible: false,
               title: "What dates did you enter/leave the military?",
               columns: [
                  {
                     name: "month",
                     title: "Month",
                     cellType: "dropdown",
                     choices: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"
                     ]
                  },
                  {
                     name: "year",
                     title: "Year",
                     choices: [
                        "1930",
                        "1931",
                        "1932",
                        "1933",
                        "1934",
                        "1935",
                        "1936",
                        "1937",
                        "1938",
                        "1939",
                        "1940",
                        "1941",
                        "1942",
                        "1943",
                        "1944",
                        "1945",
                        "1946",
                        "1947",
                        "1948",
                        "1949",
                        "1950",
                        "1951",
                        "1952",
                        "1953",
                        "1954",
                        "1955",
                        "1956",
                        "1957",
                        "1958",
                        "1959",
                        "1960",
                        "1961",
                        "1962",
                        "1963",
                        "1964",
                        "1965",
                        "1966",
                        "1967",
                        "1968",
                        "1969",
                        "1970",
                        "1971",
                        "1972",
                        "1973",
                        "1974",
                        "1975",
                        "1976",
                        "1977",
                        "1978",
                        "1979",
                        "1980",
                        "1981",
                        "1982",
                        "1983",
                        "1984",
                        "1985",
                        "1986",
                        "1987",
                        "1988",
                        "1989",
                        "1990",
                        "1991",
                        "1992",
                        "1993",
                        "1994",
                        "1995",
                        "1996",
                        "1997",
                        "1998",
                        "1999",
                        "2000",
                        "2001",
                        "2002",
                        "2003",
                        "2004",
                        "2005",
                        "2006",
                        "2007",
                        "2008",
                        "2009",
                        "2010",
                        "2011",
                        "2012",
                        "2013",
                        "2014",
                        "2015",
                        "2016",
                        "2017",
                        "2018",
                        "2019"
                     ]
                  }
               ],
               rows: [
                  {
                     value: "enter",
                     text: "When did you enter?"
                  },
                  {
                     value: "leave",
                     text: "When did you leave?"
                  }
               ]
            },
            {
               type: "radiogroup",
               name: "discharge_type",
               visible: false,
               title: "What type of discharge did you receive?",
               hasOther: true,
               choices: [
                  {
                     value: "honorable",
                     text: "Honorable"
                  },
                  {
                     value: "dishonorable",
                     text: "Dishonorable"
                  },
                  {
                     value: "general",
                     text: "General"
                  },
                  {
                     value: "otherThanHonorable",
                     text: "Other than honorable"
                  },
                  {
                     value: "badConduct",
                     text: "Bad conduct"
                  }
               ]
            },
            {
               type: "radiogroup",
               name: "health_insurance_status",
               title: "Are you covered by Health Insurance?",
               choices: [
                  {
                     value: "yes",
                     text: "Yes"
                  },
                  {
                     value: "no",
                     text: "No"
                  }
               ]
            },
            {
               type: "radiogroup",
               name: "felony_status",
               title: "Have you ever been charged with a felony?",
               choices: [
                  {
                     value: "yes",
                     text: "Yes"
                  },
                  {
                     value: "no",
                     text: "No"
                  }
               ]
            },
            {
               type: "radiogroup",
               name: "income",
               title: "Do you receive any income?",
               choices: [
                  "Yes",
                  "No Income"
               ]
            },
            {
               type: "text",
               name: "income_amount",
               visible: false,
               inputType: "number",
               title: "How much income do you receive (per month, gross)?"
            },
            {
               type: "checkbox",
               name: "income_type",
               visible: false,
               title: "What type(s) do you receive",
               hasOther: true,
               choices: [
                  "Earned income",
                  "Alimony",
                  "SSA retirement",
                  "VA Disability Pension (NON-service connected)",
                  "VA Disability Comp (Service Connected)",
                  "SSI",
                  "Workers' Comp",
                  "Pension/Retirement Income",
                  "TANF",
                  "SSDI",
                  "Private disability insurance",
                  "Unemployment",
                  "Child support"
               ]
            },
            {
               type: "radiogroup",
               name: "current_employed",
               title: "Are you currently employed?",
               choices: [
                  {
                     value: "yes",
                     text: "Yes"
                  },
                  {
                     value: "no",
                     text: "No"
                  }
               ]
            },
            {
               type: "radiogroup",
               name: "family_homeless_with",
               title: "Do you have any family members who are homeless and with you now?",
               choices: [
                  {
                     value: "yes",
                     text: "Yes"
                  },
                  {
                     value: "no",
                     text: "No"
                  }
               ]
            },
            {
               type: "dropdown",
               name: "homeless_adults",
               visible: false,
               title: "How many other Adult family members are homeless with you now?",
               choices: [
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17",
                  "18",
                  "19",
                  "20"
               ]
            },
            {
               type: "matrixdynamic",
               name: "homeless_adults_info",
               visible: false,
               visibleIf: "{homeless_adults} > \"0\"",
               title: "Enter adult information below:",
               columns: [
                  {
                     name: "initials",
                     title: "Initials",
                     cellType: "text"
                  },
                  {
                     name: "gender",
                     title: "Gender",
                     cellType: "radiogroup",
                     choices: [
                        "Male",
                        "Female",
                        "M to F Transgender",
                        "F to M Transgender",
                        "Gender non-conforming"
                     ]
                  },
                  {
                     name: "age",
                     title: "Age",
                     inputType: "number",
                     cellType: "text"
                  },
                  {
                     name: "hispanic",
                     title: "Hispanic/Latino",
                     cellType: "radiogroup",
                     choices: [
                        "Yes",
                        "No"
                     ]
                  },
                  {
                     name: "veteran",
                     title: "Veteran",
                     cellType: "radiogroup",
                     choices: [
                        "Yes",
                        "No"
                     ]
                  },
                  {
                     name: "race",
                     title: "Race",
                     cellType: "checkbox",
                     choices: [
                        "American Indian/Alaskan Native",
                        "Asian",
                        "Black/African American",
                        "White",
                        "Native Hawaiian/Other Pacific Islander",
                        "Other (see next field)"
                     ]
                  },
                  {
                     name: "raceOther",
                     title: "Race - Other (optional)",
                     cellType: "text"
                  }
               ],
               rowCount: 1
            },
            {
               type: "dropdown",
               name: "homeless_children",
               visible: false,
               title: "How many other Children family members are homeless with you now?",
               choices: [
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17",
                  "18",
                  "19",
                  "20"
               ]
            },
            {
               type: "matrixdynamic",
               name: "homeless_children_info",
               visible: false,
               visibleIf: "{homeless_children} > \"0\"",
               title: "Enter children information below:",
               columns: [
                  {
                     name: "initials",
                     title: "Initials",
                     cellType: "text"
                  },
                  {
                     name: "gender",
                     title: "Gender",
                     cellType: "radiogroup",
                     choices: [
                        "Male",
                        "Female",
                        "M to F Transgender",
                        "F to M Transgender",
                        "Gender non-conforming"
                     ]
                  },
                  {
                     name: "age",
                     title: "Age",
                     inputType: "number",
                     cellType: "text"
                  },
                  {
                     name: "hispanic",
                     title: "Hispanic/Latino",
                     cellType: "radiogroup",
                     choices: [
                        "Yes",
                        "No"
                     ]
                  },
                  {
                     name: "race",
                     title: "Race",
                     cellType: "checkbox",
                     choices: [
                        "American Indian/Alaskan Native",
                        "Asian",
                        "Black/African American",
                        "White",
                        "Native Hawaiian/Other Pacific Islander",
                         "Other (see next field)"
                     ]
                  },
                  {
                     name: "raceOther",
                     title: "Race - Other (optional)",
                     cellType: "text"
                  }
               ]
            },
            {
               type: "text",
               name: "surveyor_name",
               title: "Person Completing Survey:"
            },
            {
               type: "dropdown",
               name: "deployment_site",
               title: "Deployment Site:",
               choices: [
                  "Brandon - First Presbyterian Church of Brandon",
                  "Downtown - Hyde Park United Methodist",
                  "West Tampa - West Tampa Resource Center",
                  "Plant City - Plant City Resource Center",
                  "Ruskin - Ruskin (SouthShore) Resource Center",
                  "Town 'N County - Hillsborough County Sheriffs Office Substation",
                  "University Area - University Community Resource Center",
                  "West Shore - Florida Bahamas Synod",
                  "Youth Count - Camelot Community Center",
                  "Hillsborough County Public Schools",
                  "Hillsborough County PARKS",
                  "The Spring of Tampa Bay",
                  "Other supportive service provider"
               ]
            },
            {
               type: "comment",
               name: "notes",
               title: "NOTES:"
            },
            {
               type: "text",
               name: "desktop_zip_code",
               title: "(Desktop and Laptop only): ZIP Code of Survey Location"
            }
         ]
      }
   ],
   triggers: [
      {
         type: "complete",
         value: "yes",
         name: "completed_survey"
      },
      {
         type: "complete",
         value: "yes",
         name: "older_than_25_and_not_homeless"
      },
      {
         type: "visible",
         value: "yes",
         name: "veteran_status",
         questions: [
            "military_branch",
            "discharge_type",
            "military_dates"
         ]
      },
      {
         type: "visible",
         value: "Yes",
         name: "income",
         questions: [
            "income_type",
            "income_amount"
         ]
      },
      {
         type: "visible",
         operator: "contains",
         value: "Name",
         name: "where_stay_last",
         questions: [
            "name_facility"
         ]
      },
      {
         type: "visible",
         value: "yes",
         name: "disability_status",
         questions: [
            "disability_type"
         ]
      },
      {
         type: "visible",
         value: "yes",
         name: "family_homeless_with",
         questions: [
            "homeless_adults",
            "homeless_children"
         ]
      }
   ]
}