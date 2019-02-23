const pgCon = require('./pgconnection');
const pool = pgCon.getPg();


//#region Type
//INSERT
exports.insert = function(orderDetail) {
    var query = `INSERT INTO public."orderDetail"(
        "orderId", "gearId", quantity)
        VALUES (${orderDetail.orderId}, ${orderDetail.gearId}, ${orderDetail.quantity})`;
    pool.query(query, (err, res) => {
        console.log(err, res)
        pool.end()
      })
};


//UPDATE
exports.update = function(orderDetail) {
    var query = `UPDATE public."orderDetail"
        SET "orderId"=${orderDetail.orderId}, 
        "gearId"=${orderDetail.gearId}, 
        quantity=${orderDetail.quantity}
	    WHERE id =${orderDetail.id}`;
        pool.query(query, (err, res) => {
            console.log(err, res)
            pool.end()
          })
    };
//DELETE
exports.delete = function(id) {
    var query = `DELETE FROM public."orderDetail"
	    WHERE = ${id}`;
        pool.query(query, (err, res) => {
            console.log(err, res)
            pool.end()
          })
    };
//#endregion

