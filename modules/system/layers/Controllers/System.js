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
        model("Demo").countRecord().then(result => {
            data["total"] = result.count;
            return view("Layout/main", data);
        }).catch(error => {
            console.log(error);
        });
    }

    /**
     * System status
     * @access public
     */
    status() {
        return view("System/status");
    }

    /**
     * Calculator
     * @access public
     */
    calculator() {
        return view("System/calculator");
    }

    /**
     * Calendar
     * @access public
     */
    calendar() {
/*
        var data    = [];
        data["css"] = "/packages/js-year-calendar/dist/js-year-calendar.min.css";
        data["js"]  = "/packages/js-year-calendar/dist/js-year-calendar.min.js";
        return view("System/calendar", data);
*/
        return view("System/calendar");
    }
}
