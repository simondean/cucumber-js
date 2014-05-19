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

  self.execute = function execute(visitor, callback) {
    var world = visitor.getWorld();
    hook.setScenario(visitor.getScenario());
    hook.invoke(self, world, callback);
  };

  return self;
};

HookStep.EMPTY_NAME = '';
HookStep.UNDEFINED_URI = undefined;
HookStep.UNDEFINED_LINE = undefined;

module.exports = HookStep;
