import React from 'react';
import Auth from './use-auth';


const Login = () => {
    const auth = Auth();
    console.log(auth);
    return (
        <div>
            <h1>join the party!!</h1>
            <button>sign in with Google</button>
        </div>
    );
};

export default Login;