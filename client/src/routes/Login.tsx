import { Box, Button, TextField, Typography } from '@mui/material';
import React, { FC, useState } from 'react'
import { useMutation } from 'react-query';
import { Navigate, redirect } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { login } from '../services/login.service';


export const Login: FC = () => {
    const [userName, setUserName] = useState('');
    const [token, setToken] = useLocalStorage('token', null);
    const mutation = useMutation(login, {
        onSuccess: (tokenData) => {
            setToken(tokenData.token);
            redirect('/');
        },
      });

      if(!!token) {
        return <Navigate to="/" />
      }
    
    return (
        <>
            <Typography variant='h4'>Login to create requests</Typography>
            <TextField 
                type="text" 
                value={userName} 
                placeholder="User name" 
                onChange={(event)=> setUserName(event.target.value)}
                size="small"
            />
            <Box mb={2}/>
            <Button variant='contained' onClick={()=> {
                mutation.mutate(userName);
            }}>Login</Button>
        </>
    );
}