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
     * Returns total records.
     * @access public
     */
    count() {
        this.model.countRecord().then(result => {
            return view("@json", {"total": result.count});
        });
    }

    /**
     * Basic SQL operations.
     * @access public
     */
    crud(action, id, data) {
        switch(action) {
          case "select":
            this.model.selectRecord(parseInt(id)).then(result => {
                return view("@json", result);
            });
            break;
          case "put":
            this.model.putRecord(data).then(result => {
                return view("@json", result);
            });
            break;
          case "delete":
            this.model.deleteRecord(id).then(result => {
                return view("@json", result);
            });
            break;
        }
    }
}
