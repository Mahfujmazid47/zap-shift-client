import React from 'react';
import img1 from '../../../assets/live-tracking.png'
import img2 from '../../../assets/safe-delivery.png'
import img3 from '../../../assets/customer-top.png'

const features = [
    {
        id: 1,
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        image: img1,
    },
    {
        id: 2,
        title: "100% Safe Delivery",
        description:
            "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        image: img2,
    },
    {
        id: 3,
        title: "24/7 Call Center Support",
        description:
            "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        image: img3,
    },
];

const FeatureHighlights = () => {
    return (
        <div className="py-12 px-2 md:px-8 lg:px-16 bg-white">
            <div>
                <h1 className='text-3xl font-bold text-center mb-5'>Feature Highlights</h1>
            </div>
            <div className='border-b-2 border-dashed py-10'>
                {features.map((feature) => (
                    <div key={feature.id}>
                        <div 
                            className="flex flex-col md:flex-row mb-5 items-center gap-8 py-8 bg-base-300 px-4 rounded-2xl hover:scale-101 transition-all ease-in-out duration-400 hover:bg-primary hover:text-white">
                            {/* Illustration */}
                            <div className="w-full md:w-1/4 flex justify-center ">
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-60 h-60 object-contain"
                                />
                            </div>

                            {/* Separator */}

                            {/* <hr className="border-r-2 border-dashed border-black my-4" /> */}


                            {/* Text Content */}
                            <div className="w-full md:w-1/2 text-left md:border-l-2 border-dashed border-black md:pl-5">
                                <h3 className="text-2xl font-semibold mb-2 text-[#03373D]">{feature.title}</h3>
                                <p className="text-gray-700">{feature.description}</p>
                            </div>
                        </div>


                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureHighlights;
