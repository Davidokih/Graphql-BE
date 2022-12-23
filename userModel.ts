import mongoose from "mongoose"

interface userData {
    name: string,
    email: string,
    book: {}[];
    password: string
}

interface myUserData extends userData, mongoose.Document { }

const userModel = new mongoose.Schema({
    name:{
        type: String,
    },
    email: {
        type:String,
    },
    book:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books"
    }],
    password: {
        type: String,
    }
})
const myModule = mongoose.model<myUserData>("user", userModel)
export default myModule