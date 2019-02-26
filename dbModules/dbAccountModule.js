const pgCon = require('./pgconnection');
const pool = pgCon.getPg();

//#region INSERT
//INSERT
exports.insert = function (account) {
    var query = `INSERT INTO public.account(
        username, password, "firstName", "lastName", address, "phoneNumber", "createdDate", "isAdmin")
        VALUES ('${account.username}', '${account.password}', '${account.firstName}', 
        '${account.lastName}', '${account.address}', '${account.phoneNumber}'
        , '${account.createdDate}', ${account.isAdmin});`;
    console.log(query);
    pool.query(query, (err, res) => {
        console.log(err, res)
        pool.end()
    })
};
//#endregion
//#region UPDATE
exports.update = function (account) {
    var query = `UPDATE public.account
    SET username='${account.username}',
    password='${account.password}', 
    "firstName"='${account.firstName}', 
    "lastName"='${account.lastName}', 
    address='${account.address}', 
    "phoneNumber"='${account.phoneNumber}', 
    "createdDate"='${account.createdDate}', 
    "isAdmin"=${account.isAdmin}
	WHERE id = ${account.id};`;
    console.log(query);
    pool.query(query, (err, res) => {
        console.log(err, res)
        pool.end()
    })
};
//#endregion
//#region DELETE
exports.delete = function (id) {
    var query = `DELETE FROM public.account
	WHERE id = ${id};`;
    console.log(query);
    pool.query(query, (err, res) => {
        console.log(err, res);
        pool.end();
    });
};
//#endregion
//#region LOGIN
// exports.login = async function (username, password) {
//     var query = `SELECT "isAdmin" FROM public.account
//     WHERE username = '${username}' AND password = '${password}'`;
//     var role = false;
//     client.connect();
//     await client.query(query, (err, res) => {
//         role = res.rows[0].isAdmin;
//         console.log(role + "1");
//         client.end();
//     });
//     console.log(role + "2");
//     return role;

// }
let login = (username, password) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT "isAdmin" FROM public.account
            WHERE username = '${username}' AND password = '${password}'`;
        var role = 'N';
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err, res) => {
            if(err) {
                return reject(new Error(err + ''));
            }
            if(res.rowCount > 0) {
                role = res.rows[0].isAdmin;
            }
            resolve(role);
            client.end();
        });
    });
};
exports.login = login;
//#endregion

