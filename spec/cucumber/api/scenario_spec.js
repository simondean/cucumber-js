require('../../support/spec_helper');

describe("Cucumber.Api.Scenario", function() {
  var Cucumber = requireLib('cucumber');
  var scenario, keyword, name, description, uri, line, tags, isFailed, isPending, isSuccessful, isUndefined;

  beforeEach(function() {
    keyword      = createSpy("scenario keyword");
    name         = createSpy("scenario name");
    description  = createSpy("scenario description");
    uri          = createSpy("uri");
    line         = createSpy("starting scenario line number");
    tags         = createSpy("scenario tags");
    isFailed     = createSpy("is failed");
    isPending    = createSpy("is pending");
    isSuccessful = createSpy("is successful");
    isUndefined = createSpy("is undefined");
    scenario = Cucumber.Api.Scenario({
      keyword: keyword,
      name: name,
      description: description,
      uri: uri,
      line: line,
      tags: tags,
      isFailed: isFailed,
      isPending: isPending,
      isSuccessful: isSuccessful,
      isUndefined: isUndefined
    });
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

  it("is not failed", function() {
    expect(scenario.isFailed()).toBe(isFailed);
  });

  it("is not pending", function() {
    expect(scenario.isPending()).toBe(isPending);
  });

  it("is not successful", function () {
    expect(scenario.isSuccessful()).toBe(isSuccessful);
  });

  it("is not undefined", function() {
    expect(scenario.isUndefined()).toBe(isUndefined);
  });
});