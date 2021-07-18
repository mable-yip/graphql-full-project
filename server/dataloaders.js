import DataLoader from 'dataloader'
import { getCollection } from './mongoDb.js'

const batchByStudents = async(studentEmails) => {
    const students = await getCollection('user').find({email: {$in: studentEmails}}).toArray()
    return studentEmails.map(key => students.find(student => student.email === key) || null)
}

const batchByEmails = async(keys) => {
    const studentMap = {}
    for (const emailList of keys){
        const studentList = await dataLoader.loadMany(emailList)
        studentMap[emailList] = studentList
    }
    return keys.map(key => studentMap[key])
}

const dataLoader = new DataLoader(keys => batchByStudents(keys))

export const studentDataLoader = new DataLoader(keys => batchByEmails(keys))