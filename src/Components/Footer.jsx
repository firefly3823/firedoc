import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
function Footer() {
    return (
        <div className='d-flex text-light justify-content-center align-items-center flex-column bg-primary text-light mt-5 flex-wrap' style={{ width: '100%', height: '350px' }}>
            <div className='footer-content d-flex justify-content-evenly w-100 flex-wrap'>
                <div className='website d-flex flex-column margin-style'>
                    <h4 className='text-light'>FIRE DOC<span className='ms-2'><i className="fa-solid fa-file" style={{ color: 'white' }}></i></span></h4>
                    <h5 className='text-light'>
                        Create Document and save❤️</h5>
                    <h6>Code licensed Media, docs CC BY 3.0.</h6>
                    <h6 className='text-light'>Current version :  v1</h6>
                </div>
                <div className='guides d-flex flex-column'>
                    <h4>Guides</h4>
                    <Link to={'https://firebase.google.com/docs/build'} style={{ textDecoration: 'none', color: 'white' }}>Firebase</Link>
                    <Link to={'https://react-bootstrap.github.io/'} style={{ textDecoration: 'none', color: 'white' }}>React Bootstrap</Link>
                    <Link to={'https://reactrouter.com/en/main'} style={{ textDecoration: 'none', color: 'white' }}>Routing</Link>
                </div>
                <div className='contact d-flex flex-column'>
                    <h4 className='text-light'>Contact Us</h4>
                    <div>

                    </div>
                    <div>
                        <Link to={'/'} className='mx-2 text-light' style={{ textDecoration: 'none', color: 'white' }}><i className="fa-brands fa-linkedin" style={{ color: 'white' }}></i></Link>
                        <Link to={'/'} className='mx-3' style={{ textDecoration: 'none', color: 'white' }}>
                            <i className="fa-brands fa-twitter" style={{ textDecoration: 'none', color: 'white' }}></i></Link>
                        <Link to={'/'} className='mx-3' style={{ textDecoration: 'none', color: 'white' }}><i className="fa-brands fa-facebook-f" style={{ textDecoration: 'none', color: 'white' }}></i></Link>
                        <Link to={'/'} className='mx-2' style={{ textDecoration: 'none', color: 'white' }}><i className="fa-regular fa-envelope" style={{ textDecoration: 'none', color: 'white' }}></i></Link>

                    </div>
                </div>

            </div>
            <p className='mt-5'>Copyright © 2023 Fire Doc. Built with React.</p>
        </div>
    )
}

export default Footer