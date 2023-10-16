import React, { useState } from 'react';
import axios from 'axios';


import { useNavigate } from 'react-router-dom';

function Login(): JSX.Element {

    const [userid, setUserid] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        // const v = (status: number) => { if (status != 200) { setError("Invalid Login Credentials")} };    } 

        const params = new URLSearchParams();
        params.append('username', userid);
        params.append('password', password);

        // Port 5001 should match the API_PORT in .env file.
        axios.post('/api/login', params).
            then(() => { navigate('/chat', { replace: true, state: { userid: userid } }) }).
            catch((error) => { setError("Invalid Credentials"), console.error(error) });
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

          <div className="login-container">  

         <div className="login-left">
            <div className="input-container">

                <form onSubmit={handleSubmit}>
                    <div className="login">

                        <h2> Enterpise GPT </h2>

                        <span>User Id</span>
                        <p />
                        <span><input width={50} id="username" name="username" value={userid} onChange={handleUserIdChange} />  </span> <br />
                        <p />
                        <span>Password</span>
                        <p ></p>
                        <span><input type="password" id="password" name="password" width={50} onChange={handlePasswordChange} /> </span> <br />

                        <p />

                        <button type="submit">Login</button>


                        <br />

                        <h3>{error}</h3>

                    </div>

                </form>

            </div>

            </div>

            <div className="login-right">
              <a target="_blank" href="https://keyholesoftware.com" ><img src="/keyhole-logo.png" alt="Keyhole Software" /> </a>
            </div>

        </div>
        </React.Fragment>
    );
}

export default Login;
