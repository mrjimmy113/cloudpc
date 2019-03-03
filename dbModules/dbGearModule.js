const pgCon = require('./pgconnection');



//#region Type
//INSERT
let insert = (gear) => {
    return new Promise((resolve, reject) => {
        var query = `INSERT INTO public.gear(
            name, description, "avatarURL", price, "typeId")
            VALUES ('${gear.name}', '${gear.description}', '${gear.avatarURL}',
             ${gear.price}, ${gear.typeId})`;
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query,(err,res) => {
            if(err) {
                return reject(new Error(err + ''));
            }
            resolve();
            client.end();
        });
    });
}
exports.insert = insert;

//UPDATE
exports.update = function (gear) {
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
exports.delete = function (id) {
    var query = `DELETE FROM public.gear
	    WHERE id =${id}`;
    pool.query(query, (err, res) => {
        console.log(err, res)
        pool.end()
    })
};
//GET ALL
let getAll = () => {
    return new Promise((resolve,reject) => {
        let client = pgCon.getPgClient();
        let query = `SELECT * FROM public.gear`;
        client.connect();
        client.query(query, (err,res) => {
            if(err) reject(new Error(err + ""));
            resolve(res.rows);
            client.end();
        });
    })
}
exports.getAll = getAll;
//#endregion

