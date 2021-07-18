import './mongoDb.js'
import express from 'express'
import { ApolloServer, AuthenticationError, gql, UserInputError } from 'apollo-server-express';
import { privateTypeDefs, publicTypeDefs } from './typeDefs.js';
import { privateResolvers, publicResolvers } from './resolvers.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcrypt';

const privateServer = async() => {
    const app = express()
    app.use(cors())
    app.use(cookieParser())
    const apolloServer = new ApolloServer({
        typeDefs: privateTypeDefs,
        resolvers: privateResolvers,
        context: ( { req } ) => {
            const authHeader = req.headers.authorization || '';

            const token = authHeader && authHeader.split(' ')[1]

            if (!token) throw new AuthenticationError('you must be logged in');

            try{
                const user = jwt.verify(token, "JWT_SECRET")
                console.log(user)
                return {user}
            } catch (error){
                throw new AuthenticationError('Invalid token');
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

const publicServer = async() => {
    const app = express()
    app.use(cors())
    app.use(cookieParser())
    const apolloServer = new ApolloServer({
        typeDefs: publicTypeDefs,
        resolvers: publicResolvers
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({app: app})
    app.use((req, res) => {
        res.send("hello from express apollo server ")
    })
    app.listen(4001, () => console.log("Server in running on port 4001. "))
}

privateServer()

publicServer()