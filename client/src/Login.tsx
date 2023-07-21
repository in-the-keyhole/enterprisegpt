import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import Spinner from './components/Spinner';

import { Link, useNavigate } from 'react-router-dom';

function Login(): JSX.Element {

    const [userid, setUserid] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const params = new URLSearchParams();
        params.append('username', userid);
        params.append('password', password);

        // Port 5001 should match the API_PORT in .env file.
        const response = await axios.post('http://localhost:5001/login', params);

        if (response.status == 200) {

            navigate('/chat', { replace: true, state: { userid: userid } })

        } else {

            setError("Invalid Login Credentials");

        }

    };


    // Define a function to handle input changes
    const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserid(event.target.value);

    };

    // Define a function to handle input changes
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);

    };



    return (
        <React.Fragment>

            <div className="input-container">

                <form onSubmit={handleSubmit}>
                    <div className="login">

                        <h2> Login Screen  </h2>

                        <span> User Id: <input width={50} id="username" name="username" value={userid} onChange={handleUserIdChange} />  </span> <br />
                        <br />
                        <span> Password: <input type="password" id="password" name="password" width={50} onChange={handlePasswordChange} /> </span> <br />

                        <br />

                        <button type="submit">Submit</button>
                        <Link to='/chat' state={{ userid: userid }} >
                            <button>Login</button>
                        </Link>

                        <br />

                        <h3>{error}</h3>

                    </div>

                </form>

            </div>


        </React.Fragment>
    );
}

export default Login;
