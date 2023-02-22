import React, {Component, useState} from 'react';
import {Link} from "gatsby";
import {userContext, UserProvider} from './userProvider';

import "../styles/login.css";
import "../styles/global.css";

class LoginMenu extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: ""
        };

        this.usernameHandler = this.usernameHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.emptyFields = this.emptyFields.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    usernameHandler(e){
        this.setState({
            username: e.target.value
        });
    };

    passwordHandler(e){
        this.setState({
            password: e.target.value
        });
    }

    emptyFields(){
        this.setState({
            username: "",
            password: ""
        });
        this.usernameField.value='';
        this.passwordField.value='';
    }

    onClickHandler(func){
        func();
    }

    render(){
        return (
            <div>
                <div className="pageWrapper">
                    <div className="slidingBackground" style = {{"animation": "slide 30s linear infinite;"}}/>
                    <div className="slidingBackground" style = {{animation: "slide 20s linear infinite;"}}/>
                    <div className="slidingBackground" style = {{animation: "slide 50s linear infinite;"}}/>
                    <div className="slidingBackground" style = {{animation: "slide 40s linear infinite;"}}/>
                    <div className="slidingBackground" style = {{animation: "slide 30s linear infinite;"}}/>

                    <div className="loginWrapper">
                        <div className="loginContainer">
                            <div className="loginTitle">
                                <h1> Login to Hack The North </h1>
                            </div>
                            <div className="field">
                                <h1> Username </h1>
                                <input type="text" placeholder="Enter Username" onChange={this.usernameHandler} ref={(username) => {this.usernameField = username}} required></input>
                            </div>
                            <div className="field">
                                <h1> Password </h1>
                                <input type="password" placeholder="Enter Password" onChange={this.passwordHandler} ref={(password) => {this.passwordField = password}} required></input>
                            </div>
                            <userContext.Consumer>
                                {({userPermission, login, logout}) => {
                                    if (this.state.username === "htn2023" && this.state.password === "htn2023"){
                                        return (
                                            <Link to="/" className="loginMenuButton">
                                                <div onClick={login}> <button> Login </button> </div>
                                            </Link>
                                        );
                                    }

                                    return(
                                        <div className="loginMenuButton" onClick={this.emptyFields}> <button> Login </button></div>
                                    );
                                }}
                            </userContext.Consumer>

                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
} 

export default LoginMenu;