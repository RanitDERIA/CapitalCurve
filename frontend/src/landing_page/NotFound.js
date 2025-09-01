import React from 'react'
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className='container p-5'>
            <div className="row text-center">
                <h1 className='mt-5 fs-2'>404 Not Found</h1>
                <p>
                    Sorry, but the page you are looking for does not exists.
                </p>
            </div>

        </div>
    );
}

export default NotFound;