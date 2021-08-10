/*
| ------------------------------------------------------------------------------
| Demo routes
| ------------------------------------------------------------------------------
*/
// http://localhost:3000/demo
Route.get("/", (req, res) => {
    controller("Demo").datagrid();
});
// http://localhost:3000/demo/book
Route.get("/book", (req, res) => {
    controller("Demo").dataform();
});
/*
| ------------------------------------------------------------------------------
| operation: get | put | del
| data: ?key=value
| ------------------------------------------------------------------------------
| GET  | http://localhost:3000/demo/book/get
| GET  | http://localhost:3000/demo/book/get/?id=1&id=2
| POST | http://localhost:3000/demo/book/put
| GET  | http://localhost:3000/demo/book/del/?id=1,2,3,4,5,6,7,8,9...
| ------------------------------------------------------------------------------
*/
Route.all("/book/:operation/:data?", (req, res) => {
    let data = (Object.keys(req.body).length !== 0) ? req.body : req.query;
    controller("Demo").crud(req.params.operation, data);
});
