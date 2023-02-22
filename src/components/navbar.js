import React, {Component} from 'react';
import {Link} from "gatsby";
import {userContext} from './userProvider';
import '../styles/navbar.css';
import '../styles/global.css';

class Navbar extends Component{

    constructor(props){
        super(props);

    }

    render(){
        return(
            <div>
                <div className="navbar">
                    <div className="loginButton">
                        <userContext.Consumer>
                            {({userPermission, login, logout}) => {
                                console.log("Navbar says " + userPermission);
                                if (userPermission === "public"){
                                    return(
                                        <Link className="loginText" to="/login/"> Login </Link>
                                    );
                                }
                                else{
                                    return(
                                        <a className="loginText" onClick={logout}> Logout </a>
                                    );
                                }
                            }}
                        </userContext.Consumer>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;