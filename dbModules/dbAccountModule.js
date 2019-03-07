const pgCon = require('./pgconnection');
const pool = pgCon.getPg();

//#region INSERT
//INSERT
let insert = (account) => {
    return new Promise((resolve, reject) => {
        let query = `INSERT INTO public.account(
            username, password, "firstName", "lastName", address, "phoneNumber", "isAdmin")
            VALUES ('${account.username}', '${account.password}', '${account.firstName}', 
            '${account.lastName}', '${account.address}', '${account.phoneNumber}'
            ,  ${account.isAdmin});`;
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err, res) => {
            if (err) reject(new Error(err + ""))
            resolve();
            client.end();
        })
    })
}
exports.insert = insert;
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
let deleteOpe = (id) => {
    return new Promise((resolve, reject) => {
        let query = `DELETE FROM public.account
    WHERE id = ${id};`;
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err,res) => {
            if(err)  reject(new Error(err + ""));
            resolve();
        })
    })
}
exports.delete = deleteOpe;
//#endregion
//#region LOGIN
let login = (username, password) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM public.account
            WHERE username = '${username}' AND password = '${password}'`;
        var role = 'N';
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err, res) => {
            if (err) {
                return reject(new Error(err + ''));
            }
            if (res.rowCount > 0) {
                role = res.rows[0];
            }
            resolve(role);
            client.end();
        });
    });
};
exports.login = login;
//#endregion
//#region CHECK USERNAME
let checkUsername = (username) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM public.account
            WHERE username = '${username}'`;
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err, res) => {
            if (err) return reject(new Error(err + ''));
            if (res.rowCount > 0) {
                resolve(true);
            } else {
                resolve(false);
            }
            client.end();
        })
    })
}
exports.checkUsername = checkUsername;
//#endregion
//#region Get ALL
let getAll = () => {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM public.account`;
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err, res) => {
            if (err) reject(new Error(err + ""));
            resolve(res.rows);
            client.end();
        })
    })
}
exports.getAll = getAll;
//#endregion
//#region Make Admin
let makeAdmin = (id) => {
    return new Promise((resolve, reject) => {
        let query = `UPDATE public.account
        SET  "isAdmin"= true
        WHERE id= ${id};`
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err,res) => {
            if(err) reject(new Error(err + ""));
            resolve();
            client.end();
        })
    })
}
exports.makeAdmin = makeAdmin;
//#endregion
//#region Change Infor
let changeInfor = (account) => {
    return new Promise((resolve, reject) => {
        let query = `UPDATE public.account
        SET "firstName"='${account.firstName}', "lastName"='${account.lastName}',
         address='${account.address}', "phoneNumber"='${account.phoneNumber}'
        WHERE id=${account.id}`
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err,res) => {
            if(err) reject(new Error(err + ""));
            resolve();
            client.end();
        })
    })
}
exports.changeInfor = changeInfor;
//#endregion
//#region Change Password
let changePassword = (account) => {
    return new Promise ((resolve, reject) => {
        let query = `UPDATE public.account
        SET password='${account.password}'
        WHERE id=${account.id}`
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err,res) => {
            if(err) reject(new Error(err + ""));
            resolve();
            client.end();
        })
    })
}
exports.changePassword = changePassword;
//#endregion
//#region GET BY ID
let getById = (id) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM public.account
            WHERE id = ${id}`;
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err, res) => {
            if (err) {
                return reject(new Error(err + ''));
            }
            resolve(res.rows[0]);
            client.end();
        });
    });
};
exports.getById = getById;
//#endregion