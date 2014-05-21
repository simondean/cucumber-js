Feature: Environment Hooks

  # The following scenario is a regression test for special "around" hooks which
  # deserve a bit more of attention.
  Scenario: Tagged around hook with untagged scenario
    Given an around hook tagged with "@foo"
    When Cucumber executes a scenario with no tags
    Then the hook is not fired

  Scenario: Hooks are steps
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
      var hooks = function () {
        this.Before(function(callback) {
          callback();
        });

        this.After(function(callback) {
          callback();
        });

        this.Around(function(runScenario) {
          runScenario(function(callback) {
            callback();
          });
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
                  "name": "",
                  "keyword": "Around ",
                  "result": {
                    "duration": "<duration>",
                    "status": "passed"
                  },
                  "match": {}
                },
                {
                  "name": "",
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
                  "name": "",
                  "keyword": "After ",
                  "result": {
                    "duration": "<duration>",
                    "status": "passed"
                  },
                  "match": {}
                },
                {
                  "name": "",
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
