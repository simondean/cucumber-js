Feature: Scenario Statuses

  Scenario: Check scenario statuses
    Given a file named "features/a.feature" with:
      """
      Feature: some feature

      Scenario: I've declared one step and it is passing
          Given This step is passing
      """
    And a file named "features/step_definitions/cucumber_steps.js" with:
      """
      var cucumberSteps = function() {
        this.Given(/^This step is passing$/, function(callback) { callback(); });
      };
      module.exports = cucumberSteps;
      """
    And a file named "features/support/hooks.js" with:
      """
      function checkScenarioStatuses(scenario) {
        var error;

        if (scenario.isSuccessful === false)
          error = "Expected isSuccessful to be true";
        else if (scenario.isFailed === true)
          error = "Expected isFailed to be false";
        else if (scenario.isPending === true)
          error = "Expected isPending to be false";
        else if (scenario.isUndefined === true)
          error = "Expected isUndefined to be false";
        else
          error = null;

        return error;
      }

      var hooks = function () {
        this.Around(function(scenario, runScenario) {
          var error = checkScenarioStatuses(scenario);

          runScenario(error, function(callback) {
            var error = checkScenarioStatuses(scenario);

            callback(error);
          });
        });

        this.Before(function(scenario, callback) {
          var error = checkScenarioStatuses(scenario);

          callback(error);
        });

        this.After(function(scenario, callback) {
          var error = checkScenarioStatuses(scenario);

          callback(error);
        });
      };

      module.exports = hooks;
      """
    When I run `cucumber.js -f json`
    Then it outputs this json:
      """
      [
        {
          "id": "some-feature",
          "name": "some feature",
          "description": "",
          "line": 1,
          "keyword": "Feature",
          "uri": "<current-directory>/features/a.feature",
          "elements": [
            {
              "name": "I've declared one step and it is passing",
              "id": "some-feature;i've-declared-one-step-and-it-is-passing",
              "line": 3,
              "keyword": "Scenario",
              "description": "",
              "type": "scenario",
              "steps": [
                {
                  "name": "scenario",
                  "keyword": "Around ",
                  "result": {
                    "duration": "<duration>",
                    "status": "passed"
                  },
                  "match": {}
                },
                {
                  "name": "scenario",
                  "keyword": "Before ",
                  "result": {
                    "duration": "<duration>",
                    "status": "passed"
                  },
                  "match": {}
                },
                {
                  "name": "This step is passing",
                  "line": 4,
                  "keyword": "Given ",
                  "result": {
                    "duration": "<duration>",
                    "status": "passed"
                  },
                  "match": {}
                },
                {
                  "name": "scenario",
                  "keyword": "After ",
                  "result": {
                    "duration": "<duration>",
                    "status": "passed"
                  },
                  "match": {}
                },
                {
                  "name": "scenario",
                  "keyword": "Around ",
                  "result": {
                    "duration": "<duration>",
                    "status": "passed"
                  },
                  "match": {}
                }
              ]
            }
          ]
        }
      ]
      """
