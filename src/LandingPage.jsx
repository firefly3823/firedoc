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
                    {allDoc && allDoc.map((doc,index) => (
                        <div className='mt-4'>
                            <Card style={{ height: '220px', width: '18rem' }} key={index+1} className='bg-light'>
                                <Card.Body>
                                    <div className='d-flex justify-content-end align-items-center'>
                                        <Link className='text-success' to={`/updatedocument/${doc?.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width={35} height={35} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                                <path d="M16 5l3 3" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <Card.Title className='mt-3 fw-bold '>{doc?.title}</Card.Title>
                                    <Card.Text>
                                        {doc?.note.slice(0, 60)}
                                    </Card.Text>
                                    <div className='d-flex justify-content-end text-danger' style={{ cursor: 'pointer', marginTop: doc?.note !== "" ? '0px' : '65px', marginRight: '8px' }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width={35} height={35} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M4 7l16 0" />
                                            <path d="M10 11l0 6" />
                                            <path d="M14 11l0 6" />
                                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                        </svg>
                                        </div>

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