import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { addDetailsAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';


function AddEmployee({ setAddEmpDetailsResponse }) {
    const [show, setShow] = useState(false);
    const [empDetails, setEmpDetails] = useState({
        empID: '', userName: '', email: '', status: ''
    })

    const[InvalidEmail,setInavalidEmail]=useState(false)
    console.log(empDetails);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const InvalidEmailId=(emailID)=>{
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(emailPattern.test(emailID)) {
            setEmpDetails({ ...empDetails, email: emailID });
            setError('');
            setInavalidEmail(false)
        } else {
            setEmpDetails({...empDetails,email:''})
            setInavalidEmail(true)
            setError('Invalid email address');
        }

    }


    const handleUpload = async () => {
        const { empID, userName, email, status } = empDetails
        if (empID && userName && email && status) {
            try {
                const result = await addDetailsAPI(empDetails)
                if (result.status >= 200 && result.status < 300) {
                    console.log(result.data);
                    setAddEmpDetailsResponse(result.data)
                    toast.success(`Details added to your collections`)
                    setEmpDetails({ empID: '', userName: '', email: '', status: '' })
                    handleClose()
                } else {
                    toast.error(result.response.data)
                }

            } catch (err) {
                console.log(err);
            }


        } else {
            toast.error("Please fill the form completely!")
        }
    }

    return (
        <div>
            <div style={{ height: '90px' }} className="w-100 d-flex justify-content-center align-items-center bg-warning p-5">
                <button onClick={handleShow} className='btn btn-light text-danger'>Add Emplpoyee Details</button>
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
                            <Form.Control onChange={e => setEmpDetails({ ...empDetails, empID: e.target.value })} type="text" placeholder="Employee ID" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInputName" label="Employee Username" className="mb-3">
                            <Form.Control onChange={e => setEmpDetails({ ...empDetails, userName: e.target.value })} type="text" placeholder="Employee Username" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingEmail" label="Email Address" className="mb-3">
                            <Form.Control onChange={e => InvalidEmailId(e.target.value)} type="text" placeholder="Email Address" />
                        </FloatingLabel>
                        {
                            InvalidEmail && <div className="text-danger fw-bolder my-3">Invalid Email Address</div>
                        }
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Status
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setEmpDetails({ ...empDetails, status: 'active' })}>active</Dropdown.Item>
                                <Dropdown.Item onClick={() => setEmpDetails({ ...empDetails, status: 'inactive' })}>inactive</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpload} variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-left" autoClose={3000} theme="dark" />

        </div>
    )
}

export default AddEmployee