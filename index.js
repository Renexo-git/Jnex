
/**
 * Jnex - Modular framework for creating web systems.
 *
 * @author     Renexo
 * @copyright  2021 Renexo
 * @license    MIT License
 */
/*
| -----------------------------------------------------------------------------
| Path
| -----------------------------------------------------------------------------
*/
global.APP_PATH       = __dirname;
process.env.NODE_PATH = APP_PATH + "/packages/node_modules";
/*
| -----------------------------------------------------------------------------
| Packages
| -----------------------------------------------------------------------------
*/
const fs     = require("fs");
const rimraf = require("rimraf");
(function () {
    var modules_path = APP_PATH + "/modules";
    var packs_path   = APP_PATH + "/packages";
    var init_paths   = require("module").Module._initPaths();
    var module_alias = require("module-alias");
    module_alias.addPath(packs_path);
    fs.readdirSync(modules_path).forEach(name => {
        let packages = modules_path + "/" + name + "/packages";
        if (fs.existsSync(packages)) {
            let symlink = packs_path + "/@" + name;
            try {
                if (fs.lstatSync(symlink).isSymbolicLink()) {
                    fs.unlinkSync(symlink);
                }
            } catch (e) {}
            fs.symlink(packages, symlink, "dir", err => {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
    // Create symbolic link of public packages in the cache.
    var public_packages = namespace => {
        namespace = namespace ? namespace + "/" : "";
        let cache = APP_PATH + "/writable/cache/packages/" + namespace,
            json  = packs_path + "/" + namespace + "public.json";
        if (fs.existsSync(json)) {
            let dependencies = require(json).dependencies;
            if (Object.values(dependencies).length > 0) {
                Object.values(dependencies).forEach(name => {
                    if (!fs.existsSync(cache + name)) {
                        let pack = packs_path + "/" + namespace + name;
                        if (!fs.existsSync(pack)) {
                            pack = packs_path + "/" + namespace +
                                   "node_modules/" + name;
                        }
                        if (fs.existsSync(pack)) {
                            if (!fs.existsSync(cache)) {
                                fs.mkdirSync(cache);
                            }
                            if (name.charAt(0) === "@") {
                                let dir = name.split("/")[0];
                                if (!fs.existsSync(cache + dir)) {
                                    fs.mkdirSync(cache + dir);
                                }
                            }
                            fs.symlink(pack, cache + name, "dir", err => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        }
                    }
                });
            }
        }
    };
    rimraf.sync(APP_PATH  + "/writable/cache/packages");
    public_packages();
    fs.readdirSync(packs_path).forEach(namespace => {
        if (namespace.charAt(0) === "@") {
            public_packages(namespace);
        }
    });
})();
/*
| -----------------------------------------------------------------------------
| Console message
| -----------------------------------------------------------------------------
*/
const shell = require("@system/shell");
shell.msgbox("Server starting...", "info");
/*
| -----------------------------------------------------------------------------
| Require
| -----------------------------------------------------------------------------
*/
const md5         = require("md5");
const ejs         = require("ejs");
const path        = require("path");
const cors        = require("cors");
const sass        = require("sass");
const terser      = require("terser");
const helmet      = require("helmet");
const express     = require("express");
const lru_cache   = require("lru-cache");
const portfinder  = require("portfinder");
const body_parser = require("body-parser");
const require_dir = require("require-dir");
const mvc         = require("@system/mvc");
const file        = require("@system/file");
/*
| -----------------------------------------------------------------------------
| Configuration
| -----------------------------------------------------------------------------
*/
const config = file.include_yaml(APP_PATH + "/config.yaml");
/*
| -----------------------------------------------------------------------------
| Cache
| -----------------------------------------------------------------------------
*/
(function () {
    global.cache = new lru_cache(100);
    ejs.cache    = new lru_cache(100);
    if (config.application.dev_mode) {
        cache.reset();
        ejs.cache.reset();
        ejs.clearCache();
    }
    // The global translation file is shared with all modules.
    cache.set("global_language", language("")); // Do not remove this line.
})();
/*
| -----------------------------------------------------------------------------
| Include file
| -----------------------------------------------------------------------------
*/
function include(layer, file) {
    var class_path = APP_PATH  + "/layers/" + layer,
        cache_path = APP_PATH  + "/writable/cache/layers/" + layer,
        cache_file = cache_path + "/" + md5(file) + ".js";
    if (config.application.dev_mode) {
        if (fs.existsSync(cache_file)) {
            fs.unlinkSync(cache_file);
        }
        if (require.cache[cache_file]) {
            delete require.cache[cache_file];
        }
    }
    if (!fs.existsSync(cache_file)) {
        file = fs.readFileSync(class_path + "/" + file + ".js", "utf8");
        file = file.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
        var src = "",
            inc = file.match(/include\((\".*\"|\'.*\')\)(\;|)/g);
        if (inc) {
            inc.forEach(file => {
                file = file.replace(/include\(["']|['"]\)(\;|)/g, "");
                src += fs.readFileSync(class_path + "/" + file, "utf8");
            });
        }
        src += "module.exports=" + file.replace(/include\(.*\)(\;|)/g, "");
        if (!fs.existsSync(cache_path)) {
            fs.mkdirSync(cache_path, {recursive: true});
        }
        fs.writeFileSync(cache_file, terser.minify(src).code, "utf8");
    }
    file = require(cache_file);
    return new file;
}
/*
| -----------------------------------------------------------------------------
| Generates cached translation file and includes
| -----------------------------------------------------------------------------
*/
function language(module) {
    const language = config.location.language;
    if (language !== null) {
        module = (module !== "") ? "/modules/" + module : "";
        let file  = {},
            cache = APP_PATH + "/writable/cache/languages" + module;
        file.generate = () => {
            let path = APP_PATH + module + "/languages/" + language;
            if (fs.existsSync(path)) {
                let json = require_dir(path, {noCache: true}),
                    data = {};
                Object.values(json).forEach(result => {
                    data = Object.assign(data, result);
                });
                if (!fs.existsSync(cache)) {
                    fs.mkdirSync(cache, {recursive: true});
                }
                fs.writeFileSync(file.json, JSON.stringify(data), "utf8");
                return true;
            }
            return false;
        };
        file.json = cache + "/" + language + ".json";
        if (fs.existsSync(file.json)) {
            if (config.application.dev_mode) {
                fs.unlinkSync(file.json);
            } else {
                return require(file.json);
            }
        }
        if (file.generate()) {
            return require(file.json);
        }
    }
    return {};
}
/*
| -----------------------------------------------------------------------------
| CSS min
| -----------------------------------------------------------------------------
*/
if (config.application.dev_mode) {
    fs.writeFileSync(APP_PATH + "/static/styles/all.min.css",
        sass.renderSync({
          file: APP_PATH + "/static/styles/import.scss",
          outputStyle: "compressed"
        }).css.toString(), "utf8"
    );
}
/*
| -----------------------------------------------------------------------------
| Check port
| -----------------------------------------------------------------------------
*/
if (config.application.port === null) {
    config.application.port = 3000;
}
portfinder.basePort = config.application.port;
portfinder.getPort((err, port) => {
    if (port !== config.application.port) {
        shell.msgbox("Port " + config.application.port + " is busy!", "danger");
        process.exit();
    }
});
/*
| -----------------------------------------------------------------------------
| Server
| -----------------------------------------------------------------------------
*/
const server = express();
server.use(helmet());
server.use(cors());
server.use(body_parser.urlencoded({extended:false}));
server.use(body_parser.json());
server.disable("x-powered-by");
/*
    const twig = require("twig");
    Object.keys(mvc.view.functions).forEach(name => {
        twig.extendFunction(name, mvc.view.functions[name]);
    });
    Object.keys(mvc.view.filters).forEach(name => {
        twig.extendFilter(name, mvc.view.filters[name]);
    });
    server.set("twig options", {allow_async: true});
    server.engine("twig", twig.__express);
    if (config.application.dev_mode) {
        twig.cache(false);
    }
*/
server.engine("tpl", ejs.renderFile);
server.set("view engine", "tpl");
server.set("views", APP_PATH + "/layers/Views");
server.use((req, res, next) => {
    if (config.application.dev_mode) {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
    }
    res.data          = {};
    res.data.language = config.location.language || "en";
    res.data.charset  = config.location.charset  || "UTF-8";
    res.data.title    = config.application.title || "Jnex";
    res.data.module   = req.originalUrl.split("/")[1] || "";
    res.locals        = mvc.view.functions;
    server.response   = res;
    next();
});
if (config.application.dev_mode) {
    server.use(require("express-status-monitor")({
      title: "Status",
      path: "/system/information/status"
    }));
    server.disable("view cache");
}
server.listen(config.application.port, "localhost", function () {
    shell.status(this.address().port, "online");
    process.on("SIGINT", () => {
        shell.status(this.address().port, "offline");
        process.exit();
    });
});
/*
| -----------------------------------------------------------------------------
| MVC
| -----------------------------------------------------------------------------
*/
global.model = file => {
    return include("Models", file);
};
global.view = (file, data = {}) => {
    if (file === "@json") {
        return server.response.json(data);
    }
    return server.response.render(file, data);
};
global.controller = file => {
    cache.set("module_language", language(server.response.data.module));
    return include("Controllers", file);
};
global.Model      = mvc.model;
global.Controller = mvc.controller;
/*
| -----------------------------------------------------------------------------
| Routes
| -----------------------------------------------------------------------------
*/
global.Route = express.Router();
fs.readdirSync(APP_PATH + "/modules").forEach(module => {
    if (fs.existsSync(APP_PATH + "/modules/" + module + "/routes")) {
        require_dir(APP_PATH + "/modules/" + module + "/routes", {
            noCache: config.application.dev_mode
        });
    }
});
server.use(Route);
Route.use((req, res, next) => {
    res.status(404).render("Errors/404", {url: req.originalUrl});
});
