import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { getDetailsAPI, removeDetailsAPI } from '../services/allAPI';
import { all } from 'axios';

function EmployeeList({addEmpDetailsResponse}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[allDetails,setallDetails]=useState([])

    useEffect(()=>{
        getAllDetails()
    },[addEmpDetailsResponse])

    const getAllDetails=async()=>{
        try{
            const result=await getDetailsAPI()
            setallDetails(result.data)

        }catch(err){
            console.log(err);
        }

    }

    const handleRemoveDetails=async(detailId)=>{
        try{
            const result=await removeDetailsAPI(detailId)
            getAllDetails()

        }catch(err){
            console.log(err);
        }

    }
  return (
    <div>
        <div className="container mt-5">
            <table className='table'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>user name</th>
                        <th>email</th>
                        <th>status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                   { allDetails?.length>0?allDetails?.map((item)=>(
                    <tr key={item?.id}>
                    <td>{item?.empID}</td>
                    <td>{item?.userName}</td>
                    <td>{item?.email}</td>
                    <td>{item?.status}</td>
                    <td><button onClick={handleShow} className='btn btn-success'>Edit</button></td>
                    <td><button onClick={()=>handleRemoveDetails(item?.id)} className='btn btn-danger'>Delete</button></td>
               </tr>

                   ))
                   :
                   <div className='text-danger fw-bolder'>No Employee Details!!</div>

                    }
                </tbody>

            </table>
        </div>
        <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Employee Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please fill the following details.</p>
                    <div className='border rounded p-3 '>
                        <FloatingLabel controlId="floatingInputId" label="Employee ID" className="mb-3">
                            <Form.Control type="text" placeholder="Employee ID" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInputName" label="Employee Username" className="mb-3">
                            <Form.Control type="text" placeholder="Employee Username" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingEmail" label="Email Address" className="mb-3">
                            <Form.Control type="text" placeholder="Email Address" />
                        </FloatingLabel>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Status
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item>active</Dropdown.Item>
                                <Dropdown.Item>inactive</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>
    </div>
  )
}

export default EmployeeList