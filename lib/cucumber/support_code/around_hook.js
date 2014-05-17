var AroundHook = function(code, options) {
  var Cucumber = require('../../cucumber');
  var self = Cucumber.SupportCode.Hook(code, options);
  var afterStep;

  self.setAfterStep = function setAfterStep(newAfterStep) {
    afterStep = newAfterStep;
  };

  self.buildCodeCallback = function buildCodeCallback(callback) {
    var codeCallback = function(postScenarioAroundHookCallback) {
      var afterHook = Cucumber.SupportCode.Hook(postScenarioAroundHookCallback, {});
      afterStep.setHook(afterHook);
      callback();
    }
    return codeCallback();
  }
}
module.exports = AroundHook;
