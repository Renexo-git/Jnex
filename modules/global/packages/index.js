try {
    module.exports = {
        jnex: require("./node_modules/jnex")
    };
} catch(err) {
    module.exports = {
        jnex: () => ""
    };
    if (err.code === "MODULE_NOT_FOUND") {
        console.clear();
        console.log("Installing packages from the global module...");
        const exec = require("child_process").exec;
        exec("npm install --prefix " + __dirname, (err, stdout, stderr) => {
            console.clear();
            console.log("Done!");
            console.log(stdout);
        });
    }
}
