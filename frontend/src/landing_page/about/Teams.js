import React from 'react'

function Teams() {
    return (
        <div className='container'>
            <div className='row p-2'>
                <h1 className='fs-2 text-center'>
                    Myself
                </h1>
            </div>
            <div className='row'>
                <p className='col text-center p-5'>
                    <img className='p-2' src='media/images/dp.png' alt="Profile picture" />
                    <h2 class="fs-4 font-bold"><em>Ranit Deria</em></h2>
                    <p class="text-gray-600">B.Tech CSE • Class of 2026</p>
                </p>
                <p className='col text-left p-5'>
                    I’m a Computer Science undergraduate passionate about building impactful full-stack
                    applications, solving real-world problems with technology, and exploring automation
                    systems powered by AI.

                    <span><br></br><br></br></span>
                    Currently, I am working on a major project – an <span class="font-semibold">Intelligent
                        Query–Retrieval System</span> that processes large documents and provides
                    context-aware answers using semantic search and AI-powered automation. Alongside,
                    I’ve built workflow automation tools (<span class="italic">kravs</span>) that connect
                    triggers like webhooks, email, and payment systems into seamless pipelines.
                </p>
            </div>
        </div>
    );
}

export default Teams;