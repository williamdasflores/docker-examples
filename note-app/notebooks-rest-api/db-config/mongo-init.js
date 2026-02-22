const notebooksDBUser = process.env.NOTEBOOK_DB_USER;
const notebooksDBPassword = process.env.NOTEBOOK_DB_PASSWORD;
const notebooksDBName = process.env.NOTEBOOKS_DB_NAME;

console.log(`INITIALIZING ${notebooksDBName}`);
db = db.getSiblingDB(notebooksDBName)

db.createUser({
    user: notebooksDBUser,
    pwd: notebooksDBPassword,
    roles: [
        {
            role: 'readWrite',
            db: notebooksDBName
        },
    ],
});