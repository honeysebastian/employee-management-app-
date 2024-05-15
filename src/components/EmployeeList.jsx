import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { getDetailsAPI, removeDetailsAPI, updateDetailsAPI } from '../services/allAPI';
import { all } from 'axios';

function EmployeeList({ addEmpDetailsResponse }) {
    const [show, setShow] = useState(false);
    const [allDetails, setallDetails] = useState([])
    const [currentDetails, setCurrentDetails] = useState({
        empID: '', userName: '', email: '', status: ''
    })
    const [detailsUpdateResponse, setDdetailsUpdateResponse] = useState('')

    useEffect(() => {
        getAllDetails()
    }, [addEmpDetailsResponse, detailsUpdateResponse])

    const handleClose = () => setShow(false);

    const handleShow = (details) => {
        setCurrentDetails(details)
        setShow(true)
    }

    const getAllDetails = async () => {
        try {
            const result = await getDetailsAPI()
            setallDetails(result.data)
        } catch (err) {
            console.log(err);
        }
    }

    const handleRemoveDetails = async (detailId) => {
        try {
            const result = await removeDetailsAPI(detailId)
            getAllDetails()
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdateDetails = async (id) => {
        try {
            const result = await updateDetailsAPI(id, currentDetails)
            setDdetailsUpdateResponse(result.data)
            handleClose()
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div>
            <div className="container mt-2">
                <table className='table p-5'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USERNAME</th>
                            <th>EMAIL</th>
                            <th>STATUS</th>
                            <th>EDIT</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allDetails?.length > 0 ? allDetails?.map((item) => (
                            <tr key={item?.id}>
                                <td>{item?.empID}</td>
                                <td>{item?.userName}</td>
                                <td>{item?.email}</td>
                                <td>{item?.status}</td>
                                <td><button onClick={() => handleShow(item)} className='btn btn-success'>Edit</button></td>
                                <td><button onClick={() => handleRemoveDetails(item?.id)} className='btn btn-danger'>Delete</button></td>
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
                    <p>Update the following details.</p>
                    <div className='border rounded p-3 '>
                        <FloatingLabel controlId="floatingInputId" label="Employee ID" className="mb-3">
                            <Form.Control value={currentDetails.empID} onChange={e => setCurrentDetails({ ...currentDetails, empID: e.target.value })} type="text" placeholder="Employee ID" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInputName" label="Employee Username" className="mb-3">
                            <Form.Control value={currentDetails.userName} onChange={e => setCurrentDetails({ ...currentDetails, userName: e.target.value })} type="text" placeholder="Employee Username" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingEmail" label="Email Address" className="mb-3">
                            <Form.Control value={currentDetails.email} onChange={e => setCurrentDetails({ ...currentDetails, email: e.target.value })} type="text" placeholder="Email Address" />
                        </FloatingLabel>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {currentDetails.status}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setCurrentDetails({ ...currentDetails, status: 'active' })}>active</Dropdown.Item>
                                <Dropdown.Item onClick={() => setCurrentDetails({ ...currentDetails, status: 'inactive' })}>inactive</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleUpdateDetails(currentDetails.id)} variant="primary">Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EmployeeList