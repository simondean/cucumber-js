require('../../support/spec_helper');

describe("Cucumber.Api.Scenario", function() {
  var Cucumber = requireLib('cucumber');
  var scenarioFailed, scenarioPending, scenarioSuccessful, scenarioUndefined, astTreeWalker;
  var keyword, name, description, uri, line, tags, astScenario;
  var scenario;

  beforeEach(function() {
    scenarioFailed     = createSpy("scenario failed");
    scenarioPending    = createSpy("scenario pending");
    scenarioSuccessful = createSpy("scenario successful");
    scenarioUndefined  = createSpy("scenario undefined");
    attachments        = createSpy("attachments");
    astTreeWalker      = createSpyWithStubs("ast scenario", { isScenarioFailed: scenarioFailed, isScenarioPending: scenarioPending, isScenarioSuccessful: scenarioSuccessful, isScenarioUndefined: scenarioUndefined, getAttachments: attachments });
    keyword            = createSpy("scenario keyword");
    name               = createSpy("scenario name");
    description        = createSpy("scenario description");
    uri                = createSpy("scenario uri");
    line               = createSpy("scenario starting line number");
    tags               = createSpy("scenario tags");
    astScenario        = createSpyWithStubs("ast scenario", { getKeyword: keyword, getName: name, getDescription: description, getUri: uri, getLine: line, getTags: tags });

    scenario = Cucumber.Api.Scenario(astTreeWalker, astScenario);
  });

  describe("getKeyword()", function() {
    it("returns the keyword of the scenario", function() {
      expect(scenario.getKeyword()).toBe(keyword);
    });
  });

  describe("getName()", function() {
    it("returns the name of the scenario", function() {
      expect(scenario.getName()).toBe(name);
    });
  });

  describe("getDescription()", function() {
    it("returns the description of the scenario", function() {
      expect(scenario.getDescription()).toBe(description);
    });
  });

  describe("getUri()", function() {
    it("returns the URI on which the background starts", function() {
      expect(scenario.getUri()).toBe(uri);
    });
  });

  describe("getLine()", function() {
    it("returns the line on which the scenario starts", function() {
      expect(scenario.getLine()).toBe(line);
    });
  });

  describe("getTags()", function() {
    it("returns the tags on the scenario, including inherited tags", function() {
      expect(scenario.getTags()).toBe(tags);
    });
  });

  describe("isSuccessful()", function() {
    it("returns whether the scenario is successful", function() {
      expect(scenario.isSuccessful()).toBe(scenarioSuccessful);
    });
  });

  describe("isFailed()", function() {
    it("returns whether the scenario has failed", function() {
      expect(scenario.isFailed()).toBe(scenarioFailed);
    });
  });

  describe("isPending()", function() {
    it("returns whether the scenario is pending", function() {
      expect(scenario.isPending()).toBe(scenarioPending);
    });
  });

  describe("isUndefined()", function() {
    it("returns whether the scenario is undefined", function() {
      expect(scenario.isUndefined()).toBe(scenarioUndefined);
    });
  });

  describe("getAttachments()", function() {
    it("returns any attachments created by the current step", function() {
      expect(scenario.getAttachments()).toBe(attachments);
    });
  });
});