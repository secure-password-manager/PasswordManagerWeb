import React, { useState } from 'react';
import {Tab, Tabs, TextField, Stack, Button, Container } from "@mui/material";
import { Box } from '@mui/system';

const passwordMatchingText = {
    error: "Passwords do not match",
    valid: ""
}
function LoginForm() {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerification, setPasswordVerification] = useState('');
    const [passwordMatchingMsg, setPasswordMatchingMsg] = useState(passwordMatchingText.valid)
    
    const handleTabChange = (event, tabIndex) => {
        setCurrentTabIndex(tabIndex);
        setEmail('')
        setPassword('')
        setPasswordVerification('')
        setPasswordMatchingMsg(passwordMatchingText.valid)
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
        setPasswordMatchingMsg(passwordMatchingText.valid)
    }

    const handlePasswordVerificationChange = (event) => {
        setPasswordVerification(event.target.value)
        setPasswordMatchingMsg(passwordMatchingText.valid)
    }

    /*
    TODO:
    - Handle api status code (200 vs != 200)
    */
    const onLogin = (event) => {
        event.preventDefault()
        alert("Welcome " + email)

    }

    /*
    TODO:
    - Handle api status code (200 vs != 200)
    */
    const onCreateAccount = (event) => {
        event.preventDefault()
        if (password !== passwordVerification) {
            setPasswordMatchingMsg(passwordMatchingText.error)
        }
    }

    return (
        <Container sx={{width: "25%",border: "1px solid gray" }}>
            <Tabs value={currentTabIndex} sx={{ borderBottom: 1}} onChange={handleTabChange}>
                <Tab label="Login" />
                <Tab label="Sign Up" />
            </Tabs>
            {  
                currentTabIndex === 0 && (
                    <form onSubmit={onLogin}>
                    <Box sx={{ p: 3}} >
                        <Stack  spacing={2}>
                            <TextField onChange={handleEmailChange} value={email} type="email" id="email-login" label="Email" variant="outlined" />
                            <TextField onChange={handlePasswordChange} value={password} type="password" id="password-login" label="Password" variant="outlined" helperText=""/>
                            <Button variant="contained" type="submit" sx={{width: "25%", float: "right"}} >Login</Button>
                        </Stack>
                    </Box>
                    </form>
                )
            }
            {
                currentTabIndex === 1 && (
                    <form onSubmit={onCreateAccount}>
                    <Box sx={{ p: 3 }}>
                        <Stack spacing={2}>
                            <TextField onChange={handleEmailChange} value={email} type="email" id="email-signup" label="Email" variant="outlined" />
                            <TextField onChange={handlePasswordChange} value={password} type="password" id="password-signup" label="Password" variant="outlined" />
                            <TextField onChange={handlePasswordVerificationChange} value={passwordVerification} type="password" id="password-verify" label="Verify Password" variant="outlined"
                                helperText={passwordMatchingMsg}/>
                            <Button variant="contained" type="submit" sx={{width: "25%", float: "right"}}>Sign Up</Button>
                        </Stack>

                    </Box>
                    </form>
                )
            }
    
        </Container>
    )
}


export default LoginForm
