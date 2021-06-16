class Global extends Controller {

    /**
     * Class constructor.
     * @access public
     */
    constructor() {
        super();
        //this.model = model("Global");
    }

    /**
     * Main
     * @param {Array} data
     * @access public
     */
    dashboard(data) {
        data["total"] = 0;
        data["menu"]  = require(CACHE_PATH + "/menu.modules.json");
        return view("Layout/main", data);
        /*model("Demo").countRecord().then(result => {
            data["total"] = result.count;
            return view("Layout/main", data);
        }).catch(error => {
            console.log(error);
        });*/
    }

    /**
     * Calendar
     * @access public
     */
    calendar() {
        return view("Tools/calendar");
    }
}
