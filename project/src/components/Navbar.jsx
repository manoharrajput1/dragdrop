import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
        <Link className='navbox' to='/'> Welcome</Link>
        <div className='navbox'>
            <Link to='/register' className='navbox'>Register</Link>
            <Link to='/login' className='navbox'>Login</Link>
        </div>
    </div>
  )
}

export default Navbar