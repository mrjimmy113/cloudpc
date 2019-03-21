const pgCon = require('./pgconnection');



//#region Type
//INSERT
let insert = (gear) => {
    return new Promise((resolve, reject) => {
        var query = `INSERT INTO public.gear(
            name, description, "avatarURL", price, "typeId", "isDeleted")
            VALUES ('${gear.name}', '${gear.description}', '${gear.avatarURL}',
             ${gear.price}, ${gear.typeId}, false)`;
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err, res) => {
            if (err) {
                return reject(new Error(err + ''));
            }
            else resolve();
            client.end();
        });
    });
}
exports.insert = insert;

//UPDATE
let updateGear = (gear) => {
    return new Promise((resolve, reject) => {
        var query = `UPDATE public.gear
        SET  name='${gear.name}', 
        description='${gear.description}', 
        "avatarURL"='${gear.avatarURL}', 
        price=${gear.price}, 
        "typeId"=${gear.typeId}
        WHERE id=${gear.id}`;
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err, res) => {
            if (err) reject(new Error(err + ""));
            else resolve();
            client.end();
        });
    });
};
exports.update = updateGear;
//DELETE
let deleteGear = (id) => {
    return new Promise((resolve, reject) => {
        var query = `UPDATE public.gear
        SET "isDeleted" = true
        WHERE id =${id}`;
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err, res) => {
            if (err) reject(new Error(err + ""));
            else resolve();
            client.end();
        });
    });
}
exports.delete = deleteGear;
//GET ALL
let getAll = () => {
    return new Promise((resolve, reject) => {
        let client = pgCon.getPgClient();
        let query = `SELECT * FROM public.gear WHERE "isDeleted" = false`;
        client.connect();
        client.query(query, (err, res) => {
            if (err) reject(new Error(err + ""));
            else resolve(res.rows);
            client.end();
        });
    })
}
exports.getAll = getAll;
//GET PAGE
let getPage = (search, page, perPage) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT *
        FROM public."gear"
        WHERE "isDeleted" = false AND 
        LOWER(name) LIKE LOWER('%${search}%')
        LIMIT ${perPage} OFFSET (${page} - 1) * ${perPage}
        `;
        let client = pgCon.getPgClient();
        client.connect().then(() => {
            client.query(query, (err, res) => {
                if (err) reject(new Error(err + ''));
                else resolve(res.rows);
                client.end();
            })
        }).catch(() => reject(new Error('Connection Err')));
        

    })
}
exports.getPage = getPage
//GET MAX PAGE
let getMaxPage = (search) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT COUNT(*) FROM public."gear" WHERE
        "isDeleted" = false AND  
        LOWER(name) LIKE LOWER('%${search}%')`;
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err, res) => {
            if (err) reject(new Error(err + ''));
            else resolve(res.rows[0].count);
            client.end();
        })
    })
}
exports.getMaxPage = getMaxPage

//GET MAX PAGE TYPE
let getMaxPageType = (id) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT COUNT(*) FROM public."gear" WHERE 
        "isDeleted" = false AND 
        "typeId" = ${id}`;
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err, res) => {
            if (err) reject(new Error(err + ''));
            else resolve(res.rows[0].count);
            client.end();
        })
    })
}
exports.getMaxPageType = getMaxPageType
//GET PAGE TYPE
let getPageType = (id, page, perPage) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT *
        FROM public."gear"
        WHERE "isDeleted" = false AND  
        "typeId" = ${id}
        LIMIT ${perPage} OFFSET (${page} - 1) * ${perPage}
        `;
        let client = pgCon.getPgClient();
        client.connect();
        client.query(query, (err, res) => {
            if (err) reject(new Error(err + ''));
            else resolve(res.rows);
            client.end();
        })
    })
}
exports.getPageType = getPageType
// GET RANDOM
let getRandom = (num) => {
    return new Promise((resolve, reject) => {
        let query = `select * from public."gear" 
        where "isDeleted" = false
        order by random() limit ${num}
        `;
        let client = pgCon.getPgClient();
        client.connect().then(() => {
            client.query(query, (err, res) => {
                if (err) reject(new Error(err + ''));
                else resolve(res.rows);
                client.end();
            })
        }).catch(() => reject(new Error('Connection Err')));
        

    })
}
exports.getRandom = getRandom
//#endregion



