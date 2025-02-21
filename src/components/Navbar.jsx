import React from 'react';

const Navbar = ({ user, login, logout }) => {
    return (
        <div className='flex justify-between items-center px-8 py-3'>
            <h1 className='text-3xl font-bold'>Task Manager</h1>
            <div>
                {user ? (
                    <div className='flex items-center gap-3'>
                        <p>Welcome, {user.displayName}!</p>
                        <button onClick={logout} className='py-1 px-4 bg-sky-600 text-white'>Logout</button>
                    </div>
                ) : (
                    <button onClick={login} className='py-1 px-4 bg-sky-600 text-white'>Login</button>
                )}
            </div>
        </div>
    );
};

export default Navbar;