import mongoose from "mongoose";


export const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "MERN_STACK-HOSPITAL_MANAGEMENT_SYSTEM",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 15000,
        family: 4
    }).then(()=>{
        console.log("Connected to databse!");
    }).catch(err=>{
        console.log(`Some error occured while connecring database: ${err}`);
        
    });
};