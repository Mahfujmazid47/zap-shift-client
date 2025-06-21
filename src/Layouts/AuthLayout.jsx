import React, { Suspense } from 'react';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png';
import ProFastLogo from '../Shared/ProFastLogo/ProFastLogo';

const AuthLayout = () => {
    return (
        <div>

            <div className="">
                <div className="flex flex-col lg:flex-row mx-auto">
                    <div className='flex-1'>
                        <div>
                            <ProFastLogo></ProFastLogo>
                        </div>
                        <div className='min-h-screen flex justify-center items-center md:py-10'>
                            <Suspense fallback={<p>Loading ...</p>}>
                                <Outlet></Outlet>
                            </Suspense>
                        </div>
                    </div>

                    <figure className='flex-1  bg-[#FAFDF0] flex justify-center items-center'>
                        <img
                            src={authImage}
                            className="md:max-w-lg rounded-lg flex justify-center items-center"
                        />
                    </figure>

                </div>
            </div>
        </div>
    );
};

export default AuthLayout;