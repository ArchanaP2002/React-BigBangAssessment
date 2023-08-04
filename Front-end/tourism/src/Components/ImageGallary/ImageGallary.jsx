import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/system';
import '../../App.css';

const UploadContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '1rem 0',
});

const CardRoot = styled(Card)({
  maxWidth: 300,
  margin: '1rem',
});

const CardMediaImg = styled(CardMedia)({
  height: 200,
});

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageDetails, setImageDetails] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updateImageId, setUpdateImageId] = useState(null);


  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    axios.get('https://localhost:7228/api/ImageGallary/GetAllDetailsFromAdminTable')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append('formFile', imageFile);
    formData.append('imageDetail', imageDetails);

    axios.post('https://localhost:7228/api/ImageGallary/AllAdminColumn', formData)
      .then(response => {
        console.log('Image uploaded successfully:', response);
        fetchImages();
        setImageFile(null);
        setImageDetails('');
        closeDialog(); // Close the dialog after uploading
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`https://localhost:7228/api/ImageGallary/${id}`)
      .then(response => {
        console.log('Image deleted successfully:', response);
        fetchImages();
      })
      .catch(error => {
        console.error('Error deleting image:', error);
      });
  };
  const handleUpdate = (id) => {
    setUpdateImageId(id);
    setIsDialogOpen(true);
};
 

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className='imagemargin'>
      <h1>Image Gallery</h1>
      <UploadContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={openDialog}
          style={{ margin: '16px' }}
        >
          Upload Image
        </Button>
      </UploadContainer>
      <Grid container spacing={2}>
        {images.map(image => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <CardRoot>
              <CardMediaImg
                component="img"
                image={`data:image/jpeg;base64,${image.imagePath}`}
                alt={image.imageDetails}
              />
              <CardContent>
                <Typography variant="h6">{image.imageDetails}</Typography>
                <Button onClick={() => handleUpdate(image.id)} color="primary">
                                    Edit
                                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(image.id)}
                  style={{ marginTop: '8px' }}
                >
                  Delete
                </Button>
              </CardContent>
            </CardRoot>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        PaperProps={{ style: { padding: '16px' } }}
      >
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select an image and provide image details.
          </DialogContentText>
          <input
            type="file"
            accept="image/*"
            onChange={event => setImageFile(event.target.files[0])}
          />
          <TextField
            label="Image Details"
            value={imageDetails}
            onChange={event => setImageDetails(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleImageUpload} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
