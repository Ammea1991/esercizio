import express from 'express';
import mysql from 'mysql';
import emailvalidator from 'email-validator';
import { v4 as uuidv4 } from 'uuid';

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
    res.send('hello from users');
});

router.get("/delete/:user_table/:user_id", (req, res) => {
    var data = {
        "user": {
            "table": req.params.user_table,
            "id": req.params.user_id
        }
    }; 

    console.log("user_table: "+data.user.table)
    console.log("id: "+data.user.id)
    res.send('hello from delete');

    var sqlParams = [data.user.id];
    if(data.user.table === 'waiting_users'){
        var sqlDelete = "DELETE FROM waiting_users WHERE id = ?";
    }else{
        var sqlDelete = "DELETE FROM users WHERE id = ?";
    }
    
    db.query(sqlDelete, sqlParams, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });
});

router.get("/getuser/:email", (req, res)=>{
    const { email } = req.params;  
    console.log("email: "+email+" is: "+ emailvalidator.validate(email))
    if(emailvalidator.validate(email)){
        const sqlSelect = "SELECT id,email,password,created_at,type FROM users WHERE email = '" + email + "'";
        db.query(sqlSelect, (err, result) => {
            console.log(result);
            console.log(err);
            if(result.length){
                res.send(result);
            }else{
                res.send("is-new");
            }            
        });
    }else{
        res.send("false");
    }
    
})

router.get("/get_waiting_users", (req, res)=>{
    const sqlSelect = "SELECT * FROM waiting_users";
        db.query(sqlSelect, (err, result) => {
            console.log(result);
            res.send(result);
        });
})


router.get("/getusers", (req, res)=>{
    const sqlSelect = "SELECT * FROM users";
        db.query(sqlSelect, (err, result) => {
            console.log(result);
            res.send(result);
        });
})

router.get("/permessi", (req, res)=>{
    const sqlSelect = "SELECT * FROM permessi";
        db.query(sqlSelect, (err, result) => {
            console.log(result);
            res.send(result);
        });
})


router.post("/insert", (req, res) => {

    const email = req.body.email
    const password = req.body.password
    const id = uuidv4();
    console.log(email)

    const sqlInsert = "INSERT INTO waiting_users (id, email, password, type) VALUES (?,?,?,'user');"
        db.query(sqlInsert, [id, email, password], (err, result) => {
            console.log(result)
            res.send(result);
    })
});

router.post("/update/:user_table/:user_id/:type", (req, res) => {
    var data = {
        "user": {
            "table": req.params.user_table,
            "type": req.params.type,
            "id": req.params.user_id
        }
    }; 

    var sqlParams = [data.user.type,data.user.id];
    if(data.user.table === 'waiting_users'){
        var sqlUpdate = "UPDATE waiting_users SET type = ? WHERE id = ?"
    }else{
        var sqlUpdate = "UPDATE users SET type = ? WHERE id = ?"
    }
    
    db.query(sqlUpdate, sqlParams, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
        res.send(result);
    });

});

router.post("/update/:user_id/:password", (req, res) => {
    var data = {
        "user": {
            "password": req.params.password,
            "id": req.params.user_id
        }
    }; 

    var sqlParams = [data.user.password,data.user.id]; 
    var sqlUpdate = "UPDATE users SET password = ? WHERE id = ?"
        
    db.query(sqlUpdate, sqlParams, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
        res.send(result);
    });

});

router.post("/move/:email", (req, res) => {

    const { email } = req.params;
    console.log("email:"+email)

    const sqlSelect = "SELECT id,email,password,created_at,type FROM waiting_users WHERE email = '" + email + "'";
    db.query(sqlSelect, (err, result, fields) => {
        console.log(result[0].id);
        const id = result[0].id;
        const email = result[0].email;
        const password = result[0].password;
        const type = result[0].type;

            const sqlInsert = "INSERT INTO users (id, email, password, type) VALUES (?,?,?,?);"
            db.query(sqlInsert, [id, email, password, type], (err, result) => {
                console.log(result)
                res.send(result);
        })
    });
    
});

/*
router.post("/insert", (req, res) => {

    const email = req.body.email
    const password = req.body.password
    const id = uuidv4();
    console.log(id)

    const sqlInsert = "INSERT INTO users (id, email, password) VALUES (?,?,?);"
        db.query(sqlInsert, [id, email, password], (err, result) => {
            console.log(result)
    })
});
*/
export default router;