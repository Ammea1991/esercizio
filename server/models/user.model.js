const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        name: String,
        surname: String,
        birth_date: { type: String },
        phone_number: String,
        shipping_address: {
            country: { type: String },
            region: { type: String },
            province: { type: String },
            locality: { type: String },
            route: { type: String },
            street_number: { type: String },
            postal_code: { type: String }
        },
        codice_fiscale: String,
        email: String,
        password: String,
        created_at: { type: Date },
        settings: [{
            dark_theme: Boolean,
        }]
    }).index({ '$**': 'text' })
);
//User.index({ name: 'text', surname: 'text', birth_date: 'text', phone_number: 'text', nome: 'text', address: 'text', codice_fiscale: 'text', email: 'text' });
//User.index({name: 'text', 'regione.nome': 'text'});

module.exports = User;