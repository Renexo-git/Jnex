/*
| -----------------------------------------------------------------------------
| Sleeps the script for X seconds.
|
| @param {Integer} second
| -----------------------------------------------------------------------------
|
| var sleep = require("time/sleep");
| sleep(5); // 5 seconds.
| -----------------------------------------------------------------------------
*/
function sleep(second) {
    second = new Date().getTime() + (second * 1000);
    while(new Date().getTime() < second) {}
}
module.exports = sleep;
