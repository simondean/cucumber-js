require('../../support/spec_helper');

describe("Cucumber.Api.Scenario", function() {
  var Cucumber = requireLib('cucumber');
  var payload, keyword, name, description, uri, line, tags, isFailed, isPending, isSuccessful, isUndefined;

  beforeEach(function() {
    keyword      = createSpy("scenario keyword");
    name         = createSpy("scenario name");
    description  = createSpy("scenario description");
    uri          = createSpy("uri");
    line         = createSpy("starting scenario line number");
    tags         = createSpy("scenario tags");
    payload = {
      scenario: {
        getKeyword: function() { return keyword; },
        getName: function() { return name; },
        getDescription: function() { return description; },
        getUri: function() { return uri; },
        getLine: function() { return line; },
        getTags: function() { return tags; }
      },
      status: "passed"
    };
  });

  describe("getKeyword()", function() {
    it("returns the keyword of the scenario", function() {
      var scenario = Cucumber.Api.Scenario(payload);
      expect(scenario.getKeyword()).toBe(keyword);
    });
  });

  describe("getName()", function() {
    it("returns the name of the scenario", function() {
      var scenario = Cucumber.Api.Scenario(payload);
      expect(scenario.getName()).toBe(name);
    });
  });

  describe("getDescription()", function() {
    it("returns the description of the scenario", function() {
      var scenario = Cucumber.Api.Scenario(payload);
      expect(scenario.getDescription()).toBe(description);
    });
  });

  describe("getUri()", function() {
    it("returns the URI on which the background starts", function() {
      var scenario = Cucumber.Api.Scenario(payload);
      expect(scenario.getUri()).toBe(uri);
    });
  });

  describe("getLine()", function() {
    it("returns the line on which the scenario starts", function() {
      var scenario = Cucumber.Api.Scenario(payload);
      expect(scenario.getLine()).toBe(line);
    });
  });

  describe("getTags()", function() {
    it("returns the tags on the scenario, including inherited tags", function() {
      var scenario = Cucumber.Api.Scenario(payload);
      expect(scenario.getTags()).toBe(tags);
    });
  });

  describe("when is failed", function() {
    var scenario;

    beforeEach(function() {
      payload.status = "failed";
      scenario = Cucumber.Api.Scenario(payload);
    });

    describe("getStatus()", function() {
      it("returns failed", function() {
        expect(scenario.getStatus()).toBe("failed");
      });
    })

    describe("isFailed()", function() {
      it("returns true", function() {
        expect(scenario.getStatus()).toBeTruthy();
      });
    })
  });

  describe("when is pending", function() {
    var scenario;

    beforeEach(function() {
      payload.status = "pending";
      scenario = Cucumber.Api.Scenario(payload);
    });

    describe("getStatus()", function() {
      it("returns failed", function() {
        expect(scenario.getStatus()).toBe("pending");
      });
    })

    describe("isFailed()", function() {
      it("returns false", function() {
        expect(scenario.getStatus()).toBeFalsey();
      });
    })
  });

  describe("when is successful", function() {
    var scenario;

    beforeEach(function() {
      payload.status = "passed";
      scenario = Cucumber.Api.Scenario(payload);
    });

    describe("getStatus()", function() {
      it("returns failed", function() {
        expect(scenario.getStatus()).toBe("failed");
      });
    })

    describe("isFailed()", function() {
      it("returns true", function() {
        expect(scenario.getStatus()).toBeTruthy();
      });
    })
  });

  describe("when is failed", function() {
    var scenario;

    beforeEach(function() {
      payload.status = "failed";
      scenario = Cucumber.Api.Scenario(payload);
    });

    describe("getStatus()", function() {
      it("returns failed", function() {
        expect(scenario.getStatus()).toBe("failed");
      });
    })

    describe("isFailed()", function() {
      it("returns true", function() {
        expect(scenario.getStatus()).toBeTruthy();
      });
    })
  });

  it("is pending", function() {
    expect(scenario.isPending()).toBe(isPending);
  });

  it("is successful", function () {
    expect(scenario.isSuccessful()).toBe(isSuccessful);
  });

  it("is undefined", function() {
    expect(scenario.isUndefined()).toBe(isUndefined);
  });
});