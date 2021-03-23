/*
| -----------------------------------------------------------------------------
| Displays message box.
|
| @param {String} message
| @param {String} type [ info | success | warning | danger ]
| -----------------------------------------------------------------------------
|
| var shell = require("shell");
| shell.msgbox("Message...", "success");
| -----------------------------------------------------------------------------
*/
function msgbox(message, type) {
    const execute = require("./execute");
    const output  = execute(
    "bash " + __dirname + "/sh/msgbox.sh '" + message + "' --" + type);
    console.info(output);
}
module.exports = msgbox;
