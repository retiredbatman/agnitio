import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { createRequest } from '../services/requests.service';
import { toast } from 'react-hot-toast';
import { PhotoCamera } from '@mui/icons-material';

function ImageSingle() {
  const [file, setFile] = useState<File>();
  const [value, setValue] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    if (!file || !value) {
      return;
    }
    try{
        var formData = new FormData();
        formData.append("file", file);
        formData.append("name", value);
        await createRequest(formData);
        toast.success('Request completed successfully');
    }catch(error) {
        console.error(error);
        toast.error('Request failed');
    }
     
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Box display={'flex'} alignItems="center">
        <TextField required label="Name" value={value} size="small" onChange={(e)=> setValue(e.target.value)}/>
        <Box mr={2} />
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" onChange={handleFileChange}  />
          <PhotoCamera />
        </IconButton>
      </Box>
      <Box mb={2}/>
      <Typography>{file && `Selected file -  ${file.name} - ${file.type}`}</Typography>
      <Box mb={2} />
      <Button variant="contained" onClick={handleUploadClick} endIcon={<SendIcon />}>Add request</Button>
    </Box>
  );
}

export default ImageSingle;