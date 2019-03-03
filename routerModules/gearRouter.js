const router = require('express').Router();
const dbGear = require('../dbModules/dbGearModule');
const ggStorage = require('../otherModules/ggStorage');
router.post("/create", (req,res) => {
    let date = new Date();
    let gear = JSON.parse(req.body.gearInfo);
    let image = req.files.image;
    let name = gear.name;
    image.name = name.split(' ').join('+') + '' +date.getTime();
    ggStorage.upload(image).then(result => {
        gear.avatarURL = result;
        dbGear.insert(gear).then(() => res.json(200));
    }).catch(err=> res.json(500));
    
    
})
router.get("/getAll", (req,res)=> {
    dbGear.getAll().then(result => res.json(result))
    .catch(err => res.json(500));
});




module.exports = router;