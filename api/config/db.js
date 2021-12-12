const mongoose = require("mongoose");

  //async req: because sometimes we need to call alot of data and it happens like in a mongodb we are calling async 

const connectDB = async() => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true, // we can see some errors. we can not see the errors while running anything out there
            useNewUrlParser: true,
            //useCreateIndex: true // because we do not want to see any errors afterwards
        });
        console.log(`MongoDB connected ${connect.connection.host}`)
    } catch(error){  
        console.error(`Error: ${error.message}`);
        process.exit(1); //to exit from error.
        // console.log({error});
    }
}

module.exports = connectDB;