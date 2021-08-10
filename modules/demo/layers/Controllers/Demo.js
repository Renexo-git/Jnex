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
    dataform() {
        return view("dataform");
    }

    /**
     * Database operations.
     *
     * @param {String} operation
     * @param {Object} data
     * @access public
     */
    crud(operation, data) {
        this.model[operation](data).then(result => {
            return view("@json", result);
        });
    }
}
module.exports = Demo;
