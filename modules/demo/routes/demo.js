/*
| ------------------------------------------------------------------------------
| Demo routes
| ------------------------------------------------------------------------------
*/
Route.get("/", (req, res) => {
    controller("Demo").datagrid();
});
Route.get("/book", (req, res) => {
    controller("Demo").register();
});
Route.all("/book/:option/:query?", (req, res) => {
    let query = (Object.keys(req.body).length !== 0) ? req.body : req.query;
    controller("Demo").action(req.params.option, query);
});
