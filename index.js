/**
 * Return an array of string containing the ordered Hierarchy of an object
 *
 * @param {Object} nodeObject Object to introspect
 * @returns {Array} Array of `object.contstructor.name`s
 */
exports.objectHierarchy = function (nodeObject) {
  var result = [];
  result.unshift(nodeObject.constructor.name);

  while (null != nodeObject._parent) {
    nodeObject = nodeObject._parent;
    result.unshift(nodeObject.constructor.name);
  }

  return result;
};

/**
 * Returns an array of string containing the events of an events.EventEmitter
 *
 * @param {events.EventEmitter} nodeObject Object to introspect
 * @returns {Array} Array of events
 */
exports.objectEvents = function (nodeObject) {
  var result = [];

  if (nodeObject._events) {
    result = Object.keys(nodeObject._events);
  }

  return result;
};

/**
 * Register listeners on an object, for all the given events, and prints
 * a `console.info` when those events fire.
 *
 * @param {Object} nodeObject Object to listen on
 * @param {Array} eventsToListenOn Array of events to listen to
 */
exports.listenOn = function (nodeObject, eventsToListenOn) {
  var eventName, i;

  console.info('Adding event listeners for'
    + ' "[' + eventsToListenOn + ']"\n'
    + ' on'
    + ' "' + exports.objectHierarchy(nodeObject) + '"\n'
    + ' that before had listeners for'
    + ' "[' + exports.objectEvents(nodeObject) + ']"');

  for (i = 0; i < eventsToListenOn.length; ++i) {
    eventName = eventsToListenOn[i];
    nodeObject.on(eventName, function (obj, event) {
      console.info('(' + process.hrtime() + ') ' + obj.constructor.name + ' -> ' + event);
    }.bind(null, nodeObject, eventName));
  }
};

/**
 * Register listeners on all events of a given Socket (TLSSocket)
 *
 * @param {Socket|TLSSocket} socket Socket to listen on
 */
exports.listenOnAllSocketEvents = function (socket) {
  exports.listenOn(socket, ['lookup', 'connect', 'data', 'close', 'end', 'secure', 'secureConnect', 'timeout', 'free', 'error', 'drain', '_socketEnd']);
};

/**
 * Register listeners on all events of a given Request (ClientRequest)
 *
 * @param {ClientRequest} request Request to listen on
 */
exports.listenOnAllRequestEvents = function (request) {
  exports.listenOn(request, ['abort', 'continue', 'response', 'socket', 'upgrade', 'error', 'data']);
};

/**
 * Register listeners on all events of a given Response (IncomingMessage)
 *
 * @param {IncomingMessage} response Response to listen on
 */
exports.listenOnAllResponseEvents = function (response) {
  exports.listenOn(response, ['readable', 'data', 'end', 'close']);
};

/**
 * Returns an array of parameter names, as expected by the given function
 *
 * @param {Function} fn Function to introspect
 * @returns {Array} Array of strings containing the parameters names
 */
exports.functionArguments = function (fn) {
  if (typeof(fn) === 'function') {
    var findArgsRegexp = /\((.+)\)/;
    var cleanupRegexp = /\s|\/\*[\s\S]*\*\/|^\(|\)$/g;

    var argumentsFound = findArgsRegexp.exec(fn.toString());
    return argumentsFound ? argumentsFound[0].trim().replace(cleanupRegexp, '').split(',') : [];
  } else {
    throw new Error('Input is not a function');
  }
};
