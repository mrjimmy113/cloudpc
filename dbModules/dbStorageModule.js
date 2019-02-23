const pgCon = require('./pgconnection');
const pool = pgCon.getPg();


//#region Type
//INSERT
exports.insert = function(storage) {
    var query = `INSERT INTO public."storageGear"(
        "producerCode", "gearId", "importDate", "isSold")
        VALUES ('${storage.producerCode}', ${storage.gearId},
         '${storage.importDate}', ${storage.isSold});`;
    pool.query(query, (err, res) => {
        console.log(err, res)
        pool.end()
      })
};


//UPDATE
exports.update = function(storage) {
    var query = `UPDATE public."storageGear"
        SET "producerCode"='${storage.producerCode}', 
        "gearId"=${storage.gearId}, 
        "importDate"='${storage.importDate}', 
        "isSold"= ${storage.isSold}
	    WHERE id = ${storage.id}`;
        pool.query(query, (err, res) => {
            console.log(err, res)
            pool.end()
          })
    };
//DELETE
exports.delete = function(id) {
    var query = `DELETE FROM public."storageGear"
	    WHERE id = ${id}`;
        pool.query(query, (err, res) => {
            console.log(err, res)
            pool.end()
          })
    };
//#endregion

