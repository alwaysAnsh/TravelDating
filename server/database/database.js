import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const connect = ()=> {
    mongoose.connect("mongodb+srv://takeme:takemewithyou@clustertakemewithyou.np9jc.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTakemewithyou", {
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