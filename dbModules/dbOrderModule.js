const pgCon = require('./pgconnection');
const pool = pgCon.getPg();


//#region Type
//INSERT
exports.insert = function(order) {
    var query = `INSERT INTO public."order"(
        "accountId", "createdDate", "isFinished")
        VALUES (${order.accountId}, '${order.createdDate}', ${order.isFinished})`;
    pool.query(query, (err, res) => {
        console.log(err, res)
        pool.end()
      })
};


//UPDATE
exports.update = function(order) {
    var query = `UPDATE public."order"
        SET "accountId"=${order.accountId}, 
        "createdDate"='${order.createdDate}', 
        "isFinished"=${order.isFinished}
	    WHERE id = ${order.id}`;
        pool.query(query, (err, res) => {
            console.log(err, res)
            pool.end()
          })
    };
//DELETE
exports.delete = function(id) {
    var query = `DELETE FROM public."order"
	    WHERE id = ${id}`;
        pool.query(query, (err, res) => {
            console.log(err, res)
            pool.end()
          })
    };
//#endregion

