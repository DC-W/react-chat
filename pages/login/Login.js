import Nav from '../../components/navbar/Nav';
import React, { Component } from 'react'


class Login extends Component {

    // run constructor
    constructor(props) {
        super(props);

        // init state to store data
        this.state = {
            userName: '',
            userPass: '',
            userTOC: false,
            popupHidden: false,
            popupMsg: ''
        };


    }


    render() {
        // ready state vars
        const { userName, userPass, userTOC, popupHidden, popupMsg } = this.state;


        // // what to do when login button is clicked
        const handleClick = (event) => {
            event.preventDefault();
            // check if user agrees to TOC if not just stop and return
            // if (!userTOC) return;
            // check button type if its login or register
            if (!userTOC) return;
            if (event.target.name === "btn_register") {
                // if register
                postRegister();
            } else if (event.target.name === "btn_login") {
                // if login
                postLogin();
            }

        }

        // used to post login data to auth api
        const postLogin = async () => {
            // send post fetch to api
            const res = fetch('/api/auth', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "uname": userName,
                    "upass": userPass,
                    "type": "login"
                })
            });
            // wait for data
            const data = await res;
            console.log(data);
            // redirect based on resp
            window.location.href = data.url;
        }

        // used to register a new user
        const postRegister = async () => {
            // send post fetch to api
            const res = fetch('/api/auth', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "uname": userName,
                    "upass": userPass,
                    "type": "register"
                })
            });
            // wait for data
            const data = await res;
            // check if response code 403
            if (data.status == 403) {
                // set popup msg based on api resp
                this.setState({ popupMsg: "User already registered" });
                // show popup
                this.setState({ popupHidden: true });
                // hide popup in 2 seconds
                setTimeout(() => {
                    this.setState({ popupHidden: false });
                }, 2000);
            }
        }

        // popup component
        const Popup = () => {
            return (
                <div className="alert alert-error shadow-lg absolute z-10 left-0 right-0" style={{ maxWidth: "500px", margin: "0 auto" }}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLineCap="round" strokeLineJoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{popupMsg}</span>
                    </div>
                </div>
            );
        }

        return (

            < div className='w-screen h-screen' >
                <Nav />
                {popupHidden && <Popup />}
                {/* background image */}
                <div className='absolute z-0 w-screen h-screen bg-repeat' style={{ height: "calc(100vh - 64px)", margin: "auto auto", backgroundImage: "url(https://tailwindcss.com/img/background-pattern.svg)" }}></div>
                <div className="hero" style={{ height: "calc(100vh - 64px)" }}>
                    <div className="hero-content flex-col">
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <div className="card-body">
                                <div className="text-left" >
                                    <p className="py-6"><strong>START FOR FREE</strong></p>
                                    <h1 className="text-5xl font-bold">Connect. Chat.</h1>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Username</span>
                                    </label>
                                    {/* inputs username */}
                                    <input required type="text" placeholder="username" className="input input-bordered" name="name" onChange={(e) => { this.setState({ userName: e.target.value }) }} />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    {/* inputs password */}
                                    <input required type="password" placeholder="password" className="input input-bordered" name="pass" onChange={(e) => { this.setState({ userPass: e.target.value }) }} />
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">I agree to the Terms and Conditions</span>
                                        <input required type="checkbox" className="checkbox" onChange={(e) => { this.setState({ userTOC: e.target.checked }) }} />
                                    </label>
                                </div>
                                <div className="form-control mt-6 flex-1 flex-row justify-evenly">
                                    {/* buttons */}
                                    <button onClick={handleClick} name="btn_register" className="btn btn-primary w-6/12 mr-1">Register</button>
                                    <button onClick={handleClick} name="btn_login" className="btn btn-primary w-6/12 ml-1">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Login;