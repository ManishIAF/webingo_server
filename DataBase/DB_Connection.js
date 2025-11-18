import mongoose from 'mongoose';

const isDataBaseConnected = async() => {

    try {
        
        //console.log("DataBase URL : ",process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI, {
            maxPoolSize: 300, // or even 200 under high load
        });
        
        return {status: true, message: "Connected to DataBase"};

    } catch (error) {

        console.log("DataBase Connection failed", error);
        return {status: false, message: error.message};
        
    }

}

export default isDataBaseConnected;