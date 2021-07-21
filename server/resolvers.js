import { getCollection } from './mongoDb.js'
import { emailDataLoader } from './dataloaders.js';
import bcrypt from 'bcrypt';
import { UserInputError, ForbiddenError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

export const resolvers = {
  Class: {
      students: async (parent) => {
        return await emailDataLoader.load(parent.studentsEmail)
      }
  },
  Query: {
    Classes: async (_, {teacherEmail, studentEmail}, { user }) => {
      // if (teacherEmail && studentEmail){
      //   return await getCollection('class').find({teacherEmail: teacherEmail}).toArray()
      // }

      if (teacherEmail){
          return await getCollection('class').find({teacherEmail: teacherEmail}).toArray()
      }

      if (studentEmail){
        return await getCollection('class').find({studentsEmail: studentEmail }).toArray()
      }

      // returns all classes if teacher/student email is not provided 
      return await getCollection('class').find().toArray()
    },
    Users: async (_, {userType}, { user }) => {
      if (!user){
        throw new ForbiddenError("You are unauthorized")
      }

      // return all users of specific user type if the type is provided in arg 
      if (userType){
          return await getCollection('user').find({ userType: userType}).toArray()
      }
      // return all uers if type is not provided 
      return await getCollection('user').find().toArray()
    },
    User: async (_, {email}) => {
      if (!user){
        throw new ForbiddenError("You are unauthorized")
      }
      // return a user given the user email 
      return await getCollection('user').findOne({email: email})
    }
  },
  Mutation: {
    createUser: async (_, args, { user }) => {
      console.log("1", user)
      if (!user || user.userType !== "admin"){ // only admin can create user
        throw new ForbiddenError("You are unauthorized to create user")
      }
      const foundUser = await getCollection('user').findOne({email: args.user.email})
      if (foundUser){
        throw new UserInputError('User email had been registered.');
      }
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(args.user.password, salt)
      const hashedUser = {...args.user, password: hashedPassword}
      const result = await getCollection('user').insertOne(hashedUser)
      const createdUser = result.ops[0]
      delete createdUser.password
      return createdUser
    },
    deleteUser: async (_, { email }, { user }) => {
      if (!user){
        throw new ForbiddenError("Please log in")
      }
      if (user.userType !== "admin"){ // only admin can create user
        throw new ForbiddenError("You are unauthorized to delete user")
      }
      const foundUser = await getCollection('user').findOne({ email: email})
      if (!foundUser) {
        throw new UserInputError('User not found. ');
      }
      await getCollection('user').deleteOne({ "email": email })
      return email
    },
    login: async(_, { email, password }, { req }) => {
      const foundUser = await getCollection('user').findOne({email: email})
      if (!foundUser) {
        throw new UserInputError('Incorrect email/ password. ');
      }

      if (await bcrypt.compare(password, foundUser.password)){
        let user = foundUser
        delete user.password
        const accessToken = jwt.sign(user, "JWT_SECRET");
        return accessToken
      }
      throw new UserInputError('Incorrect email/ password. ');
    }
  }
};