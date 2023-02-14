import {Carousel, Button, Col, Container, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css'
export default function HomePage() {
	return (
		<Container fluid style={{height: '100vh', width:'100vw'}} className='p-0'>
			<Carousel className='h-100 w-100' interval={'2000'}>
				<Carousel.Item className='h-100'>
					<img src='../../images/bus1.jpg' alt='bus1' className='d-block' style={{objectFit: 'cover', height: '100vh', width: '100vw', margin: 'auto'}} />
					<Carousel.Caption className='position-fixed homeCaption' style={{top: '15%'}}>
						<Row xs={12} className='m-2 text-center p-5 homeHeading'>
							<Col style={{fontSize: '5em', textShadow: '5px 5px 10px red'}}>INFUSE BUS TRAVELS</Col>
						</Row>
						<Row xs={12} className='m-2 text-center p-4 homeTagLine'>
							<Col style={{fontSize: '3em'}}>Test Our Buses for Us</Col>
						</Row>
						<Row>
							<Col className='text-center homeButton'>
								<Button as={Link} to='/search_bus' variant='danger' className='w-25 p-3' style={{fontSize: '2.5em'}}> Get Started </Button>
							</Col>
						</Row>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item className='h-100'>
					<img src='../../images/bus2.jpg' alt='bus2' className='d-block' style={{objectFit: 'cover', height: '100vh', width: '100vw', margin: 'auto'}} />
					<Carousel.Caption className='position-fixed homeCaption' style={{top: '15%'}}>
						<Row xs={12} className='m-2 text-center p-5 homeHeading'>
							<Col style={{fontSize: '5em', textShadow: '5px 5px 10px red'}}>INFUSE BUS TRAVELS</Col>
						</Row>
						<Row xs={12} className='m-2 text-center p-4 homeTagLine'>
							<Col style={{fontSize: '3em'}}>Test Our Buses for Us</Col>
						</Row>
						<Row>
							<Col className='text-center homeButton'>
								<Button as={Link} to='/search_bus' variant='danger' className='w-25 p-3' style={{fontSize: '2.5em'}}> Get Started </Button>
							</Col>
						</Row>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item className='h-100'>
					<img src='../../images/bus3.jpg' alt='bus3' className='d-block' style={{objectFit: 'cover', height: '100vh', width: '100vw', margin: 'auto'}} />
					<Carousel.Caption className='position-fixed homeCaption' style={{top: '15%'}}>
						<Row xs={12} className='m-2 text-center p-5 homeHeading'>
							<Col style={{fontSize: '5em', textShadow: '5px 5px 10px red'}}>INFUSE BUS TRAVELS</Col>
						</Row>
						<Row xs={12} className='m-2 text-center p-4 homeTagLine'>
							<Col style={{fontSize: '3em'}}>Test Our Buses for Us</Col>
						</Row>
						<Row>
							<Col className='text-center homeButton'>
								<Button as={Link} to='/search_bus' variant='danger' className='w-25 p-3' style={{fontSize: '2.5em'}}> Get Started </Button>
							</Col>
						</Row>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
		</Container>
	)
}