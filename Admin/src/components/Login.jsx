import React, { useState } from 'react';
import axios from 'axios'
import { backendURL } from '../App';
import { toast } from 'react-toastify';


const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post(backendURL + '/api/user/admin', { email, password })
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message)

        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center w-full'>

            {/* Scale wrapper applied here */}
            <div className='transform scale-125'>
                <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                    <h1 className='text-3xl font-bold mb-4'>Admin Pannel</h1>
                    <form onSubmit={onSubmitHandler}>
                        <div className='mb-3 min-w-72'>
                            <p className='text-base font-medium text-gray-800 mb-2'>Email Address</p>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                                type='email'
                                placeholder='youremail@.com'
                                required
                            />
                        </div>

                        <div className='mb-3 min-w-72'>
                            <p className='text-sm font-medium text-gray-800 mb-2'>Password</p>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                                type='password'
                                placeholder='your password'
                                required
                            />
                        </div>

                        <button
                            className='cursor-pointer mt-2 w-full px-4 py-2 rounded-full text-white bg-black'
                            type='submit'
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
