import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import './Home.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Tourismimage from '../../Images/Tourism1.avif';
import BackgroundVideo from '../../Images/Tourism.mp4'

const HomePage = () => {

    const destinations = [
        {
          id: 1,
          title: 'Destination 1',
          image: 'Tourismimage',
          description: 'Discover the beauty of destination 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          id: 2,
          title: 'Destination 2',
          image: 'destination2.jpg',
          description: 'Experience the magic of destination 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        // Add more destinations as needed
      ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
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
              <Button variant="contained"  size="large" className="explore-btn">
                Explore Tours
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
              {destinations.map((destination) => (
                <div key={destination.id}>
                  <Card>
                    <CardMedia component="img" height="200" image={Tourismimage} alt={destination.title} />
                    <CardContent>
                      <Typography variant="h5">{destination.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {destination.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Slider>
          </Container>
        </section>
      </main>
 

      <footer>
        <Typography variant="body2" color="textSecondary">&copy; 2023 Tourism Website. All rights reserved.</Typography>
      </footer>
    </>
  );
};

export default HomePage;
