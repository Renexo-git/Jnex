/*
| -----------------------------------------------------------------------------
| Get screen height.
| -----------------------------------------------------------------------------
|
| var screen  = require("screen");
| screen.height();
| -----------------------------------------------------------------------------
*/
function height() {
    return window.innerHeight ||
           document.documentElement.clientHeight ||
           document.body.clientHeight ||
           document.body.offsetHeight;
}
module.exports = height;
