import './mongoDb.js'
import express from 'express'
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken'; 

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        req.user = null
        return next();
    }

    try{
        const user = jwt.verify(token, "JWT_SECRET")
        console.log("!!!", user)
        req.user = {user}
    } catch (error){
        throw new AuthenticationError('Invalid token!!!!!!!!!!!!');
    }
    return next();
  };

const grahQLServer = async() => {
    const app = express()
    app.use(express.static('public'))
    app.use(cors())
    app.use(cookieParser())
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        context: ( { req } ) => {
            if(req.user) return req.user
            return null
        }
    })

    await apolloServer.start()
    app.use(auth)
    apolloServer.applyMiddleware({app: app})
    app.use((req, res) => {
        res.send("hello from express apollo server ")
    })
    app.listen(4000, () => console.log("Server in running on port 4000. "))
}

grahQLServer()