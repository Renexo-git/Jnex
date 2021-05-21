/**
 * Jnex - Modular framework for creating web systems.
 *
 * @author     Renexo
 * @copyright  2021 Renexo
 * @license    MIT License
 */
/*
| ------------------------------------------------------------------------------
| Paths
| ------------------------------------------------------------------------------
*/
global.APP_PATH       = __dirname;
global.CACHE_PATH     = APP_PATH + "/writable/cache";
process.env.NODE_PATH = APP_PATH + "/modules/global/packages/node_modules";
const init_paths      = require("module").Module._initPaths();
const module_alias    = require("module-alias");
module_alias.addPath(APP_PATH + "/modules/global/packages");
/*
| ------------------------------------------------------------------------------
| Console message
| ------------------------------------------------------------------------------
*/
const shell = require("shell");
shell.msgbox("Server starting...", "info");
/*
| ------------------------------------------------------------------------------
| Wrapper
| ------------------------------------------------------------------------------
*/
(function () {
    var $_ = [];
    $_["directory"] = require("directory");
    $_["file"]      = require("file");
    global.$ = fnc => {
        return $_[fnc];
    };
})();
/*
| ------------------------------------------------------------------------------
| Require
| ------------------------------------------------------------------------------
*/
const fs          = require("fs");
const ejs         = require("ejs");
const mvc         = require("mvc");
const path        = require("path");
const cors        = require("cors");
const sass        = require("sass");
const terser      = require("terser");
const helmet      = require("helmet");
const symlink     = require("symlink");
const express     = require("express");
const lru_cache   = require("lru-cache");
const portfinder  = require("portfinder");
const body_parser = require("body-parser");
const require_dir = require("require-dir");
/*
| ------------------------------------------------------------------------------
| Configuration
| ------------------------------------------------------------------------------
*/
const config = $("file").include_yaml(APP_PATH + "/config.yaml");
/*
| ------------------------------------------------------------------------------
| Cache
| ------------------------------------------------------------------------------
*/
(function () {
    global.cache = new lru_cache(100);
    ejs.cache    = new lru_cache(100);
    if (config.application.dev_mode) {
        cache.reset();
        ejs.cache.reset();
        ejs.clearCache();
        $("directory").remove(CACHE_PATH);
    }
    // The global translation file is shared with all modules.
    cache.set("global_language", language("global"));
})();
/*
| ------------------------------------------------------------------------------
| Create symbolic link.
| ------------------------------------------------------------------------------
*/
(function () {
    var menu = {};
    const PACKS_PATH = APP_PATH + "/modules/global/packages";
    $("directory").create(CACHE_PATH + "/layers/Views");
    // Remove broken symbolic link.
    $("directory").read(PACKS_PATH).forEach(name => {
        if (symlink.broken(PACKS_PATH + "/" + name)) {
            symlink.remove(PACKS_PATH + "/" + name);
        }
    });
    $("directory").read(APP_PATH + "/modules").forEach(name => {
        symlink.create(APP_PATH + "/modules/" + name + "/layers/Views",
                       CACHE_PATH + "/layers/Views/" + name);
        if (name !== "global") {
            let path = APP_PATH + "/modules/" + name + "/config.yaml";
            if ($("file").exists(path)) {
                menu[name] = $("file").include_yaml(path).title || name;
                $("file").create(CACHE_PATH + "/menu.modules.json",
                                 JSON.stringify(menu));
            }
            symlink.create(APP_PATH + "/modules/" + name + "/packages",
                           PACKS_PATH + "/@" + name);
        }
    });
    // Create symbolic link of public packages in the cache.
    var public_packages = namespace => {
        namespace = namespace ? namespace + "/" : "";
        let cache = CACHE_PATH + "/packages/" + namespace,
            json  = PACKS_PATH + "/" + namespace + "public.json";
        if ($("file").exists(json)) {
            let dependencies = require(json).dependencies;
            if (Object.values(dependencies).length > 0) {
                Object.values(dependencies).forEach(name => {
                    if (!symlink.exists(cache + name)) {
                        let pack = PACKS_PATH + "/" + namespace + name;
                        if (!$("file").exists(pack)) {
                            pack = PACKS_PATH + "/" + namespace +
                                   "node_modules/" + name;
                        }
                        if ($("file").exists(pack)) {
                            $("directory").create(cache);
                            if (name.charAt(0) === "@") {
                                let dir = name.split("/")[0];
                                $("directory").create(cache + dir);
                            }
                            symlink.create(pack, cache + name);
                        }
                    }
                });
            }
        }
    };
    public_packages();
    $("directory").read(PACKS_PATH).forEach(namespace => {
        if (namespace.charAt(0) === "@") {
            public_packages(namespace);
        }
    });
    symlink.create(CACHE_PATH + "/packages", APP_PATH + "/static/packages");
    symlink.create(CACHE_PATH + "/languages", APP_PATH + "/static/languages");
})();
/*
| ------------------------------------------------------------------------------
| Includes Controllers and Models.
| ------------------------------------------------------------------------------
*/
function include(module, layer, file) {
    var class_path = APP_PATH + "/modules/" + module + "/layers/" + layer,
        cache_path = CACHE_PATH + "/layers/" + layer + "/" + module,
        cache_file = cache_path + "/" + file + ".js";
    if (config.application.dev_mode) {
        $("file").remove(cache_file);
        if (require.cache[cache_file]) {
            delete require.cache[cache_file];
        }
    }
    if (!$("file").exists(cache_file)) {
        file = $("file").read(class_path + "/" + file + ".js");
        file = file.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
        var src = "",
            inc = file.match(/include\((\".*\"|\'.*\')\)(\;|)/g);
        if (inc) {
            inc.forEach(file => {
                file = file.replace(/include\(["']|['"]\)(\;|)/g, "");
                src += $("file").read(class_path + "/" + file);
            });
        }
        src += "module.exports=" + file.replace(/include\(.*\)(\;|)/g, "");
        $("directory").create(cache_path);
        $("file").create(cache_file, terser.minify(src).code);
    }
    file = require(cache_file);
    return new file;
}
/*
| ------------------------------------------------------------------------------
| Generates cached translation file and includes
| ------------------------------------------------------------------------------
*/
function language(module) {
    const language = config.location.language;
    if (language !== null) {
        let lang_cache = CACHE_PATH + "/languages/" + module,
            json_file  = "",
            generate   = () => {
                let path = APP_PATH + "/modules/" +
                           module + "/languages/" + language;
                if ($("directory").exists(path)) {
                    let list = require_dir(path, {noCache: true}),
                        data = {};
                    Object.values(list).forEach(result => {
                        data = Object.assign(data, result);
                    });
                    $("directory").create(lang_cache);
                    $("file").create(json_file, JSON.stringify(data));
                    return true;
                }
                return false;
            };
        json_file = lang_cache + "/" + language + ".json";
        if ($("file").exists(json_file)) {
            if (config.application.dev_mode) {
                $("file").remove(json_file);
            } else {
                return require(json_file);
            }
        }
        if (generate()) {
            return require(json_file);
        }
    }
    return {};
}
/*
| ------------------------------------------------------------------------------
| CSS min
| ------------------------------------------------------------------------------
*/
if (config.application.dev_mode) {
    $("file").create(APP_PATH + "/static/styles/all.min.css", sass.renderSync({
      file: APP_PATH + "/static/styles/import.scss",
      outputStyle: "compressed"}).css.toString());
}
/*
| ------------------------------------------------------------------------------
| Check port
| ------------------------------------------------------------------------------
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
| ------------------------------------------------------------------------------
| Server
| ------------------------------------------------------------------------------
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



    const prismjs = require("prismjs");

    try {
        data = prismjs.tokenize(data, prismjs.languages.javascript, "javascript");
    } catch(e) {
        data = prismjs.highlight(data, prismjs.languages.javascript, "javascript");
    }

*/
server.engine("ejs", ejs.renderFile);
server.set("view engine", "ejs");
server.use((req, res, next) => {
    if (config.application.dev_mode) {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
    }
    res.data          = {};
    res.data.language = config.location.language      || "en";
    res.data.charset  = config.location.charset       || "UTF-8";
    res.data.title    = config.application.title      || "Jnex";
    res.data.module   = req.originalUrl.split("/")[1] || "global";
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
| ------------------------------------------------------------------------------
| MVC
| ------------------------------------------------------------------------------
*/
global.model = file => {
    return include(server.response.data.module, "Models", file);
};
global.view = (file, data = {}) => {
    if (file === "@json") {
        return server.response.json(data);
    }
    file = server.response.data.module + "/" + file;
    return server.response.render(CACHE_PATH + "/layers/Views/" + file, data);
};
global.controller = file => {
    if (server.response.data.module !== "global") {
        cache.set("module_language", language(server.response.data.module));
    }
    return include(server.response.data.module, "Controllers", file);
};
global.Model      = mvc.model;
global.Controller = mvc.controller;
/*
| ------------------------------------------------------------------------------
| Routes
| ------------------------------------------------------------------------------
*/
$("directory").read(APP_PATH + "/modules").forEach(module => {
    global.Route = express.Router();
    if ($("directory").exists(APP_PATH + "/modules/" + module + "/routes")) {
        require_dir(APP_PATH + "/modules/" + module + "/routes", {
            noCache: config.application.dev_mode
        });
        server.use("/" + module, Route);
    }
});
server.get("/", (req, res) => {
    include("global", "Controllers", "System").main(res.data);
});
server.use((req, res, next) => {
    res.status(404).render(CACHE_PATH + "/layers/Views/global/Errors/404", {
      url: req.originalUrl
    });
});
