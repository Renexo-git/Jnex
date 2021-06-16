/*
| ------------------------------------------------------------------------------
| Global routes
| ------------------------------------------------------------------------------
*/
Route.get("/", (req, res) => {
    controller("Global").dashboard();
});
Route.get("/calendar", (req, res) => {
    controller("Global").calendar();
});
