export enum UserType {
    ADMIN = 'admin',
    TEACHER = 'teacher',
    STUDENT = 'student',
}

export interface Admin {
    firstName: string 
    lastName: string
    email: string 
    password: string
    userType: UserType.ADMIN
}

export interface Teacher {
    firstName: string 
    lastName: string
    email: string 
    password: string
    userType: UserType.TEACHER
}

export interface Student {
    firstName: string 
    lastName: string
    email: string 
    password: string
    userType: UserType.STUDENT
}

export type AdminInfo = Omit<Admin, "password"> 
export type TeacherInfo = Omit<Teacher, "password"> 
export type StudentInfo = Omit<Student, "password" | "_id"> 

export interface AdminReducerState {
    loadingTeachers: boolean,
    loadingStudents: boolean,
    errorTeachers?: string,
    errorStudents?: string,
    teacherList: {
        [email: string]: Teacher
    }
    studentList: {
        [email: string]: Student
    },
    error?: string,
    loading: boolean
}

export enum CycleType {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    FORNIGHTLY = 'fornightly',
    MONTHLY = 'monthly'
}

export interface Repeat {
    cycle: string
    startTime: string,
    endTime: string
}

export interface ClassModel {
    _id: string 
    className: string 
    teacherEmail: string
    studentsEmail: string[]
    startDate: string 
    repeat: Repeat
}

export interface ClassModelWithStudentInfo {
    className: string 
    teacherEmail: string
    startDate: string
    repeat: Repeat
    studentInfo: StudentInfo[]
}

export type ClassModelPreview = Omit<ClassModel, "_id"> 

export interface TeacherReducerState {
    loading: boolean,
    error: null | string,
    classList: {
        [email: string]: ClassModel
    },
    studentList: {
        [email: string]: Student
    }
}

export interface AuthReducerState {
    firstName?: string,
    lastName?: string,
    email?: string,
    userType?: UserType.ADMIN | UserType.STUDENT | UserType.TEACHER,
    error?: string,
    loading: boolean,
    signIn: boolean
}

export interface SignInInfo {
    email: string,
    password: string
}

export enum InputFormType {
    CREATE = "create",
    EDIT = "edit"
}

export interface BasicClassInfo {
    className: string 
    startDate: string
    repeat: Repeat
}

export interface UpdatedForm {
    className?: string
    startDate?: string
    repeat?: {
        cycle?: string,
        startTime?: string,
        endTime?: string
    },
    addedStudentEmail?: string[]
    deletedStudentEmail?: string[]
}