const router = require('express').Router();
const dbOrder = require('../dbModules/dbOrderModule');
const dbDetail = require('../dbModules/dbOrderDetailModule');
router.post('/create' , (req,res) => {
    dbOrder.insert(req.body).then((result) => 
        dbDetail.insert(req.body.orderDetails,result).then(() => res.json(200))
        .catch((err) => console.log(err))
    ).catch((err) => console.log(err));
})
router.get('/getOrderAcc/:id', (req,res) => {
    dbOrder.getByAccID(req.params.id).then((result) => res.json(result))
    .catch((err) => {console.log(err); res.json(500)})
})
router.get('/delete/:id', (req,res) => {
    dbDetail.delete(req.params.id).then(() => {
        dbOrder.delete(req.params.id).then(() => {
            res.json(200);
        })
    }).catch(() => res.json(500));
})
router.get('/getALL' , (req,res) => {
    dbOrder.getAll().then((result) => res.json(result))
    .catch(() => res.json(500));
})
router.get('/complete/:id', (req,res) => {
    dbOrder.complete(req.params.id).then(() => res.json(200))
    .catch(() => res.json(500))
} )


module.exports = router;