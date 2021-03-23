/*
| -----------------------------------------------------------------------------
| Demo routes
| -----------------------------------------------------------------------------
*/
Route.get("/demo/datagrid", (req, res) => {
    controller("Demo").datagrid();
});
Route.get("/demo/dataform", (req, res) => {
    controller("Demo").dataform();
});
Route.get("/demo/select-record/:id?", (req, res) => {
    controller("Demo").selectRecord(req.params.id);
});
Route.post("/demo/put-record/:id?", (req, res) => {
    controller("Demo").putRecord(req.body);
});
Route.get("/demo/delete-record/:id", (req, res) => {
    controller("Demo").deleteRecord(req.params.id);
});
