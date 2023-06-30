import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import Spinner from './components/Spinner';

import { Link } from 'react-router-dom';

function Login(): JSX.Element {

    const [userid, setUserid] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const Userid = 'User Id';
    const handleLogin = async (): Promise<void> => {

    };


    return (
        <React.Fragment>

                <div className="input-container">

                <div className="login"> 

                    <h2> Login Screen  </h2>

                    <span> User Id: <input width={50} />  </span> <br />
                     <br />
                    <span> Password: <input type="password" width={50} /> </span> <br />

                     <br />
                    <Link to='/chat' state={{ userid: Userid }} >
                        <button>Login</button>
                    </Link>

                </div>

            </div>


        </React.Fragment>
    );
}

export default Login;
