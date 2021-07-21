import { UserType } from '../../interface/models'
import { Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import InputUserForm from './InputUserForm';
import "./manageUser.css"
import DataTable from '../common/DataTable';
import { Button, ButtonLabel } from '../common/styledComponets';
import { gql, useQuery } from '@apollo/client';

const ALL_TEACHERS = gql`
    query {
        Users(userType: "teacher")
        {
            email
            userType
            firstName
            lastName
        }
    }
`;

const ALL_STUDENTS = gql`
    query {
        Users(userType: "student")
        {
            email
            userType
            firstName
            lastName
        }
    }
`;

const ManagerUser = () => {
    const [showCreateTeacher, setShowCreateTeacher] = useState(false)
    const [showCreateStudent, setShowCreatetudent] = useState(false)

    const handleShowCreateTeacher = () => setShowCreateTeacher(true)
    const handleCloseCreateTeacher = () => setShowCreateTeacher(false)

    const handleShowCreateStudent = () => setShowCreatetudent(true)
    const handleCloseCreateStudent = () => setShowCreatetudent(false)

    const allTeachers = useQuery(ALL_TEACHERS);
    const allStudents = useQuery(ALL_STUDENTS);

    const teachersData = allTeachers.data ? allTeachers.data.Users : [] 
    const studentsData = allStudents.data ? allStudents.data.Users : []

    console.log(teachersData)

    // const handleDeleteUser = (email: string) => {
    //     dispatch(deleteUserRequest({
    //         body: null,
    //         params: email
    //     }))
    // }

    const headers = ["Email", "First Name", "Last Name", "Action"]

    return (
        <div>
            <div className="container">
                <div className="mt-3 mr-3">
                    <div className="row">
                        <div className="col-sm-6">
                            <h2>Manage Teacher</h2>
                        </div>
                        <div className="col-sm-6">
                            <Button 
                                bgColor="green" 
                                hoveredBgColor="darkgreen"
                                borderColor= "green"
                                hoveredLabelColor="white"
                                onClick={handleShowCreateTeacher}
                            > 
                                <ButtonLabel color="white"> 
                                    Add Teacher 
                                </ButtonLabel>
                            </Button>
                        </div>
                    </div>

                    <DataTable 
                        headers={() => headers.map(header => 
                            <th key={header}> {header} </th>)
                        }
                        
                        body={() =>  teachersData.map((teacher: { email: {} | null | undefined; firstName: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; lastName: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; }) => 
                            <tr>
                                <td> {teacher.email} </td>
                                <td> {teacher.firstName} </td>
                                <td> {teacher.lastName} </td>
                                <td> 
                                    <Button 
                                        bgColor="white" 
                                        hoveredBgColor="red"
                                        borderColor= "red"
                                        hoveredLabelColor="white"
                                        //onClick={() => handleDeleteUser(teacher.email)}
                                    > 
                                        <ButtonLabel color="red"> Delete </ButtonLabel>
                                    </Button>
                                </td>
                            </tr>)
                        }
                    />
                </div>

                <div className="mt-3 ml-3">
                    <div className="row">
                        <div className="col-sm-6">
                            <h2>Manage Student</h2>
                        </div>
                        <div className="col-sm-6">
                            <Button 
                                bgColor="green" 
                                hoveredBgColor="darkgreen"
                                borderColor= "green"
                                hoveredLabelColor="white"
                                onClick={handleShowCreateStudent}
                            > 
                                <ButtonLabel color="white">Add Student</ButtonLabel>
                            </Button>
                        </div>
                    </div>
                    
                    <DataTable 
                        headers={() => headers.map(header => 
                            <th key={header}> {header} </th>)
                        }
                        body={() => studentsData.map((student: { email: {} | null | undefined; firstName: string | number | boolean | {} | React.ReactNodeArray | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined; lastName: string | number | boolean | {} | React.ReactNodeArray | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined; }) => 
                            <tr>
                                <td> {student.email} </td>
                                <td> {student.firstName} </td>
                                <td> {student.lastName} </td>
                                <td> 
                                    <Button 
                                        bgColor="white" 
                                        hoveredBgColor="red"
                                        borderColor= "red"
                                        hoveredLabelColor="white"
                                        //onClick={() => handleDeleteUser(student.email)}
                                    > 
                                        <ButtonLabel color="red"> Delete </ButtonLabel>
                                    </Button>
                                </td>
                            </tr>)
                        }
                    />
                </div>
            </div>

            <Modal show={showCreateTeacher} onHide={handleCloseCreateTeacher}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Teacher
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputUserForm userType={UserType.TEACHER} closeModal={handleCloseCreateTeacher}/>
                </Modal.Body>
            </Modal>
         
            <Modal show={showCreateStudent} onHide={handleCloseCreateStudent}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Student
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputUserForm userType={UserType.STUDENT} closeModal={handleCloseCreateStudent}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ManagerUser