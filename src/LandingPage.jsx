import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from './firebase';
const docref = collection(db, "document")

function LandingPage() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [docTitle, setDocTitle] = useState("")
    const [allDoc, setAllDoc] = useState([])

    const createDocument = async () => {
        if (docTitle !== "") {

            try {
                // console.log(docref)
                await addDoc(docref, { title: docTitle, note: "" })
                toast.success("Documnet Created")
                getAllDoc()
                handleClose()
            } catch (err) {
                toast.error(err.error)
            }

        } else {
            toast.warning("Enter Document Title")
        }
    }
    const getAllDoc = async () => {
        try {
            const data = await getDocs(docref)
            const filteredData = data.docs.map((doc) => (
                { ...doc.data(), id: doc.controlId }
            ))
            setAllDoc(filteredData)
        } catch (error) {
            toast.error(error.error)
        }
    }

    useEffect(() => {
        getAllDoc()
    },[])
    return (
        <>
            <div className='d-flex flex-column  justify-content-center' style={{ minHeight: "70vh" }}>
                <div className='d-flex justify-content-around flex-wrap'>
                    {allDoc && allDoc.map((doc) => (
                        <div className='mt-4'>
                            <Card style={{ height: '220px', width: '18rem' }} className='bg-light'>
                                <Card.Body>
                                    <div className='d-flex justify-content-end align-items-center'>
                                        <Link className='text-success' to={`/updatedocument/${doc?.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                            <i className="fa-solid fa-file-pen fa-2x"></i>
                                        </Link>
                                    </div>
                                    <Card.Title className='mt-3 fw-bold '>{doc?.title}</Card.Title>
                                    <Card.Text>
                                        {doc?.note.slice(0, 60)}
                                    </Card.Text>
                                    <div className='d-flex justify-content-end text-danger' style={{ cursor: 'pointer', marginTop: doc?.note !== "" ? '0px' : '65px', marginRight: '8px' }} ><i className="fa-solid fa-trash fa-2x"></i></div>

                                </Card.Body>
                            </Card>

                        </div>

                    ))}
                </div>

                <div className='my-4 d-flex justify-content-center align-items-center'>
                    <button className='btn btn-primary' onClick={handleShow}>New Document<span className='ms-3'><i className="fa-solid fa-plus"></i></span></button>
                </div>


                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton className='bg-secondary'>
                        <Modal.Title className='fw-bold'>Add Document</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className='fw-bold'>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter Document Title" onChange={(e) => setDocTitle(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="success" onClick={createDocument}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <ToastContainer position='top-right' theme='colored' autoClose='2000' />
        </>
    )
}

export default LandingPage