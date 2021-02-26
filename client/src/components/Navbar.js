import React, {useState} from 'react'
import './Navbar.css'


function Navbar() {
    const [query,setQuery] = useState("")
    return (
        <div className='navbar'>
            <div className='navbar-menu'>
                <span>ODYSSEY</span>
                <input 
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search Song"
                />
                <div className="navbar-menu-right">
                    {/* <a href="#" >Login</a> 
                    <a href="#" >Sign Up</a> */}
                    <span>Login</span>
                    <span>Sign Up</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar
