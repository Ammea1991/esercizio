const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/delete",
        controller.delete
    );

    app.post(
        "/api/auth/update",
        controller.update
    );

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateEmail,
        ],
        controller.signup
    );

    app.post(
        "/api/auth/changePsw",
        controller.changePsw
    );

    app.post("/api/auth/signin", controller.signin);
    app.get("/api/auth/user", controller.getUser);
};