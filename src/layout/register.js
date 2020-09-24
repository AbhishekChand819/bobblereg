import React, { useState } from 'react'

import firebase from '../config/firebase'
import axios from "axios";


export default function Register() {
    const [type, setType] = useState("password");
    const [user, setUser] = useState([]);
    const [fbimg, setFbimg] = useState("");
    const [isloggedin, setIsloggedin] = useState(false);
    let fname = React.createRef();
    let lname = React.createRef();
    let email = React.createRef();
    let password = React.createRef();

    const handleClick = () => {
        if(type==="password") setType("text")
        else setType("password")
    }

    const glogin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                setUser(res.additionalUserInfo.profile)
                setIsloggedin(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const flogin = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                setUser(res.additionalUserInfo.profile)
                setFbimg(res.additionalUserInfo.profile.picture.data.url)
                setIsloggedin(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const logout = () => {
        firebase.auth().signOut();
        setIsloggedin(true)
        window.location.reload();
    }

    const register = async () => {
        try {
            const res = await axios.post('https://reqres.in/api/users', {
                firstname:fname.current.value,
                lastname:lname.current.value,
                email: email.current.value,
                password: password.current.value
            });
            setUser(res.data)
            console.log(res.data)
            setIsloggedin(true)
        } catch (err) {
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
                        <div className="form">
                            <div className="textInput">
                                <input type="text" placeholder="First Name" ref={fname}></input>
                                <input type="text" placeholder="Last Name" ref={lname}></input>
                                <input type="text" placeholder="Email Address" ref={email}></input>
                                <div className="password-div">
                                    <input type={type} placeholder="Password" ref={password}></input>
                                    <img src={require("../assets/view.png")} onClick={handleClick} alt="logo"/>
                                </div>
                            </div>
                            <div className="policy">
                                <span className="policy-text">
                                    By clicking Sign Up, you agree to our <span className="blue">Terms of Use</span> and our <span className="blue">Privacy Policy.</span>
                                </span>
                            </div>
                            <div className="signupBtn">
                                <span className="text" onClick={register}>SIGN UP</span>
                            </div>
                        </div>
                    </>
                ):(
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