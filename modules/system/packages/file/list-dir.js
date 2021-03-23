/*
| -----------------------------------------------------------------------------
| Lists all directories within a directory.
|
| @param {String} path
| -----------------------------------------------------------------------------
|
| var file   = require("file");
| var result = file.list_dir("/path/to/directory");
| -----------------------------------------------------------------------------
*/
function list_dir(path) {
    const fs = require("fs");
    return fs.readdirSync(path).filter(file => {
        return fs.statSync(path + "/" + file).isDirectory();
    });
}
module.exports = list_dir;
