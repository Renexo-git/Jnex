include("BaseController.js");

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
     * Main
     * @param {Array} data
     * @access public
     */
    main(data) {
        return view("Layout/main", data);
    }

    /**
     * Returns the data grid.
     * @access public
     */
    datagrid() {
        return view("Demo/datagrid");
    }

    /**
     * Returns the data form.
     * @access public
     */
    dataform() {
        return view("Demo/dataform");
    }

    /**
     * Select the records.
     * @param {String} id
     * @access public
     */
    selectRecord(id) {
        this.model.selectRecord(parseInt(id)).then(result => {
            return view("@json", result);
        });
    }

    /**
     * Insert and update records.
     * @param {Array} data
     * @access public
     */
    putRecord(data) {
        this.model.putRecord(data).then(result => {
            return view("@json", result);
        });
    }

    /**
     * Delete records.
     * @param {Array} id
     * @access public
     */
    deleteRecord(id) {
        this.model.deleteRecord(id).then(result => {
            return view("@json", result);
        });
    }
}
