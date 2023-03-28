import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdminRoute from '../Hookes/useAdminRoute/useAdminRoute';
import useBuyerRoute from '../Hookes/useBuyerRoute/useBuyerRoute';
import useSellerRoute from '../Hookes/useSellerRoute/useSellerRoute';
import { AuthContext } from '../Pages/AuthProvider/AuthProvider';
import Headers from '../Pages/Shared/Headers/Headers';

const DashBoardLayout = () => {
    const { user, setDrawer } = useContext(AuthContext)
    const [isSeller] = useSellerRoute(user?.email)
    const [isBuyer] = useBuyerRoute(user?.email)
    const [isAdmin] = useAdminRoute(user?.email)
    setDrawer(true)
    return (
        <div>
            <Headers></Headers>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-slate-300">
                    <Outlet></Outlet>
                    {/* <label htmlFor="my-drawer-2" className="btn btn-primary btn-xs drawer-button lg:hidden">Open drawer</label> */}

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-slate-200 text-base-content">


                        {
                            isSeller && <>
                                <li><Link to="add-product">Add Product</Link></li>
                                <li><Link to="my-product">My Product</Link></li>

                            </>
                        }
                        {
                            isBuyer && <li><Link to="my-orders">My orders</Link></li>
                        }
                        {
                            isAdmin && <>
                                <li><Link to="all-buyer">All buyer</Link></li>
                                <li><Link to="all-seller">All seller</Link></li>
                                <li><Link to="reported-items">Reported Item</Link></li>
                            </>
                        }

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;