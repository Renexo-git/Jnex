const BaseController = require("./BaseController");

class Demo extends BaseController {

    /**
     * Class constructor.
     * @access public
     */
    constructor() {
        super();
        this.model = model("Demo");
    }

    /**
     * Returns the data grid.
     * @access public
     */
    datagrid() {
        return view("datagrid");
    }

    /**
     * Returns the data form.
     * @access public
     */
    register() {
        return view("dataform");
    }

    /**
     * Database operations.
     *
     * @param {String} option
     * @param {Object} query
     * @access public
     */
    action(option, query) {
        switch(option) {
          case "get":
            this.model.select(query).then(result => {
                return view("@json", result);
            });
            break;
          case "count":
            this.model.count().then(result => {
                if (result.count === 0) {
                    // Add example data.
                    this.model.data();
                }
                return view("@json", { "count": result.count });
            });
            break;
          case "put":
            this.model.insert(query).then(result => {
                return view("@json", result);
            });
            break;
          case "del":
            this.model.destroy(query).then(result => {
                return view("@json", result);
            });
            break;
        }
    }
}
module.exports = Demo;
