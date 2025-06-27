import React, { Suspense } from 'react';
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import Loading from '../Shared/Loading/Loading';

const RootLayout = () => {
    const navigation = useNavigation();
    return (
        <>
            <nav>
                <Navbar></Navbar>
            </nav>
            <main>
                <Suspense fallback={<p>Loading...</p>}>
                    {navigation.state === 'loading' ? <Loading /> : <Outlet></Outlet>}
                </Suspense>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </>
    );
};

export default RootLayout;