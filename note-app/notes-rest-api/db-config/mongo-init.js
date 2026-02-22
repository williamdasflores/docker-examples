const noteDBUser = process.env.NOTES_DB_USER;
const noteDBPassword = process.env.NOTES_DB_PASSWORD;
const noteDBName = process.env.NOTES_DB_NAME;

console.log(`INITIALIZING ${noteDBName}`);
db = db.getSiblingDB(noteDBName)

db.createUser({
    user: noteDBUser,
    pwd: noteDBPassword,
    roles: [
        {
            role: 'readWrite',
            db: noteDBName
        },
    ],
});