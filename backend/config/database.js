import mongoose from "mongoose"
 
const connectdb = async ()=>{
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Database Connected");
    }).catch((err)=>{console.log(err)})
}
export default connectdb;