const pgCon = require('./pgconnection');
const pool = pgCon.getPg();


//#region Type
//INSERT
exports.insert = function(gear) {
    var query = `INSERT INTO public.gear(
        name, description, "avatarURL", "imageBucket", price, "typeId", "createdDate", "modifyDate")
        VALUES ('${gear.name}', '${gear.description}', '${gear.avatarURL}', '${gear.imageBucket}',
         ${gear.price}, ${gear.typeId}, '${gear.createdDate}', '${gear.modifyDate}')`;
    pool.query(query, (err, res) => {
        console.log(err, res)
        pool.end()
      })
};


//UPDATE
exports.update = function(gear) {
    var query = `UPDATE public.gear
        SET  name='${gear.name}', 
        description='${gear.description}', 
        "avatarURL"='${gear.avatarURL}', 
        "imageBucket"='${gear.imageBucket}', 
        price=${gear.price}, 
        "typeId"=${gear.typeId}, 
        "createdDate"='${gear.createdDate}', 
        "modifyDate"='${gear.modifyDate}'
	    WHERE id=${gear.id}`;
        pool.query(query, (err, res) => {
            console.log(err, res)
            pool.end()
          })
    };
//DELETE
exports.delete = function(id) {
    var query = `DELETE FROM public.gear
	    WHERE id =${id}`;
        pool.query(query, (err, res) => {
            console.log(err, res)
            pool.end()
          })
    };
//#endregion

