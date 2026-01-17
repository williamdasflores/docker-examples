const keyValueDB = process.env.KEY_VALUE_DB;
const keyValueUSer = process.env.KEY_VALUE_USER;
const keyValuePassword = process.env.KEY_VALUE_PASSWORD;

db = db.getSiblingDB(keyValueDB);

db.createUser({
    user: keyValueUSer,
    pwd: keyValuePassword,
    roles: [
        {
            role: 'readWrite',
            db: keyValueDB
        }
    ]
})