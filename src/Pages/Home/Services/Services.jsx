import React from "react";
import {
    FaShippingFast,
    FaGlobeAsia,
    FaWarehouse,
    FaMoneyBillWave,
    FaBuilding,
    FaUndo,
} from "react-icons/fa";

const services = [
    {
        icon: <FaShippingFast size={40} className="bg-white text-[#03373D] p-2 rounded-full" />,
        title: "Express & Standard Delivery",
        description:
            "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
        icon: <FaGlobeAsia size={40} className="bg-white text-[#03373D] p-2 rounded-full" />,
        title: "Nationwide Delivery",
        description:
            "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
        icon: <FaWarehouse size={40} className="bg-white text-[#03373D] p-2 rounded-full" />,
        title: "Fulfillment Solution",
        description:
            "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
        icon: <FaMoneyBillWave size={40} className="bg-white text-[#03373D] p-2 rounded-full" />,
        title: "Cash on Home Delivery",
        description:
            "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
        icon: <FaBuilding size={40} className="bg-white text-[#03373D] p-2 rounded-full" />,
        title: "Corporate Service / Contract In Logistics",
        description:
            "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
        icon: <FaUndo size={40} className="bg-white text-[#03373D] p-2 rounded-full" />,
        title: "Parcel Return",
        description:
            "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
];

const OurServices = () => {
    return (
        <div className="bg-[#03373D] py-16 px-4 md:px-10 lg:px-20 text-white rounded-2xl my-5">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
                <p className="md:text-lg max-w-3xl mx-auto">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="bg-white text-[#03373D] rounded-xl p-6 shadow-md text-center hover:scale-105 transition duration-300 hover:bg-primary"
                    >
                        <div className="flex justify-center mb-4">{service.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                        <p className="text-sm">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurServices;
