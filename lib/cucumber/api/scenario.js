var Scenario = function (payload) {
  var self = {
    getKeyword:     function getKeyword()     { return payload.keyword; },
    getName:        function getName()        { return payload.name; },
    getDescription: function getDescription() { return payload.description; },
    getUri:         function getUri()         { return payload.uri; },
    getLine:        function getLine()        { return payload.line; },
    getTags:        function getTags()        { return payload.tags; },
    isFailed:       function isFailed()       { return payload.isFailed; },
    isPending:      function isPending()      { return payload.isPending; },
    isSuccessful:   function isSuccessful()   { return payload.isSuccessful; },
    isUndefined:    function isUndefined()    { return payload.isUndefined; }
  };

  return self;
};

module.exports = Scenario;