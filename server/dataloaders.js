import DataLoader from 'dataloader'
import { getCollection } from './mongoDb.js'

const batchByStudents = async(studentEmails) => {
    const studentMap = {}
    const students = await getCollection('user').find({email: {$in: studentEmails}}).toArray()
    for(const student of students){
        studentMap[student.email] = student
    }
    return studentEmails.map(key => studentMap[key] || null)
}

const batchByEmails = async(keys) => {
    const studentMap = {}
    for (const emailList of keys){
        const studentList = await studentDataLoader.loadMany(emailList)
        studentMap[emailList] = studentList
    }
    return keys.map(key => studentMap[key])
}

const studentDataLoader = new DataLoader(keys => batchByStudents(keys))

export const emailDataLoader = new DataLoader(keys => batchByEmails(keys))