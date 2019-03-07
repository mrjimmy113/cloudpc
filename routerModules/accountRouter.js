const router = require('express').Router();
const dbAccount = require('../dbModules/dbAccountModule');
router.post('/create', (req,res) => {
    dbAccount.insert(req.body).then(() => res.json(200))
    .catch((err) => {console.log(err); res.json(500)});
})
router.get('/check/:username', (req,res) => {
    dbAccount.checkUsername(req.params.username).then(result => res.json(result))
    .catch(() => res.json(500));
})
router.get('/getAll', (req,res) => {
    dbAccount.getAll().then(result => res.json(result))
    .catch((err) => {console.log(err); res.json(500)});
})
router.get('/dash/:id', (req,res) => {
    dbAccount.makeAdmin(req.params.id).then(() => res.json(200))
    .catch(() => res.json(500));
})
router.delete('/dash/:id', (req,res) => {
   dbAccount.delete(req.params.id).then(() => res.json(200))
   .catch(() => res.json(500)); 
})
router.post('/change/password', (req,res) => {

})
router.post('/change/infor', (req,res) => {
    
})

module.exports = router;