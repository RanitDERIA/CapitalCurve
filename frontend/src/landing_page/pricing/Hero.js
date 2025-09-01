import React from 'react'

function Hero() {
    return (
        <div className='container'>
            <div className='row'>

            </div><div className='row p-5 mt-4'>

                <h4 className='fs-2 text-center'>
                    Pricing
                </h4>
                <p className='text-center'>
                    Free equity investments and flat ₹20 traday and F&O trades
                </p>
            </div>
            
            <div className='row p-3 mt-2 border-top'>

                <div className='col-4 text-center p-5'>
                    <img src='media/images/pricing0.svg'/>
                    <h4 className='fs-4'>Free equity delivery</h4>
                    <p>
                        All equity delivery investments (NSE, BSE), are absolutely free - ₹0 brokerage.
                    </p>
                </div>
                <div className='col-4 text-center p-5'>
                    <img src='media/images/pricingEquity.svg'/>
                    <h4 className='fs-4'>Intraday and F&O trades</h4>
                    <p>
                        Flat Rs. 20 or 0.03% (whichever is lower) per excluded order on intraday trades across equity, currency, and commodity trades. 
                    </p>
                </div>
                <div className='col-4 text-center p-5'>
                    <img src='media/images/pricing0.svg'/>
                    <h2 className='fs-4'>Free direct MF</h2>
                    <p>
                        All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.
                    </p>
                </div>
            </div>
            <div className="row text-center">
                <h1 className='mt-5 fs-2'>Open an <b>Elevate</b> account</h1>
                <p>
                    Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
                </p>
                <button
                    className="p-3 btn fs-5"
                    style={{
                        width: "25%",
                        margin: "0 auto",
                        background: "radial-gradient(circle, hsla(40, 100%, 50%, 1) 0%, hsla(54, 100%, 50%, 1) 99%)",
                        color: "#2E2E38",
                        border: "none",
                        fontWeight: "600"
                    }}
                >
                    Signup for FREE*
                </button>

            </div>
        </div>);
}

export default Hero;