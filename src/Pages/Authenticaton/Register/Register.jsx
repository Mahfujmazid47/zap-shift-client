import React from 'react';
import { useForm } from 'react-hook-form';
import img from '../../../assets/image-upload-icon.png'
import useAuth from '../../../Hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import GoogleRegister from './GoogleRegister';
import Swal from 'sweetalert2';

const Register = () => {
    const { createUser } = useAuth();
    const navigate = useNavigate();

    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = data => {
        console.log(data);
        const { email, password } = data;
        createUser(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Registration Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')
            })
            .catch(error => {
                console.error(error);
            })
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
                <img src={img} alt="" />
            </div>
            <div className="">
                <div className="">
                    <form onSubmit={handleSubmit(onSubmit)} className="fieldset">

                        <label className="label">Name</label>
                        <input type="name" {...register('name', { required: true })} className="input md:w-3/4" placeholder="Name" />
                        {
                            errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>
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