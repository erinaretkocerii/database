import React from 'react'
import { Link } from "react-router-dom"
import './Footer.css'

export default function Footer() {
    return (
        <>
        <div className='footer'>
<div className="text">
            <div className="fText">
                <h4>Company</h4>
                <ul>
                    <li>About Us</li>
                    <li>Our Services</li>
                    <li>Contacts</li>
                    <li>Blog</li>
                </ul>
            </div>
            <div className="fText">
                <h4>Contact</h4>
                <ul>
                    <li>info@bookstore.com</li>
                    <li>+000 00 000 000</li>
                    <li>Social Media</li>
                    <li>Social Media</li>
                    
                </ul>
            </div>
            <div className="fText">
                <h4>Address</h4>
                <ul>
                    <li>8992 Magnolia Ave.</li>
                    <li>Grosse Pointe</li>
                    <li>Michigan</li>
                    <li>48236</li>
                </ul>
            </div>
        </div>
        

        <h3>Copyright &copy; The Bookstore 2022</h3>
        </div>
        </>
    )
}
