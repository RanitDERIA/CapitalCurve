import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer style={{ backgroundColor: "#f5f5f5" }}>
            <div className='container border-top mt-5 pt-5'>
                <div className='row'>
                    {/* Brand Info */}
                    <div className='col-4'>
                        <img src='media/images/brand1.png' style={{ width: "50%" }} alt='elevate-broking' />
                        <p>
                             © {new Date().getFullYear()}, Elevate Broking Ltd.<br />
                              All rights reserved.<br />
                            <a style={{ textDecoration: "none", color: "#2e2e38" }} href='https://www.linkedin.com/in/ranit-deria-916864257/'><i className="fa-brands fa-square-linkedin"></i></a>
                            <a style={{ textDecoration: "none", color: "#2e2e38" }} href='https://github.com/RanitDERIA'><i className="fa-brands fa-square-github"></i></a>
                            <a style={{ textDecoration: "none", color: "#2e2e38" }} href='https://x.com/DeriaRanit'><i className="fa-brands fa-square-x-twitter"></i></a>
                        </p>
                    </div>

                    {/* Company */}
                    <div className='col-2'>
                        <p>Company</p>
                        <Link className='text-muted d-block' style={{ textDecoration: "none" }} to="/about">About Us</Link>
                        <Link className='text-muted d-block' style={{ textDecoration: "none" }} to="/pricing">Pricing & Charges</Link>
                    </div>

                    {/* Support */}
                    <div className='col-2'>
                        <p>Support</p>
                        <Link className='text-muted d-block' style={{ textDecoration: "none" }} to="/support">Help Center</Link>
                        <Link className='text-muted d-block' style={{ textDecoration: "none" }} to="/support">FAQs</Link>
                        <Link className='text-muted d-block' style={{ textDecoration: "none" }} to="/contact">Contact Us</Link>
                    </div>

                    {/* Account */}
                    <div className='col-2'>
                        <p>Account</p>
                        <Link className='text-muted d-block' style={{ textDecoration: "none" }} to="/signup">Open an Account</Link>
                        <Link className='text-muted d-block' style={{ textDecoration: "none" }} to="/signin">Login</Link>
                        <Link className='text-muted d-block' style={{ textDecoration: "none" }} to="/funds">Fund Transfer</Link>
                    </div>

                    {/* Quick Links */}
                    <div className='col-2'>
                        <p>Quick Links</p>
                        <Link className='text-muted d-block' style={{ textDecoration: "none" }} to="/signup">Trading Platform</Link>
                        <a className='text-muted d-block' style={{ textDecoration: "none" }} href="https://www.nseindia.com/">Market Insights</a>
                        <Link className='text-muted d-block' style={{ textDecoration: "none" }} to="/terms">Terms & Conditions</Link>
                    </div>
                </div>

                {/* Project Note */}
                <div className="container mt-5">
                    <p className="text-muted small" style={{ fontSize: "0.75rem", lineHeight: "1.2" }}>
                        This project is a full stack web application developed as part of my B.Tech CSE coursework.
                        It integrates React for a dynamic frontend, Node.js/Express for backend APIs, and MongoDB for secure data management.
                        Core features include authentication, trading workflows, and structured account management.
                        Planned improvements include deployment on cloud services, real-time market data, and advanced analytics integration.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
