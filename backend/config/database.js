const mongoose = require("mongoose");

const connectDB = ()=>{

    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("Connction to database is successful");
    }).catch((error)=>{
        console.log("Error connecting to database")
    })
}

module.exports = connectDB;
