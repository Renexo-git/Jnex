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
     * @param {Object} data
     * @access public
     */
    action(option, data) {
        switch(option) {
          case "get":
            this.model.select(data).then(result => {
                return view("@json", result);
            });
            break;
          case "put":
            this.model.insert(data).then(result => {
                return view("@json", result);
            });
            break;
          case "del":
            this.model.destroy(data).then(result => {
                return view("@json", result);
            });
            break;
        }
    }
}
module.exports = Demo;
