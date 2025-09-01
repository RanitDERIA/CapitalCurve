import React from 'react'

function Stats() {
    return (
        <div className='container p-5'>
            <div className='row p-5'>
                <div className='col-6 p-5'>
                    <h1 className='fs-2 mb-5'>Trust withconfidence</h1>
                    <h3 className='fs-4 '>We put customers first — always.</h3>
                    <p className='text-muted'>That’s why 1.6+ crore investors place their trust in us, managing over ₹6 lakh crores in equity investments.</p>

                    <h3 className='fs-4'>No noise, no nonsense.</h3>
                    <p className='text-muted'>No spam. No gimmicks. No distracting “gamification.” Just clean, high-quality apps designed for you to invest at your own pace, on your own terms. Our philosophy is simple: clarity over clutter.</p>

                    <h3 className='fs-4'>Helping you grow smarter</h3>
                    <p className='text-muted'>Through features like Nudge and Kill Switch, we go beyond transactions.
                        Our mission: help you make better money decisions, protect your capital, and grow with confidence.</p>
                </div>
                <div className='col-6'>
                    <img className='mt-5' src='media/images/ecosystem.png' style={{ width: "90%" }} />
                </div>
            </div>
            <div className='row'>
                <img style={{width: "60%", margin: "0 auto"}} src='media/images/pressLogos.png'/>
            </div>
        </div>
    );
}

export default Stats;