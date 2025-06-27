import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import img from '../../../assets/image-upload-icon.png'
import useAuth from '../../../Hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import GoogleRegister from './GoogleRegister';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxios from '../../../Hooks/useAxios';

const Register = () => {
    const { createUser, userProfileUpdate, user } = useAuth();
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const [profilePic, setProfilePic] = useState(null);

    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = data => {
        console.log(data);
        const { email, password } = data;
        createUser(email, password)
            .then(async (result) => {
                console.log(result.user);

                // update user info in firebase
                const profileInfo = {
                    displayName: data.name,
                    photoURL: profilePic,
                }
                userProfileUpdate(profileInfo)
                    .then(() => {
                        console.log('Name and Pic uploaded')
                    })
                    .catch(error =>
                        console.log(error)
                    )

                //update user info in database 
                const userInfo = {
                    email: user.email,
                    role: 'user',// default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString(),
                };
                const userResponse = await axiosInstance.post('/users', userInfo);
                console.log(userResponse.data);
                if (userResponse.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Registration Successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/');
                }
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleImageChange = async (e) => {
        const image = e.target.files[0];
        console.log(image)
        const formData = new FormData();
        formData.append('image', image)

        const imageUploadUrl = `https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_image_upload_key}`;
        const res = await axios.post(imageUploadUrl, formData);

        setProfilePic(res.data.data.url);
    }

    return (

        <div data-aos='zoom-out' duration='2000' className='md:w-2/3 w-11/12'>
            <div className="">
                <h1 className="text-3xl font-extrabold">Create an Account</h1>
                <p className="py-3">
                    Register with Profast
                </p>
            </div>
            <div>

            </div>
            <div className="">
                <div className="">
                    <form onSubmit={handleSubmit(onSubmit)} className="fieldset">

                        {
                            profilePic ?
                                <img src={profilePic} alt="profile pic"
                                    className='w-15 h-15 rounded-full text-gray-400 hover:text-gray-600 transition duration-200'
                                />
                                :
                                <>
                                    <label htmlFor="imageUpload" className="cursor-pointer inline-block">
                                        <img src={img} alt="" />
                                        <p className='text-slate-600'>Upload Your photo</p>
                                    </label>
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </>
                        }


                        <label className="label">Name</label>
                        <input type="name" {...register('name', { required: true })} className="input md:w-3/4" placeholder="Your Name" />
                        {
                            errors.name?.type === 'required' && <p className='text-red-500'>name is required</p>
                        }

                        <label className="label">Email</label>
                        <input type="email" {...register('email', { required: true })} className="input md:w-3/4" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                        }

                        <label className="label">Password</label>
                        <input type="password" {...register('password', {
                            required: true,
                            minLength: 6
                        })}
                            className="input md:w-3/4" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required.</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password Must have 6 characters</p>
                        }

                        <div><a className="link link-hover">Forgot password?</a></div>

                        <input type="submit" value="Register" className='btn btn-primary text-secondary hover:scale-105 transition-all mt-4 md:w-3/4' />

                        <p>Already have an account? <Link to='/login'>
                            <span className='text-primary font-semibold underline cursor-pointer text-sm'>Login</span>
                        </Link></p>

                        <div className='md:w-3/4'>
                            <GoogleRegister></GoogleRegister>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Register;