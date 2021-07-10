import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type User {
        _id: ID!
        email: String !
        password: String!
        userType: String!
        firstName: String
        lastName: String 
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
        hello: String 
        getAllClasses: [Class]
        getAllClassesByTeacher(email: String): [Class]
        getUser(email: String): User
        getAllTeachers: [User]
        getAllStudents: [User]
    }

    input UserInput {
        email: String 
        password: String
        userType: String
        firstName: String
        lastName: String 
    }

    type Mutation {
        createUser(user: UserInput): User
    }
  
`;