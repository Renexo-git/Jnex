/*
| -----------------------------------------------------------------------------
| Get screen width.
| -----------------------------------------------------------------------------
|
| var screen  = require("screen");
| screen.width();
| -----------------------------------------------------------------------------
*/
function width() {
    return window.innerWidth ||
           document.documentElement.clientWidth ||
           document.body.clientWidth ||
           document.body.offsetWidth;
}
module.exports = width;
