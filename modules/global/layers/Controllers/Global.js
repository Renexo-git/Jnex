class Global extends Controller {

    /**
     * Class constructor.
     * @access public
     */
    constructor() {
        super();
        this.model = model("Global");
    }

    /**
     * Index
     * @access public
     */
    index(data) {
        data["total"] = $("api").get("/demo/book/count").total;
        return view("Layout/main", data);
    }

    /**
     * Calendar
     * @access public
     */
    calendar() {
        return view("Tools/calendar");
    }
}
