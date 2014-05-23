var Scenario = function (payload) {
  var Cucumber = require('../../cucumber');

  var attachments = Cucumber.Type.Collection();

  var self = {
    getKeyword:     function getKeyword()     { return payload.scenario.getKeyword(); },
    getName:        function getName()        { return payload.scenario.getName(); },
    getDescription: function getDescription() { return payload.scenario.getDescription(); },
    getUri:         function getUri()         { return payload.scenario.getUri(); },
    getLine:        function getLine()        { return payload.scenario.getLine(); },
    getTags:        function getTags()        { return payload.scenario.getTags(); },
    isFailed:       function isFailed()       { return payload.isFailed; },
    isPending:      function isPending()      { return payload.isPending; },
    isSuccessful:   function isSuccessful()   { return payload.isSuccessful; },
    isUndefined:    function isUndefined()    { return payload.isUndefined; },

    attach: function attach(data, mimeType, callback) {
      if (isStream(data)) {
        if (!mimeType)
          throw Error(Scenario.ATTACH_MISSING_MIME_TYPE_ARGUMENT);
        if (!callback)
          throw Error(Scenario.ATTACH_MISSING_CALLBACK_ARGUMENT_FOR_STREAM_READABLE);

        var buffers = [];

        data.on('data', function(chunk) {
          buffers.add(chunk);
        })
        data.on('end', function() {
          attachments.add(Cucumber.Api.Attachment({mimeType: mimeType, data: Buffer.concat(buffers).toString('base64')}));

          callback();
        });
      }
      else if (Buffer && Buffer.isBuffer(data)) {
        if (!mimeType)
          throw Error(Scenario.ATTACH_MISSING_MIME_TYPE_ARGUMENT);

        attachments.add(Cucumber.Api.Attachment({mimeType: mimeType, data: data.toString('base64')}));

        if (callback) {
          callback();
        }
      }
      else {
        if (!mimeType) {
          mimeType = Scenario.DEFAULT_TEXT_MIME_TYPE;
        }

        attachments.add(Cucumber.Api.Attachment({mimeType: mimeType, data: data.toString()}));
      }
    },

    getAttachments: function getAttachments() {
      return attachments;
    }
  };

  return self;
};

function isStream(value) {
  return value && typeof value === 'object' && typeof value.pipe === 'function';
}

Scenario.DEFAULT_TEXT_MIME_TYPE = 'text/plain';
Scenario.ATTACH_MISSING_MIME_TYPE_ARGUMENT = 'Cucumber.Api.Scenario.attach() expects a mimeType';
Scenario.ATTACH_MISSING_CALLBACK_ARGUMENT_FOR_STREAM_READABLE = 'Cucumber.Api.Scenario.attach() expects a callback when data is a stream.Readable'
module.exports = Scenario;