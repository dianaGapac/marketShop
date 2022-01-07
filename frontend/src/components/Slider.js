import React, {useState}from 'react'
import { Col, Row, Carousel,Card } from 'react-bootstrap'




const Slider = () => {



    return (
        <div style={{width:'1400px',height:'500px',backgroundColor:''}}>
         <Carousel variant='dark' style= {{backgroundColor:''}}>

          <Carousel.Item interval={2000}>
              <img
              className="d-block w-100"
              src="images/slider1.jpg"
              alt="First slide"
              style={{width:'1400px',height:'500px',backgroundColor:''}}
               /> 
              <Carousel.Caption>
              </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item  interval={2000}>
              <img
              className="d-block w-100"
              src="images/slider2.jpg"
              alt="First slide"
              style={{width:'1400px',height:'500px',backgroundColor:''}}
              />
              <Carousel.Caption>
              </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item  interval={2000}>
              <img
              className="d-block w-100"
              src="images/slider3.jpg"
              alt="First slide"
              style={{width:'1400px',height:'500px',backgroundColor:''}}
              />
              <Carousel.Caption>
              </Carousel.Caption>
          </Carousel.Item>


      </Carousel>
      
         
        </div>
    )
}

export default Slider
