const mongoose = require("mongoose");

const Istat = mongoose.model(
    "Istat",
    new mongoose.Schema({
        nome: String,
        codice: String,
        zona: {
            codice: String,
            nome: String
        },
        regione: {
            codice: String,
            nome: String
        },
        provincia: {
            codice: String,
            nome: String
        },
        sigla: String,
        codiceCatastale: String,
        cap: [ Number ],
        popolazione: Number
    })
);

module.exports = Istat;
