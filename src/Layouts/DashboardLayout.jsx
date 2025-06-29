import React, { Suspense } from 'react';
import Loading from '../Shared/Loading/Loading';
import { Link, NavLink, Outlet, useNavigation } from 'react-router';
import ProFastLogo from '../Shared/ProFastLogo/ProFastLogo';
import { FaHome, FaBoxOpen, FaHistory, FaSearchLocation, FaUserEdit, FaUsers, FaUserClock, FaUserTimes } from "react-icons/fa";

const DashboardLayout = () => {
    const navigation = useNavigation();
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">

                    {/* Navbar */}
                    <div className="navbar bg-base-300 w-full lg:hidden">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                        </div>
                        <div className="mx-2 flex-1 px-2">Dashboard</div>

                    </div>
                    {/* Page content here */}

                    <Suspense fallback={<Loading />}>
                        {navigation.state === 'loading' ? <Loading /> : <Outlet></Outlet>}
                    </Suspense>

                    {/* Page content here */}

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-50 p-4">
                        {/* Sidebar content here */}
                        <ProFastLogo></ProFastLogo>

                        <li>
                            <NavLink to='/' className="flex items-center gap-2">
                                <FaHome /> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/myParcels' className="flex items-center gap-2">
                                <FaBoxOpen /> My Parcels
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/paymentHistory' className="flex items-center gap-2">
                                <FaHistory /> Payment History
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/trackParcel' className="flex items-center gap-2">
                                <FaSearchLocation /> Track Parcel
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/updateProfile' className="flex items-center gap-2">
                                <FaUserEdit /> Update Profile
                            </NavLink>
                        </li>

                        <li>
                            <Link to='/dashboard/activeRiders' className="flex items-center gap-2">
                                <FaUsers className="text-green-600" /> Active Riders
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard/pendingRiders' className="flex items-center gap-2">
                                <FaUserClock className="text-yellow-500" /> Pending Riders
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/rejectedRiders" className="flex items-center gap-2">
                                <FaUserTimes className='text-red-500' /> Rejected Riders
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;