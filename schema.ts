// import data from "./data.json"
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema } from "graphql"
import userModel from "./userModel"

// const data = [
//     {"id": 1,"name":"David","email": "dav112@gmail.com","password": "dhdhfgryryr" },
//     {"id": 2,"name":"David","email": "dav112@gmail.com","password": "dhdhfgryryr"  },
//     {"id": 3,"name":"David","email": "dav112@gmail.com","password": "dhdhfgryryr"  },
//     {"id": 4,"name":"David","email": "dav112@gmail.com","password": "dhdhfgryryr"  },
//     {"id": 5,"name":"David","email": "dav112@gmail.com","password": "dhdhfgryryr"  },
//     {"id": 6,"name":"David","email": "dav112@gmail.com","password": "dhdhfgryryr"  }
// ]
// type Mutation {
//     updateUser(id: ID!, name: String): User
// }
const myDocument = new GraphQLObjectType({
    name: "myDocument",
    fields: () => ({
        id: { type: GraphQLID },
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
    })
})

const documentQuery = new GraphQLObjectType({
    name: "documentQuery",
    fields: {
        getUsers: {
            type: new GraphQLList(myDocument),
            resolve: () => {
                return userModel.find()
            }
        },
        getUser: {
            type: myDocument,
            args: {
                id: {type: GraphQLID}
            },
            resolve: (_, args) => {
                const { id } = args;
                return userModel.findById(id)
            }
        }
    },
})
const mutation = new GraphQLObjectType({
    name: "mutation",
    fields: {
        createUser: {
            type: myDocument,
            args: {
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve: (_, args) => {
                const { name, email, password } = args
                return userModel.create({
                    name,
                    email,
                    password
                })
            }
        },
        getUser: {
            type: myDocument,
            resolve: ()=>{
                return userModel.find()
            }
        },
        updateUser: {
            type: myDocument,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve: (_, args) => {
                const { name, email, password,id } = args
                return userModel.findByIdAndUpdate(id,{
                    name,
                    email,
                    password
                },{new: true})
            }
        },
        deleteUser: {
            type: myDocument,
            args: {
                id: {type: GraphQLID}
            },
            resolve: (_, args) => {
                const { id } = args
                return userModel.findByIdAndDelete(id)
            }
        }
    }
})

const myExport = new GraphQLSchema({
    query: documentQuery,
    mutation: mutation
})

export default myExport