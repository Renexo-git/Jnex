/*
| -----------------------------------------------------------------------------
| System routes
| -----------------------------------------------------------------------------
*/
Route.get("/", (req, res) => {
    controller("System").main(res.data);
});
Route.get("/system/calendar", (req, res) => {
    controller("System").calendar();
});
Route.get("/system/change_password", (req, res) => {
    //return
});
Route.get("/system/manage_users", (req, res) => {
    //return
});
Route.get("/system/about", (req, res) => {
    //return
});
Route.get("/system/status", (req, res) => {
    controller("System").status();
});
Route.get("/system/service(\:)demo", (req, res) => {
    return res.json({key: "value", demo: "demo"});
});
