/*
| -----------------------------------------------------------------------------
| Translate
|
| @param {String} key
| -----------------------------------------------------------------------------
|
| var i18n = require("@sambrax/location/i18n");
| i18n("Word or text");
| -----------------------------------------------------------------------------
*/
function i18n(key) {
    var module_language = cache.get("module_language") || {};
    var global_language = cache.get("global_language") || {};
    if (module_language[key]) {
        return module_language[key];
    } else if (global_language[key]) {
        return global_language[key];
    } else {
        return key;
    }
}
module.exports = i18n;
