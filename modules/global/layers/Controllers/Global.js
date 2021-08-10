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
     *
     * @param {Object} data
     * @access public
     */
    index(data) {
        const book = require("@demo/book");
        book.count().then(result => {
            data["count"] = result.count;
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
