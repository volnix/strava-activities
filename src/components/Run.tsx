import React from 'react';
import Run, { ActivityType } from '../util/Run';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDcglLGGVuR-2CeoKZO_vMMh_RpoTLxdJY';

export default class About extends React.Component<Run> {

    render() {
        return (
            <Col md={6} style={{ padding: '2rem' }}>
                <Card border="light" className='activity-card'>
                    <Card.Body>
                        
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{this.props.date.toDateString()}</Card.Subtitle>
                        <Row>
                            <Col md={this.props.polyline ? 5 : 12}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><strong>Distance:</strong> {this.props.distance} miles</ListGroup.Item>
                                    <ListGroup.Item><strong>Elevation Gain:</strong> {this.props.elevation} ft</ListGroup.Item>
                                    <ListGroup.Item><strong>Type:</strong> {this.props.type}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                            {this.props.polyline && (
                            <Col>
                                <Image src={`https://maps.googleapis.com/maps/api/staticmap?size=600x300&maptype=roadmap&path=enc:${this.props.polyline}&key=${GOOGLE_MAPS_API_KEY}`} fluid/>
                            </Col>
                            )}
                        </Row>
                        <Card.Link href={`https://www.strava.com/activities/${this.props.id}`} target="_blank">Link to Activity</Card.Link>
                            
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}