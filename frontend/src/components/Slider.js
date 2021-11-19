import React, {useState}from 'react'
import { Col, Row, Carousel,Card } from 'react-bootstrap'




const Slider = () => {



    return (
        <div style={{width:'1400px', backgroundColor:''}}>
         <Carousel variant='dark' style= {{backgroundColor:''}}>

          <Carousel.Item interval={2000}>
              <img
              className="d-block w-100"
              src="images/slider1.jpg"
              alt="First slide"
               /> 
              <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item  interval={2000}>
              <img
              className="d-block w-100"
              src="images/slider2.jfif"
              alt="First slide"
              />
              <Carousel.Caption>
              <h3>Second  slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item  interval={2000}>
              <img
              className="d-block w-100"
              src="images/slider3.jfif"
              alt="First slide"
              />
              <Carousel.Caption>
              <h3>Second  slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
          </Carousel.Item>


      </Carousel>
      
         
        </div>
    )
}

export default Slider
