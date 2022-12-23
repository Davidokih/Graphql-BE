import express, { Application } from "express"
import cors from "cors"
import { graphqlHTTP} from "express-graphql"
import schema from "./schema"
import mongoose from "mongoose"

mongoose.connect("mongodb://localhost/graphqlData").then(() => {
    console.log("database Connected")
}).catch((err) => {
    console.log(err)
})
const app: Application = express()
const port: number = 1111

app.use(cors())
app.use(express.json())

app.use("/api",  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }))

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})
