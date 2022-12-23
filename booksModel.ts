import mongoose from "mongoose";

interface bookData {
    title: string,
    summmary: string,
    user: {},
}

interface isBookData extends bookData, mongoose.Document { }

const bookModel = new mongoose.Schema({
    title: {
        type: String,
    },
    summary: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
})

const myData = mongoose.model<isBookData>("books", bookModel)

export default myData