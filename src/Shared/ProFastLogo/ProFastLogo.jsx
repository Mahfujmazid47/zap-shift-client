import React from 'react';
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router';

const ProFastLogo = () => {
    return (
        <NavLink to='/'>
            <div className='flex items-end hover:scale-105 transition-all w-fit'>
                <img className='mb-1' src={logo} alt="" />
                <p className='-ml-3 mb-1 text-3xl font-extrabold'>ProFast</p>
            </div>
        </NavLink>
    );
};

export default ProFastLogo;