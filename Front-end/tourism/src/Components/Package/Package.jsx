import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AppBar, Box, Toolbar, Typography, Container, Button, Grid, Card, CardMedia, CardContent, TextField } from '@mui/material';

function PackageManagement() {
  const [packages, setPackages] = useState([]);
  const [place, setPlace] = useState('');
  const [duration, setDuration] = useState('');
  const [packagePrice, setPackagePrice] = useState('');
  const [description, setDescription] = useState('');
  const [packImg, setPackImg] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7228/api/Package');
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const isFormValid = () => {
    return place.trim() !== '' && duration.trim() !== '' && packagePrice.trim() !== '' && description.trim() !== '' && packImg !== null;
  };

  const handleAddPackage = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      console.error('Form fields are not valid');
      return;
    }

    const formData = new FormData();
    formData.append('place', place);
    formData.append('duration', duration);
    formData.append('packagePrice', packagePrice);
    formData.append('description', description);
    formData.append('packImg', packImg);

    try {
      await axios.post('https://localhost:7228/api/Package', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Refresh the package list after successful submission
      fetchData();

      // Clear the form fields
      setPlace('');
      setDuration('');
      setPackagePrice('');
      setDescription('');
      setPackImg(null);
    } catch (error) {
      console.error('Error adding package:', error);
    }
  };

  // Custom prev arrow component
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', background: 'blue' }}
        onClick={onClick}
      />
    );
  };

  // Custom next arrow component
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', background: 'blue' }}
        onClick={onClick}
      />
    );
  };

  // Carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Container maxWidth="sm">
          <Typography variant="h4" sx={{ marginBottom: 2 }}>Add Package</Typography>
          <form onSubmit={handleAddPackage} encType="multipart/form-data">
            <TextField
              label="Place"
              variant="outlined"
              fullWidth
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Duration"
              variant="outlined"
              fullWidth
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Package Price"
              variant="outlined"
              fullWidth
              value={packagePrice}
              onChange={(e) => setPackagePrice(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <input
              type="file"
              name="packImg"
              onChange={(e) => setPackImg(e.target.files[0])}
              sx={{ marginBottom: 2 }}
            />
            <Button type="submit" variant="contained" sx={{ marginBottom: 2 }} disabled={!isFormValid()}>Add Package</Button>
          </form>
        </Container>
      </Box>

      <h2>Packages</h2>
      <Slider {...sliderSettings} style={{ maxWidth: 1300, margin: '0 auto' }}>
        {packages.map((pkg) => (
          <div key={pkg.packageId}>
            <Card style={{ maxWidth: 400, margin: '0 auto', height:500, borderRadius: '10px' }}>
              <CardMedia
                component="img"
                src={`data:image/jpeg;base64,${pkg.placeImage}`}
                alt={pkg.place}
                style={{ height: '300px', objectFit: 'cover' }}  

              />
              <CardContent>
                <h3>{pkg.place}</h3>
                <p>Duration: {pkg.duration}</p>
                <p>Price: {pkg.packagePrice}</p>
                <p>Description: {pkg.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default PackageManagement;
