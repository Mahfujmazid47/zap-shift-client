import React from 'react';
import location_merchant from '../../../assets/location-merchant.png';

const BeMerchant = () => {
    return (
        <div className='pb-12 px-2 md:px-8 lg:px-16'>
            <div data-aos="zoom-out"
     data-aos-duration="2000"  className="bg-no-repeat h-fit bg-[url('assets/be-a-merchant-bg.png')] rounded-2xl bg-secondary py-2 md:py-10  px-2 md:px-12 lg:px-18">
                <div className="hero-content flex-col lg:flex-row-reverse ">
                    <img
                        src={location_merchant}
                        className="md:w-2/4 rounded-lg"
                    />
                    <div>
                        <h1 className="text-3xl text-white font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
                        <p className="py-6  text-gray-300 text-sm">
                            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                        </p>
                        <div className='flex flex-col md:flex-row gap-3'>
                            <button className="btn rounded-full bg-primary hover:scale-105 transition-all duration-300 ease-in-out">Become a Merchant</button>

                            <button className="btn rounded-full border-2 border-primary text-primary bg-transparent hover:scale-105 transition-all duration-300 ease-in-out">Earn with Profast Courier</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeMerchant;