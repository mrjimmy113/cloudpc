const pgCon = require('./pgconnection');
const pool = pgCon.getPg();


//#region Type
//INSERT
exports.insert = function(type) {
    var query = `INSERT INTO public.type(name) 
        VALUES ('${type.name}')`;
    pool.query(query, (err, res) => {
        console.log(err, res)
        pool.end()
      })
};


//UPDATE
exports.update = function(type) {
    var query = `UPDATE public.type
        SET name='${type.name}'
        WHERE id = ${type.id}`;
        pool.query(query, (err, res) => {
            console.log(err, res)
            pool.end()
          })
    };
//DELETE
exports.delete = function(id) {
    var query = `DELETE FROM public.type
	    WHERE id = ${id}`;
        pool.query(query, (err, res) => {
            console.log(err, res)
            pool.end()
          })
    };
//#endregion

