import { Box, Button, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { FC } from 'react'
import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import ImageSingle from '../components/ImageUpload';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getRequests } from '../services/requests.service';


export const Home:FC =() => {
    const [token, setToken]= useLocalStorage('token', null);
    const {data} = useQuery('requests', getRequests, {
      refetchInterval: 1000
    });
    const handleLogout = () => {
      setToken(null)
    }
  if (!token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
    return <>
    <Box>
      <Typography variant='h6'>Add requests</Typography>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
    <Box mb={2}/>
    <ImageSingle />
    <TableContainer component={Paper}>
      <TableHead>
      <TableRow>
            <TableCell>Request</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">No of faces</TableCell>
          </TableRow>
      </TableHead>
      <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.attributes?.noOfFaces ?? 'NA'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
    </TableContainer>
      </>
}