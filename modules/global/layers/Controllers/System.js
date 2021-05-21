class System extends Controller {

    /**
     * Class constructor.
     * @access public
     */
    constructor() {
        super();
        //this.model = model("System");
    }

    /**
     * Main
     * @param {Array} data
     * @access public
     */
    main(data) {
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
     * System status
     * @access public
     */
    status() {
        return view("Information/status");
    }

    /**
     * Calendar
     * @access public
     */
    calendar() {
        return view("Tools/calendar");
    }
}
