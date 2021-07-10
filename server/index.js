import './mongoDb.js'
import express from 'express'
import { ApolloServer } from 'apollo-server-express';
import { getCollection } from './mongoDb.js'
import DataLoader from 'dataloader'
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';

const starServer = async() => {
    const app = express()
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        context: () => {
            return {
                studentLoader: new DataLoader(async keys => {               
                    const studentMap = {}
                    for (const emailList of keys){
                        const studentList = await getCollection('user').find({email: {$in: emailList}}).toArray()
                        studentMap[emailList] = studentList
                    }
                    return keys.map(key => studentMap[key])
                })
            }
        }
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({app: app})
    app.use((req, res) => {
        res.send("hello from express apollo server ")
    })
    app.listen(4000, () => console.log("Server in running on port 4000. "))
}


starServer()