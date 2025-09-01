import React from 'react'
import { useNavigate } from 'react-router-dom';
function Hero() {
    const navigate = useNavigate();
    return ( 
        <div className='container p-5'>
          <div className="row text-center">
            <img src="media/images/homeHero.png" class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt="Capital Curve platform hero" />
            <h1 className='mt-5 fs-2'>All Markets. One Platform.</h1>
            <p>
              From stocks and funds to bonds and ETFs, invest in everything you need with ease and confidence.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="p-3 btn fs-5"
              style={{
                width: "18%",
                margin: "0 auto",
                background: "radial-gradient(circle, hsla(40, 100%, 50%, 1) 0%, hsla(54, 100%, 50%, 1) 99%)",
                color: "#2E2E38",
                border: "none",
                fontWeight: "600"
              }}
            >
              Signup Now
            </button>
          </div>
        </div>
  )
}

export default Hero;