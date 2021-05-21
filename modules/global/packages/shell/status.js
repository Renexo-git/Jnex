/*
| -----------------------------------------------------------------------------
| Shows the status of the port in a message box.
|
| @param {Integer} port
| @param {String} option [ online | offline ]
| -----------------------------------------------------------------------------
|
| var shell = require("shell");
| shell.status(3000, "online");
| -----------------------------------------------------------------------------
*/
function status(port, option) {
    const execute = require("./execute");
    const output  = execute(
    "bash " + __dirname + "/sh/status.sh " + port + " --" + option);
    console.info(output);
}
module.exports = status;
