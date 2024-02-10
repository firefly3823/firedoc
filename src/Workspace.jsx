import { doc, getDoc, updateDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import { db } from './firebase';
import './style.css'

function Workspace() {
const [notes,setNotes] = useState("")
const [noteTitle, setNoteTitle] = useState("")
const {id} = useParams()
// console.log(id)
const docref = doc(db,"document",id)
const navigate = useNavigate()
useEffect(() => {
        getNotes()
    },[])

const getNotes = async()=>{
    try {
        const res = await getDoc(docref)
        // console.log(result)
        const result = res.data()
        setNoteTitle(result.title)
        setNotes(result.note.replace(/<\/?[^>]+(>|$)/g, ""))

    } catch (error) {
        toast.error(error.error)
    }
}

const saveNote = async (id)=>{
    if(notes!==""){
        try {
            await updateDoc(docref, { note:notes.replace(/<\/?[^>]+(>|$)/g, "")})
            toast.success("Updated and Saved")
            setTimeout(()=>{
                navigate('/')
            },1000)
        } catch (error) {
            toast.error(error.error)
        }
    }else{
        toast.warning("Write some notes")
    }
}
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      
        [{ 'indent': '-1' }, { 'indent': '+1' }],          
        [{ 'direction': 'rtl' }],                        

        [{ 'size': ['small', false, 'large', 'huge'] }],  
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']
    ]
    const module = {
        toolbar: toolbarOptions
    } 

    return (
        <>
            <div className='container'>
                <h5 className='fw-bold mt-3 ms-2'>Title : <span className='text-info'>{noteTitle}</span></h5>
                <div className='text-center container mt-4' style={{ height: '34vh' }}>
                    <ReactQuill modules={module} theme='snow' value={notes} onChange={setNotes} className='height-style' />
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                    <button className='btn btn-primary mt-3' onClick={saveNote}>Save</button>
                </div>
                <ToastContainer position='top-right' theme='colored' autoClose='1000' />
            </div>
        </>
    )
}

export default Workspace