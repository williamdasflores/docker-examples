const keyValueDB = process.env.KEY_VALUE_DB;
const keyValueUser = process.env.KEY_VALUE_USER;
const keyValuePassword = process.env.KEY_VALUE_PASSWORD;

console.log(`INITIALIZING ${keyValueDB}`)
db = db.getSiblingDB(keyValueDB);

db.createUser({
    user: keyValueUser,
    pwd: keyValuePassword,
    roles: [
        {
            role: 'readWrite',
            db: keyValueDB
        },
    ],
});