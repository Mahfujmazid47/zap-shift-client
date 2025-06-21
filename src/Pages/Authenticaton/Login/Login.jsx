import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import GoogleLogin from './GoogleLogin';

const Login = () => {

    const { register,
         handleSubmit,
         formState : {errors}
         } = useForm();

    const onSubmit = data => {
        console.log(data)
    }

    return (
        <div data-aos='zoom-out' duration='2000' className='md:w-2/3 w-11/12'>
            <div className="">
                <h1 className="text-3xl font-extrabold">Welcome Back</h1>
                <p className="py-3">
                    Login with Profast
                </p>
            </div>
            <div className="">
                <div className="">
                    <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" {...register('email', {required : true})} className="input md:w-3/4" placeholder="Email" />
                        {
                            errors.email?.type === 'required'&& <p className='text-red-500'>Email is required.</p>
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

                        <input type="submit" value="Login" className='btn btn-primary text-secondary mt-4 md:w-3/4 hover:scale-105 transition-all' />

                        <p>New to this website? <Link to='/register'>
                            <span className='text-primary font-semibold underline cursor-pointer text-sm'>Register</span>
                        </Link></p>

                        <div className='md:w-3/4'>
                            <GoogleLogin></GoogleLogin>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;