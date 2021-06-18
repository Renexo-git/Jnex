/*
| ------------------------------------------------------------------------------
| Global routes
| ------------------------------------------------------------------------------
*/
Route.get("/", (req, res) => {
    controller("Global").index(res.data);
});
Route.get("/calendar", (req, res) => {
    controller("Global").calendar();
});
