import React, { Suspense } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <>
            <nav>
                <Navbar></Navbar>
            </nav>
            <main>
                <Suspense fallback={<p>Loading...</p>}>
                    <Outlet></Outlet>
                </Suspense>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </>
    );
};

export default RootLayout;