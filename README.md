# node-introspection
Utilities to do introspection of objects: helpful during development.

[![NPM stats](https://nodei.co/npm/introspection.png?downloads=true)](https://nodei.co/npm/introspection/)
[![NPM downloads](https://nodei.co/npm-dl/introspection.png)](https://nodei.co/npm/introspection/)

```javascript
var introspection = require('introspection');

var objectHierarchyArray = introspection.objectHierarchy(obj);
var objectEventsArray = introspection.objectEvents(obj);

introspection.listenOn(nodeObject, eventsToListenOn);
introspection.listenOnAllSocketEvents(socket);
introspection.listenOnAllRequestEvents (request);
introspection.listenOnAllResponseEvents (response);
introspection.functionArguments (fn);
```

## License

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) ([txt](https://www.apache.org/licenses/LICENSE-2.0.txt))
