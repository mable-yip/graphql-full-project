import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type User {
        _id: ID!
        email: String !
        password: String
        userType: String!
        firstName: String!
        lastName: String!
    }

    type Repeat {
        cycle: String!
        startTime: String!
        endTime: String!
    }

    type Class {
        _id: ID!
        className: String!
        teacherEmail: String!
        students: [User]!
        startDate: String!
        repeat: Repeat!
    }
    
    type Query {
        Classes(teacherEmail: String, studentEmail: String): [Class]!
        Users(userType: String): [User]!
        User(email: String!): User
    }

    input UserInput {
        email: String!
        password: String!
        userType: String!
        firstName: String
        lastName: String
    }

    type Mutation {
        createUser(user: UserInput!): User,
        deleteUser(email: String!): String,
        login(email: String, password: String): String
    }
`;