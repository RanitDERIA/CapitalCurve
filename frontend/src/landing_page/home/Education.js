import React from 'react'

function Education() {
    return ( 
        <div className='container'>
            <div className='row'>
                <div className='col-6'>
                    <img src='media/images/education.svg' style={{width: "80%"}}/>
                </div>
                <div className='col-6'>
                    <h1 className='mb-3 fs-2 mt-5'>
                        Learn. Trade. Grow.
                    </h1>
                    <p>Knowledge shouldn’t cost you. That’s why we built <b><i>Varsity</i></b>, the <b>largest free stock market learning platform</b> — covering everything from basics to advanced strategies.</p>
                    <a href='' style={{textDecoration:"none", color:"#ffaa00ff"}}><b>Varsity </b><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>

                    <p className='mt-5'>Got questions? You’re not alone.
With TradingQ&A, India’s most active trading & investing forum, get insights, share ideas, and learn directly from fellow traders and investors.</p>
                    <a href='' style={{textDecoration:"none", color:"#ffaa00ff"}}><b>Trading Q&A </b><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
            </div>
        </div>
     );
}

export default Education;