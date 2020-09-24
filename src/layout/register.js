import React, { useState } from 'react'

import firebase from '../config/firebase' //Firebase Configuartion File
import axios from "axios";

export default function Register() {
    const [type, setType] = useState("password"); //State for Hide and Unhide password
    const [error, setError] = useState(false); //State for Hide and Unhide error
    const [user, setUser] = useState([]); //State for User Details
    const [fbimg, setFbimg] = useState(""); //State for Profile Image in case of Facebook Login
    const [isloggedin, setIsloggedin] = useState(false); //State to verify user is LogeedIn or Not

    //Create Refrences fro first name, last name, email address and password  
    let fname = React.createRef();
    let lname = React.createRef();
    let email = React.createRef();
    let password = React.createRef();

    //Function to hide and unhide password by changing th type of input tag 
    const handleClick = () => {
        if(type==="password") setType("text")
        else setType("password")
    }

    //Function for Google Login
    const glogin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                setUser(res.additionalUserInfo.profile)
                setIsloggedin(true)
            })
            .catch(err => {
                setError(true)
                console.log(err)
            })
    }

    //Function for Facebook Login
    const flogin = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                setUser(res.additionalUserInfo.profile)
                setFbimg(res.additionalUserInfo.profile.picture.data.url)
                setIsloggedin(true)
            })
            .catch(err => {
                setError(true)
                console.log(err)
            })
    }

    //Function for Logout
    const logout = () => {
        firebase.auth().signOut();
        setIsloggedin(true)
        window.location.reload();
    }

    //Function for Register via entering user details 
    const register = async () => {
        try {
                if(fname.current.value === "" ||lname.current.value === "" ||email.current.value === "" ||password.current.value === ""|| !(/.+@.+\.[A-Za-z]+$/.test(email.current.value)))
                {
                    setError(true);
                } 
                else 
                {
                    const res = await axios.post('https://reqres.in/api/users', {
                        firstname:fname.current.value,
                        lastname:lname.current.value,
                        email: email.current.value,
                        password: password.current.value
                    });
                    setUser(res.data)
                    setIsloggedin(true)
                }
        } catch (err) {
            setError(true)
            console.error(err);
        }
    };

    return (
        <div className="main_container">
            <div className="navbar">
                <img src={require("../assets/logo.png")} alt="logo" />
            </div>
            <div className="main">
                {!isloggedin?(                                      
                    //If user is not loggedIn
                    <>
                        <div className="container">
                            <div className="title-div">
                                <span className="title">SIGN UP</span>
                            </div>
                            <div className="header">
                                <span className="heading">Create your Account</span>
                                <span className="sub-heading">Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
                            </div>
                            <div className="buttons">
                                <div className="google_btn" onClick={glogin}>
                                    <img src={require("../assets/google.png")} alt="logo"/>
                                    <span className="text">Sign up with Google</span>
                                </div>
                                <div className="facebook_btn" onClick={flogin}>
                                    <img src={require("../assets/facebook.png")} alt="logo"/>
                                    <span className="text">Sign up with Facebook</span>
                                </div>
                            </div>
                        </div>
                        <div className="separation">
                            or
                        </div>
                        {error?(                       
                            //If error occurs
                            <div className="error">
                                <span className="error-text">
                                        Either some details are missing or user has entered wrong data.
                                </span>
                            </div>
                        ):(<></>)}

                        <div className="form">
                            <div className="textInput">
                                <input type="text" placeholder="First Name" ref={fname}></input>
                                <input type="text" placeholder="Last Name" ref={lname}></input>
                                <input type="text" placeholder="Email Address" ref={email}></input>
                                <div className="password-div">
                                    <input type={type} placeholder="Password" ref={password}></input>
                                    {type==="text" ? (
                                        <img src={require("../assets/notview.png")} onClick={handleClick} alt="logo"/>
                                    ):(
                                        <img src={require("../assets/view.png")} onClick={handleClick} alt="logo"/> 
                                    )}
                                </div>
                            </div>
                            <div className="policy">
                                <span className="policy-text">
                                    By clicking Sign Up, you agree to our <span className="blue">Terms of Use</span> and our <span className="blue">Privacy Policy.</span>
                                </span>
                            </div>
                            <div className="signupBtn" onClick={register}>
                                <span className="text">SIGN UP</span>
                            </div>
                        </div>
                    </>
                ):(                                                 
                    //If user is loggedIn
                    <>                                             
                        <div className="user-profile">
                            {user.picture ? (
                                typeof(user.picture)=="string" ? (
                                    <img className="avatar" src={user.picture} alt="profileimage" />
                                ):(
                                    <img className="avatar" src={fbimg} alt="profileimage" />
                                )
                            ):(
                                <img className="avatar" src="https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg" alt="profileimage" />
                            )}
    
                            {user.name ? (
                                <div className="username">{user.name}</div>
                            ) :(
                                <div className="username">{user.firstname} {user.lastname}</div>
                            )}
                            <div className="email">{user.email}</div>
                            <div className="user_id">{user.id}</div>
                        </div>
                        <div className="signupBtn" onClick={logout}>
                            <span className="text">Logout</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
