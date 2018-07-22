const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/cars', (req, res) => {
    if(req.isAuthenticated()){//in order to post an item, user must be signed in
        let queryText = `SELECT * from cars;`
        pool.query(queryText)
        .then((result)=>{
            
            res.send(result.rows);
        }).catch((err)=>{
            console.log(err);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403);
    }
});

router.post('/driverId', (req, res) => {
    let personId = req.body.driver
    
    if(req.isAuthenticated()){//in order to post an item, user must be signed in
        let queryText = `SELECT * from drivers WHERE driver_id = $1;`
        pool.query(queryText, [personId])
        .then((result)=>{
            
            res.send(result.rows);
        }).catch((err)=>{
            console.log(err);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403);
    }
});


router.post('/post', (req, res) => {

let car = req.body
let userId = req.body.userId
if(req.isAuthenticated()){//in order to post an item, user must be signed in
    (async () => {
        //creates async function
        const client = await pool.connect();
        // await will wait for a return on the fiven function and then do something
        try {
            await client.query('BEGIN') // tells DB to be ready for multiple lines of queries
            let queryText = `INSERT INTO cars ("car_model", "car_make", "car_year", "car_miles") VALUES ($1,$2,$3,$4) RETURNING car_id;`;
             let result1 = await client.query(queryText, [car.model, car.make, car.year, car.miles])
             
             let carId = result1.rows[0].car_id
             let queryText2 = `INSERT INTO drivers ("driver_id", "car_id") VALUES ($1,$2);`;
             await client.query(queryText2, [userId, carId])
             await client.query('COMMIT');
                res.send('ok')
            } catch (error) {
                console.log('ROLLBACK', error);
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
                //will end connection to database
            };// end try/catch
        })().catch((error) => {
            console.log('CATCH org.leader.order.router.get', error);
            res.sendStatus(500);
        })//end async
    } else {
        res.sendStatus(403)
    };//end if/else
});//end router.post
    

router.post('/transactionpost', (req, res) => {
    
let transaction = req.body
if(req.isAuthenticated()){//in order to post an item, user must be signed in
    let queryText = `INSERT INTO transactions ("driver_id","city", "state", "car_milage", "price_gallon", "gallons_purchased") VALUES ($1,$2,$3,$4,$5,$6);`
    pool.query(queryText, [transaction.driver_id, transaction.city, transaction.state, transaction.milage,transaction.gallonPrice,transaction.gallons_purchased])
    .then((result)=>{
        res.sendStatus(201);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500)
    })
} else {
    res.sendStatus(403);
}
});

module.exports = router;