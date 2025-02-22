import React from 'react';

const Navbar = ({ user, login, logout }) => {
    const displayName = user ?  user.displayName.split(' ')[0] : '';
    return (
        <div className='flex justify-between items-center px-3 md:px-8 py-3 border-0 border-b'>
            <h1 className='text-2xl md:text-3xl font-bold'>Task Manager</h1>
            <div>
                {user ? (
                    <div className='flex items-center gap-3'>
                        <p>Welcome, {displayName}!</p>
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