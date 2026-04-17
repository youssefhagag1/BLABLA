const mongoose = require("mongoose")
const databaseConnecton = () =>{
    mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) => {
        console.log("Database Connected : " ,conn.connection.host)
    })
}
module.exports = databaseConnecton
