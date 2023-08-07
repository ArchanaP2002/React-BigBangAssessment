
import { AppBar, Toolbar, Typography, Container, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import './Home.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Tourismimage from '../../Images/Tourism1.avif';
import BackgroundVideo from '../../Images/Tourism.mp4'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



const HomePage = () => {
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
    <>
      {/* <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">Tourism</Typography>
        </Toolbar>
      </AppBar> */}

      <main>
        <section className="hero">
          <video className="video-bg" autoPlay loop muted>
            <source src={BackgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Container maxWidth="md">
            <div className="hero-content">
              <Typography variant="h3" gutterBottom>
                Welcome to Your Dream Vacation
              </Typography>
              <Typography variant="h5" paragraph>
                Explore the world with us and experience unforgettable adventures.
              </Typography>
              <Button variant="contained" size="large" className="explore-btn" >
               <Link to="/login"> Explore Tours</Link>
              </Button>
            </div>
          </Container>
        </section>


        <section className="destinations">
          <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom className="section-heading">
              Popular Destinations
            </Typography>

            <Slider {...sliderSettings}>
              {packages.map((pkg) => (
                <div key={pkg.packageId}>
                  <Card style={{ maxWidth: 400, margin: '0 auto', height: 500, borderRadius: '10px' }}>
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
                      <Link to={`/itineraryList/${pkg.packageId}`}>View Itinerary</Link>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Slider>

          </Container>
        </section>
      </main>


   
    </>
  );
};

export default HomePage;
