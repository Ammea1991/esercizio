const db = require("../models");
const User = db.user;

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //USERS READ API
    app.get("/api/user", function (req, res) {
        const email = req.query.email
        console.log(email)
        User.findOne(
            {
                email: email
            },
            (err, user) => {
                console.log(user)
                if (err) res.status(400).send({ message: err.message });
                //res.send(user);
                res.status(200).send({ user: user, message: `User ${user.name} ${user.surname} !` });

            });
    });

    //MULTI USERS READ API
    app.get("/api/users", function (req, res) {
        User.find({},
            (err, users) => {
                res.send(users);
            });
    });

    app.get("/api/users/search", async function (req, res) {
        console.log(req.query.q)
        const searchString = req.query.q
        const result = await User.find({ $text: { $search: searchString } });
        res.send(result);
    });
};