import React from 'react';
import img from '../../../assets/delivery-van.png';

const HowItWorks = () => {
    return (
        <div className='w-11/12 mx-auto md:py-10 py-5'>
            <div>
                <h1 className='text-2xl md:text-3xl font-semibold text-secondary mb-5'>How it Works</h1>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                <div className='p-2 md:p-4 rounded-2xl shadow-2xl'>
                    <img src={img} alt="" />
                    <div className='space-y-2'>
                        <h3 className='text-lg font-semibold'>Booking Pick & Drop</h3>
                        <p className='text-sm text-gray-400'>From personal packages to business shipments — we deliver on time, every time.</p>
                    </div>
                </div>
                <div className='p-2 md:p-4 rounded-2xl shadow-2xl'>
                    <img src={img} alt="" />
                    <div className='space-y-2'>
                        <h3 className='text-lg font-semibold'>Booking Pick & Drop</h3>
                        <p className='text-sm text-gray-400'>From personal packages to business shipments — we deliver on time, every time.</p>
                    </div>
                </div>
                <div className='p-2 md:p-4 rounded-2xl shadow-2xl'>
                    <img src={img} alt="" />
                    <div className='space-y-2'>
                        <h3 className='text-lg font-semibold'>Booking Pick & Drop</h3>
                        <p className='text-sm text-gray-400'>From personal packages to business shipments — we deliver on time, every time.</p>
                    </div>
                </div>
                <div className='p-2 md:p-4 rounded-2xl shadow-2xl'>
                    <img src={img} alt="" />
                    <div className='space-y-2'>
                        <h3 className='text-lg font-semibold'>Booking Pick & Drop</h3>
                        <p className='text-sm text-gray-400'>From personal packages to business shipments — we deliver on time, every time.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;