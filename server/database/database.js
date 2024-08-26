import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const connect = ()=> {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology : true,
    })
    .then(()=> console.log("DB connection successfull"))
    .catch((err) => {
        console.log("DB connection Failed!!")
        console.log("Error is : ", err);
        process.exit(1);
    });
};

export default connect;