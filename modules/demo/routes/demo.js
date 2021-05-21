/*
| ------------------------------------------------------------------------------
| Demo routes
| ------------------------------------------------------------------------------
*/
Route.get("/", (req, res) => {
    controller("Demo").datagrid();
});
Route.get("/book", (req, res) => {
    controller("Demo").dataform();
});
Route.all("/book/:action/:id?", (req, res) => {
    controller("Demo").crud(req.params.action, req.params.id, req.body);
});
