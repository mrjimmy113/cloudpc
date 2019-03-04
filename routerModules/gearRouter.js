const router = require('express').Router();
const dbGear = require('../dbModules/dbGearModule');
const ggStorage = require('../otherModules/ggStorage');
router.post("/create", (req, res) => {
    let date = new Date();
    let gear = JSON.parse(req.body.gearInfo);
    let image = req.files.image;
    let name = gear.name;
    image.name = name.split(' ').join('+') + '' + date.getTime();
    ggStorage.upload(image).then(result => {
        gear.avatarURL = result;
        dbGear.insert(gear).then(() => res.json(200));
    }).catch(err => res.json(500));


})
router.get("/getAll", (req, res) => {
    dbGear.getAll().then(result => res.json(result))
        .catch(err => res.json(500));
});
router.post("/delete", (req, res) => {
    let gear = req.body;
    let imageName = gear.avatarURL;
    imageName = imageName.substring(imageName.lastIndexOf("/") + 1);
    ggStorage.deleteImage(imageName);
    dbGear.delete(gear.id).then(() => res.json(200))
        .catch(() => res.json(500));
})
router.post("/update", (req, res) => {
    let gear = JSON.parse(req.body.gearInfo);
    if (req.files != null) {
        let date = new Date();
        let imageName = gear.avatarURL;
        let image = req.files.image;
        let name = gear.name;
        image.name = name.split(' ').join('+') + '' + date.getTime();
        imageName = imageName.substring(imageName.lastIndexOf("/") + 1);
        ggStorage.deleteImage(imageName);
        ggStorage.upload(image).then(result => {
            gear.avatarURL = result;
            dbGear.update(gear).then(() => res.json(200));
        }).catch(err => res.json(500));
        return;
    }
    dbGear.update(gear).then(() => res.json(200))
    .catch((err) => {console.log(err);res.json(500)});
    

})




module.exports = router;