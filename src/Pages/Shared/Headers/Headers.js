import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { MdArrowDropDownCircle } from "react-icons/md";

const Headers = () => {
    const { logOut, user, isdrawer } = useContext(AuthContext)
    const menuitem = <Fragment>
        <li><Link to="../home">Home</Link></li>
        <li><Link to="../blog">Blogs</Link></li>
        <li><Link to="../dashBoard">DashBoard</Link></li>
    </Fragment>

    const handleLogout = () => {
        logOut()
            .then()
            .catch(er => console.log(er))
    }
    return (
        <div>
            <div className="navbar bg-slate-700 text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu text-black menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                menuitem
                            }
                        </ul>
                    </div>
                    <Link className="btn btn-ghost normal-case text-xl">Resale Car</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {
                            menuitem
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        isdrawer && <label htmlFor="my-drawer-2"><MdArrowDropDownCircle className='text-primary text-2xl mr-5'></MdArrowDropDownCircle></label>
                    }

                    {
                        user ? <li><Link onClick={handleLogout} to="../signIn">Logout</Link></li> : <li><Link to="signIn">SignIn</Link></li>
                    }
                </div>
            </div>
        </div>
    );
};

export default Headers;