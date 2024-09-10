import React from 'react'
import {Link} from 'react-router-dom'
const NotFound = () => {
  return (
    <div>
      <div>
        Not forund
      </div>
      <Link to="/">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
              back to home
            </button>
          </Link>

    </div>
  )
}

export default NotFound