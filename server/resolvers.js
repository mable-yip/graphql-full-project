export const resolvers = {
    Class: {
        students: async (parent, _, context) => {
            return context.studentLoader.load(parent.studentsEmail)
        }
    },
    Query: {
      hello: () => {
          return "hello world "
      },
      getAllClasses: async() => {
        return await getCollection('class').find().toArray()
      },
      getAllClassesByTeacher: async (_, {email}, ___) => {
          return await getCollection('class').find({teacherEmail: email}).toArray()
      },
      getAllTeachers: async () => {
          return await getCollection('user').find({ userType: "teacher"}).toArray()
      },
      getAllStudents: async () => {
        return await getCollection('user').find({ userType: "student"}).toArray()
      },
      getUser: async (_, {email}, ___) => {
          return await getCollection('user').findOne({email: email})
      }
    },
    Mutation: {
        createUser: async (_, args) => {
            const user = args.user
            const result = await getCollection('user').insertOne(user)
            return result.ops[0]
        }
    }
  };