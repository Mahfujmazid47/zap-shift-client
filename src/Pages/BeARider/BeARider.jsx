import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import useAuth from '../../Hooks/useAuth';
import riderImg from '../../assets/agent-pending.png'; // Change this path if needed
import regionData from '../../assets/warehouses.json'; // Assume your JSON is stored here
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const BeARider = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, watch, reset } = useForm();

    const onSubmit = (data) => {
        const riderData = {
            ...data,
            status: 'pending',
            created_at: new Date().toISOString(),
        }
        // console.log(formData);
        axiosSecure.post('/riders', riderData)
        .then(res => {
            console.log(res.data)
            if(res.data.insertedId){
                Swal.fire({
                    icon: "success",
                    title: "Application Submitted",
                    text: "Your Application is pending approval.",
                    timer: 2000,
                })
            }
        })
    };

    // extract all unique regions
    const regions = [...new Set(regionData.map(item => item.region))];

    // filter districts based on selected region
    const selectedRegion = watch("region");
    const districts = regionData.filter(item => item.region === selectedRegion).map(item => item.district);

    return (
        <div className="p-6 md:p-10">
            <div className='border-b-2 border-gray-200'>
                <h1 className="text-4xl font-bold text-left mb-2">Become a Rider</h1>
            <p className="text-lg text-left mb-8 text-gray-600">Deliver happiness, one parcel at a time</p>
            </div>

            <div className="flex flex-col-reverse lg:flex-row gap-10">
                {/* Form Section */}
                <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:w-3/6 my-10">
                    <h2 className="text-2xl font-semibold mb-6 text-left">Tell us about yourself</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div>
                            <label className="block mb-1 font-medium">Name</label>
                            <input type="text" readOnly defaultValue={user?.displayName} className="w-full border p-2 rounded" {...register("name")} />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Age</label>
                            <input type="number" className="w-full border p-2 rounded" {...register("age", { required: true })} />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input type="email" readOnly defaultValue={user?.email} className="w-full border p-2 rounded" {...register("email")} />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Region</label>
                            <select className="w-full border p-2 rounded" {...register("region", { required: true })}>
                                <option value="">Select Region</option>
                                {regions.map(region => <option key={region} value={region}>{region}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">NID No</label>
                            <input type="text" className="w-full border p-2 rounded" {...register("nid", { required: true })} />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Contact No</label>
                            <input type="tel" className="w-full border p-2 rounded" {...register("contact", { required: true })} />
                        </div>
                    </div>

                    {/* Full-width Field */}
                    <div className="mt-6">
                        <label className="block mb-1 font-medium">Which district do you want to work in?</label>
                        <select className="w-full border p-2 rounded" {...register("district", { required: true })}>
                            <option value="">Select District</option>
                            {districts.map(district => <option key={district} value={district}>{district}</option>)}
                        </select>
                    </div>

                    <button type="submit" className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
                        Submit Application
                    </button>
                </form>

                {/* Image Section */}
                <motion.div
                    className="w-full lg:w-1/3 mx-auto flex justify-center items-center"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <img src={riderImg} alt="Rider" className="max-w-full h-auto rounded-lg" />
                </motion.div>
            </div>
        </div>
    );
};

export default BeARider;
