var HookStep = function(keyword) {
  var Cucumber = require('../../cucumber');
  var self = Cucumber.Ast.Step(keyword, HookStep.EMPTY_NAME, HookStep.UNDEFINED_URI, HookStep.UNDEFINED_LINE);
  var hook;

  self.hasUri = function hasUri() {
    return false;
  };

  self.setHook = function setHook(newHook) {
    hook = newHook;
  };

  self.getHook = function getHook() {
    return hook;
  };

  self.execute = function execute(visitor, callback) {
    var world = visitor.getWorld();

    if (typeof afterStep != 'undefined') {
      hook.invoke(self, world, function(postScenarioAroundHookCallback) {
        var afterHook = Cucumber.SupportCode.Hook(postScenarioAroundHookCallback, {});
        afterStep.setHook(afterHook);
      });
    }
    else {
      hook.invoke(self, world, callback);
    }
  };

  return self;
};

HookStep.EMPTY_NAME = '';
HookStep.UNDEFINED_URI = undefined;
HookStep.UNDEFINED_LINE = undefined;

module.exports = HookStep;
