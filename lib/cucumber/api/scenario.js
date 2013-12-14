var Scenario = function (payload) {
  var self = {
    getKeyword:     function getKeyword()     { return payload.scenario.keyword; },
    getName:        function getName()        { return payload.scenario.name; },
    getDescription: function getDescription() { return payload.scenario.description; },
    getUri:         function getUri()         { return payload.scenario.uri; },
    getLine:        function getLine()        { return payload.scenario.line; },
    getTags:        function getTags()        { return payload.scenario.tags; },
    isFailed:       function isFailed()       { return payload.isFailed; },
    isPending:      function isPending()      { return payload.isPending; },
    isSuccessful:   function isSuccessful()   { return payload.isSuccessful; },
    isUndefined:    function isUndefined()    { return payload.isUndefined; }
  };

  return self;
};

module.exports = Scenario;