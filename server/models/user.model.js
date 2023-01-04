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

module.exports = User;