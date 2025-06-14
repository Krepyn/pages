//import { useState } from 'react'
import './App.css'
import { HashRouter as Router, Route, NavLink, Routes } from 'react-router-dom'
import CreationList from './components/CreateBuild/CreationList.jsx'
import Home from './components/Content/Home.jsx'

function App() {

    return (
        <>
            <Router>
                {/* Navbar  */}
                <nav>
                    <ul className='navbar'>    
                        <li className='navbar-li'>
                            <NavLink className='navlink' to='/'>ITRTG Stuff</NavLink>
                        </li>
                        <li className='navbar-li'>
                            <NavLink className='navlink' to='/create-build'>CreateBuild</NavLink>
                        </li>
                        <div className='middle-space'></div>
                        <li className='navbar-li'>
                            <NavLink className='navlink' to='/about'>About</NavLink>
                        </li>
                    </ul>
                </nav>
                
                {/* Content */}
                <Routes>
                    <Route exact='true' path='/' element={<Home />}/>
                    <Route exact='true' path='/create-build' element={<CreationList />} />
                </Routes>

            </Router>
        </>
    )
}

export default App;
