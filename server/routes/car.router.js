const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route template
 */
router.post('/post', (req, res) => {
console.log(req.body)
let car = req.body
if(req.isAuthenticated()){//in order to post an item, user must be signed in
    let queryText = `INSERT INTO cars ("car_model", "car_make", "car_year", "car_miles") VALUES ($1,$2,$3,$4);`;
    pool.query(queryText, [car.model, car.make, car.year, car.miles]).then((result)=>{
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