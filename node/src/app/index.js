const usersRouter = require("./studentdata/router");
const adminRoute = require("./signin/router")

module.exports = (app) => {
    app.use("/users", usersRouter);
    app.use("/admin", adminRoute);
};
