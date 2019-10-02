SurveyManager = (function () {
    let instance;
 
    function createInstance() {
        Survey.Survey.cssType = "bootstrap";
        var survey = new Survey.Survey(surveyData, "surveyContainer");
        if(isMobileOrTablet()) {
            let generalPage = survey.getPageByName("generalquestions");
            let zipCodeQuestion = generalPage.getQuestionByName("desktop_zip_code");
            generalPage.removeQuestion(zipCodeQuestion);
        }
        return survey;
    }

    function isMobileOrTablet() {
        let md = new MobileDetect(window.navigator.userAgent);
        return md.mobile() != null;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();