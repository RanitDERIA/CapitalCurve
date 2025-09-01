import React from 'react'

function Hero() {
    return (
        <div className='container'>
            <div className='row p-5 mt-4'>
                <h1 className='fs-2 text-center'>
                    Empowering seamless digital solutions
                </h1>
            </div>
            <div className='row p-3 mt-2 border-top' style={{lineHeight:"1.8"}}>
                
                <p className='col text-center p-5'> 
                    <h2 className='fs-4 pb-4'>Our Vision</h2>
                    At Elevate, we envision a digital-first world where technology bridges gaps between
                    learning, innovation, and execution. We strive to create platforms that not only
                    empower students and professionals but also bring transparency and accessibility
                    to complex systems.
                    <span><br></br><br></br></span>
                    By integrating AI, automation, and modern design, our goal is to simplify how people
                    interact with data, knowledge, and services.</p>
                <p className='col text-center p-5'>
                    <h2 className='fs-4 pb-4'>What We Do</h2>
                    We specialize in building end-to-end digital solutions — from intuitive web and mobile
                    applications to AI-driven automation pipelines. Our products are designed to improve
                    productivity, enhance collaboration, and adapt to real-world needs.

                    <span><br></br><br></br></span>
                    Some of our focus areas include smart dashboards, workflow automation, educational
                    platforms, and semantic search systems that make information retrieval effortless.

                </p>
            </div>
        </div>
    );
}

export default Hero;