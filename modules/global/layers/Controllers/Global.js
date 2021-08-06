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
        $("http").get("/demo/book/count").then(response => {
            data["count"] = response.count;
            return view("Layout/main", data);
        });
    }

    /**
     * Calendar
     * @access public
     */
    calendar() {
        return view("Tools/calendar");
    }
}
module.exports = Global;
