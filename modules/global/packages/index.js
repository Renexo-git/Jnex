try {
    module.exports = {
        jnex: require("./node_modules/jnex")
    };
} catch (error) {
    module.exports = {
        jnex: () => ""
    };
    if (error.code === "MODULE_NOT_FOUND") {
        console.clear();
        console.log("Installing packages from the global module...");
        const exec = require("child_process").exec;
        exec("npm install jnex", {cwd: __dirname}, (error, stdout, stderr) => {
            console.clear();
            console.log("Done!");
            console.log(stdout);
        });
    }
}
