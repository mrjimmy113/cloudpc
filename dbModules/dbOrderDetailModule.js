const pgCon = require('./pgconnection');
const pool = pgCon.getPg();


//#region Type
//INSERT
let insert = (orderDetails, orderId) => {
    return new Promise((resolve, reject) => {
        let query = `INSERT INTO public."orderDetail"(
            "orderId", "gearId", quantity)
            VALUES `;
        orderDetails.forEach(orderDetail => {
            query += `(${orderId}, ${orderDetail.gearId}, ${orderDetail.quantity}),`;
        });
        query = query.substring(0, query.lastIndexOf(","));
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err, res) => {
            if (err) reject(new Error(err + ''));
            resolve();
            client.end();
        })
    })
}
exports.insert = insert;
//UPDATE
exports.update = function (orderDetail) {
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
let deleteDetail = (orderId) => {
    return new Promise((resolve, reject) => {
        let query = `DELETE FROM public."orderDetail"
    WHERE "orderId"= ${orderId}`;
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err, res) => {
            if (err) reject(new Error(err + ""));
            resolve();
            client.end();
        })
    })
}
exports.delete = deleteDetail;
//#endregion

