const pgCon = require('./pgconnection');
const pool = pgCon.getPg();


//#region Type
//INSERT    
let insert = (order) => {
    return new Promise((resolve, reject) => {
        let query =  `INSERT INTO public."order"(
            "accountId", "createdDate", "isFinished")
            VALUES (${order.accountId}, '${order.createdDate}', ${order.isFinished})
            RETURNING id
            `;
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err, res) => {
            if(err) reject(new Error(err + ""));
            resolve(res.rows[0]);
            console.log("CL");
            client.end();
        })
    })
}
exports.insert = insert;
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

