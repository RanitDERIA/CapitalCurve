import React from 'react'
import { useNavigate } from 'react-router-dom';
function OpenAccount() {
    const navigate = useNavigate();
    return (
        <div className='container p-5'>
        <div className='container p-5'>
            <div className="row text-center">
                <h1 className='mt-5 fs-2'>Open an <b>Elevate</b> account</h1>
                <p>
                    Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
                </p>
                <button
                    onClick={() => navigate("/signup")}
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

        </div>
        </div>
    );
}

export default OpenAccount;