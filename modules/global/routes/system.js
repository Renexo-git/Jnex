/*
| -----------------------------------------------------------------------------
| System routes
| -----------------------------------------------------------------------------
*/
Route.get("/calendar", (req, res) => {
    controller("System").calendar();
});
Route.get("/change_password", (req, res) => {
    //return
});
Route.get("/manage_users", (req, res) => {
    //return
});
Route.get("/about", (req, res) => {
    //return
});
Route.get("/status", (req, res) => {
    controller("System").status();
});
Route.get("/service(\:)demo", (req, res) => {
    return res.json({key: "value", demo: "demo"});
});
