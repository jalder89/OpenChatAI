import React from 'react'
import { AppBar, Toolbar } from '@mui/material';
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';

const Header = () => {
    const auth = useAuth();
    return (
        <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none"}}>
            <Toolbar sx={{ display: "flex",}}>
                <Logo />
                <div>
                    {auth?.isLoggedIn ? (
                        <>
                            <NavigationLink to="/chat" bg="#2CDA9D" text="Go To Chat" textColor="black" />
                            <NavigationLink to="/" bg="#306B34" text="Logout" textColor="white" />
                        </>
                    ) : (
                        <>
                            <NavigationLink to="/login" bg="#2CDA9D" text="Login" textColor="black" />
                            <NavigationLink to="/signup" bg="#8C2F39" text="Signup" textColor="white" />
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header;