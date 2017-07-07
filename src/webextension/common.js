/*
 * @license MPL 1.1/GPL 2.0/LGPL 2.1, see license.txt
 * @author William Elwood <we9@kent.ac.uk>
 * @copyright 2017 JSONovich Team. All Rights Reserved.
 * @description Common code for background scripts.
 */

'use strict';

const noop = () => {};
let log = noop;

const defaults = (defaults => {
    const logDebug = (...args) => console.log('[JSONovich Webext]', ...args);
    function setDebug(enable) {
        enable && log === noop && logDebug('Debug mode on:', browser.runtime.getManifest());
        log = enable ? logDebug : noop;
    }
    setDebug(defaults.debug);
    const promise = browser.storage.local.get(defaults);
    promise.then(config => {
        setDebug(config.debug);
        browser.storage.onChanged.addListener((changes, areaName) => {
            const {debug} = changes;
            if(areaName === 'local' && typeof debug !== 'undefined')
                setDebug('newValue' in debug && debug.newValue);
        });
        log('common.js started', window.location);
    });
    return promise;
})({
    mimetypes: {
        'application/json': 'json',                // standard, http://www.ietf.org/rfc/rfc4627.txt
        'application/sparql-results+json': 'json', // standard, http://www.w3.org/TR/rdf-sparql-json-res/
        'application/schema+json': 'json',         // draft, http://json-schema.org/
        'application/jsonrequest': 'json',         // proposed, http://json.org/JSONRequest.html
        'application/x-json': 'json',              // legacy, officially application/json
        'text/json': 'json',                       // legacy, officially application/json
        'text/x-json': 'json',                     // legacy, officially application/json
        'application/rdf+json': 'json',            // legacy, officially application/json
        'application/jsonml+json': 'json',         // unofficial, http://jsonml.org/
        'application/manifest+json': 'json',       // proposed, https://w3c.github.io/manifest/
        'application/json-p': 'js',                // proposed, http://www.json-p.org/
        'text/json-p': 'js',                       // proposed, http://www.json-p.org/
        'application/javascript': 'js',            // standard, http://www.ietf.org/rfc/rfc4329.txt
        'application/ecmascript': 'js',            // standard, http://www.ietf.org/rfc/rfc4329.txt
        'text/javascript': 'js',                   // obsolete, http://www.ietf.org/rfc/rfc4329.txt
        'text/ecmascript': 'js',                   // obsolete, http://www.ietf.org/rfc/rfc4329.txt
        'application/x-javascript': 'js',          // legacy, officially application/javascript
        'application/x-ecmascript': 'js',          // legacy, officially application/ecmascript
        'text/x-javascript': 'js',                 // legacy, officially application/javascript
        'text/x-ecmascript': 'js'                  // legacy, officially application/ecmascript
    },
    extensions: {
        'json': 'json', // application/json
        'srj': 'json'   // application/sparql-results+json
    },
    accept: {},
    debug: false
});