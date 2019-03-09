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
            resolve(res.rows[0].id);
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
let deleteOrder = (id) => {
    return new Promise((resolve, reject) => {
        let query = `DELETE FROM public."order"
        WHERE id = ${id}`;
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err,res) => {
            if(err) reject(new Error(err + ""));
            resolve();
            client.end();
        })
    })
} 
exports.delete = deleteOrder
//#endregion
//#region GET ORDER BY ACCOUNT ID
let getByAccountID = (accountId) => {
    return new Promise((resolve, reject) => {
        let query =`select id ,"createdDate" ,"isFinished",
        array(
            select t2."name" from public."orderDetail" t1
            inner join public."gear" t2 on t1."gearId" = t2.id
			where t1."orderId" = cl.id
        ) as "nameList",
         array (
            select t1."quantity" from public."orderDetail" t1
            inner join public."gear" t2 on t1."gearId" = t2.id
			 where t1."orderId" = cl.id
        ) as "quantityList",
        array(
            select t2."price" from public."orderDetail" t1
            inner join public."gear" t2 on t1."gearId" = t2.id
			where t1."orderId" = cl.id
        ) as "priceList"
        from public."order" cl
        where "accountId" =${accountId}`;
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err,res) => {
            if(err) reject(new Error(err + ""));
            resolve(res.rows);
        })
    })
}
exports.getByAccID = getByAccountID;
//#endregion
