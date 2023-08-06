import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tour5 from '../../Images/Image3.webp';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { styled } from '@mui/system';
import '../../App.css';

const CardRoot = styled(Card)({
  // maxWidth: 300,
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
    axios
      .get('https://localhost:7228/api/ImageGallary/GetAllDetailsFromAdminTable')
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  };

  const openImageDialog = (id) => {
    setUpdateImageId(id);
    setIsDialogOpen(true);
  };

  const closeImageDialog = () => {
    setIsDialogOpen(false);
  };

  const selectedImage = images.find((image) => image.id === updateImageId);

  return (
    <div className='imagemargin'>
      <Box>
        <img
          src={Tour5}
          alt='Header Image'
          style={{ width: '100%', height: '800px', objectFit: 'cover', marginTop: '0px' }}
        />
      </Box>
      <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>Image Gallery</h1>

      <Grid container spacing={2}  sx={{ paddingLeft: '5rem', paddingRight: '5rem' }}>
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <CardRoot style={{ width: 500 , height: 400,  paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '2rem', background: '#dfddd3', borderRadius: 2}}>
              <CardMediaImg
                component='img'
                image={`data:image/jpeg;base64,${image.imagePath}`}
                alt={image.imageDetails}
                onClick={() => openImageDialog(image.id)}
                style={{ cursor: 'pointer', width: 500, height:300 }}
              />
              <CardContent>
                <Typography variant='h6' style={{ textAlign: 'center', margin: '2rem 0' }}>{image.imageDetails}</Typography>
              </CardContent>
            </CardRoot>
          </Grid>
        ))}
      </Grid>

      <Dialog open={isDialogOpen} onClose={closeImageDialog} maxWidth='md'>
        <DialogTitle>{selectedImage && selectedImage.imageDetails}</DialogTitle>
        <DialogContent>
          {selectedImage && (
            <img
              src={`data:image/jpeg;base64,${selectedImage.imagePath}`}
              alt={selectedImage.imageDetails}
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
