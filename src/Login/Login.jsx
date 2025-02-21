import React from 'react';

const Login = ({login}) => {
    return (
        <div className='flex flex-col items-center my-20'>
            <h1 className='text-4xl font-semibold'>Welcome to Task Manager</h1>
            <p>Sign in to manage your tasks efficiently</p>

            <button onClick={login} className='py-2 px-4 bg-sky-600 text-white mt-8'>Sign in with google</button>
        </div>
    );
};

export default Login;