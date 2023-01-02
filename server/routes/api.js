import express from 'express';
import mysql from 'mysql';



const router = express.Router();
const db  = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "myWebSite"
});

db.connect((err) => {
    if(err){throw err} else {console.log("connected")}
});

router.get('/', (req, res) => {
    res.send('hello from api');
});

router.post("/createNewUser", (req, res) => {
    const token = generateAccesToken({username: req.body.email});
    res.json(token);
});


export default router;