class Model {

    /**
     * Class constructor.
     * @access public
     */
    constructor() {
        const file   = require("file");
        const config = file.include_yaml(APP_PATH + "/config.yaml");
        if (config.connection.driver !== null) {
            if (config.connection.driver === "mongodb") {
                if (config.connection.port === null) {
                    config.connection.port = 27017;
                }
                let mongojs  = require("mongojs"),
                    _config  = config.connection.driver + "://";
                    _config += config.connection.host + ":";
                    _config += config.connection.port + "/";
                    _config += config.connection.database;
                    this.db  = mongojs(_config);
            } else {
                global.Sequelize = require("sequelize");
                this.sequelize   = new Sequelize(
                  config.connection.database,
                  config.connection.username,
                  config.connection.password, {
                    host: config.connection.host,
                    port: config.connection.port,
                    dialect: config.connection.driver,
                    logging: false,
                    define: {
                      charset: config.connection.charset,
                      collate: config.connection.collate,
                      timestamps: true,
                      underscored: true
                    }
                });
            }
        }
        this.instance = null;
    }

    /**
     * Displays error messages on the console.
     * @param {String} message
     * @access public
     */
    error(message) {
        console.log("Model name: " + this.constructor.name + " - " + message);
    }

    /**
     * Define model.
     * @param {String} name
     * @param {Object} attributes
     * @param {Object} options
     * @access public
     */
    define(name, attributes, options = {}) {
        this.instance = this.sequelize.define(name, attributes, options);
        return this.instance;
    }

    /**
     * Sequelize sync.
     * @param {Object} arg {force:true}
     * @access public
     */
    sync(arg = null) {
        this.sequelize.sync(arg);
    }

    /**
     * Select records in the database.
     * @param {Object} query
     * @access public
     */
    findAll(query) {
        return this.instance.findAll(query);
    }

    /**
     * Finds and counts all records.
     * @param {Object} query
     * @access public
     */
    findAndCountAll(query) {
        return this.instance.findAndCountAll(query);
    }

    /**
     * Insert record in the database.
     * @param {Object} data
     * @access public
     */
    create(data) {
        return this.instance.create(data).then(result => {
            if (result) {
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            this.error(error["message"]);
            return false;
        });
    }

    /**
     * Updates the record in the database.
     * @param {Object} data
     * @param {Object} clause
     * @access public
     */
    update(data, clause) {
        return this.instance.update(data, clause).then(result => {
            if (result) {
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            this.error(error["message"]);
            return false;
        });
    }

    /**
     * Deletes the record in the database.
     * @param {Object} clause
     * @access public
     */
    destroy(clause) {
        return this.instance.destroy(clause).then(result => {
            if (result) {
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            this.error(error["message"]);
            return false;
        });
    }
}
module.exports = Model;
