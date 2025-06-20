import React from 'react';

const Login = () => {
    return (
        <div data-aos='zoom-out' duration='2000' className='w-2/3'>
            <div className="text-center lg:text-left">
                <h1 className="text-3xl font-extrabold">Welcome Back</h1>
                <p className="py-3">
                    Login with Profast
                </p>
            </div>
            <div className="">
                <div className="">
                    <form className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" className="input w-3/4" placeholder="Email" />
                        <label className="label">Password</label>
                        <input type="password" className="input w-3/4" placeholder="Password" />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        
                        <input type="submit" value="Login" className='btn btn-primary text-secondary mt-4 w-3/4' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;