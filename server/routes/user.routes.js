const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const db = require("../models");
const mongodb = require("mongodb");

const User = db.user;
const Istat = db.istat;
const Products = db.products;

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/auth/all", controller.allAccess);

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

    app.get("/api/istat", function (req, res) {
        Istat.find({},
            (err, istat) => {
                res.send(istat);
            });
    });

    app.get("/api/istat/regione", function (req, res) {
        const cod_reg = req.query.cod_reg;
        const nome_reg = req.query.nome_reg;
        Istat.find({},
            (err, istat) => {
                var new_arr = istat.map(x => {
                    return x.regione;
                })
                const uniqueArray = new_arr.filter((value, index) => {
                    const _value = JSON.stringify(value);
                    return index === new_arr.findIndex(obj => {
                        return JSON.stringify(obj) === _value;
                    });
                })
                res.send(uniqueArray);
            });
    });

    app.get("/api/istat/provincia", function (req, res) {
        const nome_reg = req.query.nome_reg;
        Istat.find({ "regione.nome": nome_reg },
            (err, istat) => {
                var new_arr = istat.map(x => {
                    return x.provincia;
                })
                const uniqueArray = new_arr.filter((value, index) => {
                    const _value = JSON.stringify(value);
                    return index === new_arr.findIndex(obj => {
                        return JSON.stringify(obj) === _value;
                    });
                })
                res.send(uniqueArray);
            });
    });

    app.get("/api/istat/comune", function (req, res) {
        const nome_provincia = req.query.nome_provincia;
        Istat.find({ "provincia.nome": nome_provincia },
            (err, istat) => {
                var new_arr = istat.map(x => {
                    var obj = { codice: x.codice, nome: x.nome }
                    return obj;
                })
                const uniqueArray = new_arr.filter((value, index) => {
                    const _value = JSON.stringify(value);
                    return index === new_arr.findIndex(obj => {
                        return JSON.stringify(obj) === _value;
                    });
                })
                res.send(uniqueArray);
            });
    });

    app.get("/api/products", function (req, res) {
        Products.find({},
            (err, Product) => {
                res.send(Product);
            });
    });
};