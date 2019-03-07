const router = require('express').Router();
const dbOrder = require('../dbModules/dbOrderModule');
const dbDetail = require('../dbModules/dbOrderDetailModule');
router.post('/create' , (req,res) => {
    req.body.orderDetailds.forEach(element => {
        console.log(element);
    });
})


module.exports = router;