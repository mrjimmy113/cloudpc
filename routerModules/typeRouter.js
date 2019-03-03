const router = require('express').Router();
const dbType = require('../dbModules/dbTypeModule');
router.get("/all", (req, res) => {
    dbType.getAll().then(result => res.json(result))
        .catch(err => res.status(500));
});

module.exports = router;