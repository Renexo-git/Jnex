/*
| -----------------------------------------------------------------------------
| Execute Shell commands.
|
| @param {String} cmd
| -----------------------------------------------------------------------------
|
| var shell = require("shell");
| var out   = shell.execute("ls");
| -----------------------------------------------------------------------------
*/
function execute(cmd) {
    const child_process = require("child_process");
    return child_process.execSync(cmd).toString();
}
module.exports = execute;
