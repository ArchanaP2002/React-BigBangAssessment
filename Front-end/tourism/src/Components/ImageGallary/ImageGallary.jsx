import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid
} from '@mui/material';
import { styled } from '@mui/system';
import '../../App.css';


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

  return (
    <div className='imagemargin'>
      <h1>Image Gallery</h1>
 
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
 
              </CardContent> 
            </CardRoot>
          </Grid>
        ))}
      </Grid>
     
    </div>
  );
};

export default ImageGallery;
