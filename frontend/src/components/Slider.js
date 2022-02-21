import React from 'react'
import { Carousel,Row,Col } from 'react-bootstrap'


const Slider = () => {
    return (
        <div >
            <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Carousel  className='slider' variant='dark' >

                        <Carousel.Item interval={2000}>
                            <img
                            className="sliderImage"
                            src="images/slider1.jpg"
                            alt="First slide"
                            /> 
                        </Carousel.Item>

                        <Carousel.Item  interval={2000}>
                            <img
                            className="sliderImage"
                            src="images/slider2.jpg"
                            alt="Second slide"
                            />
                        </Carousel.Item>

                        <Carousel.Item  interval={2000}>
                            <img
                            className="sliderImage"
                            src="images/slider3.jpg"
                            alt="Thirdslide"
                            />
                        </Carousel.Item>

                    </Carousel>
                 </Col>
            </Row>
         </div>
    )
}

export default Slider
