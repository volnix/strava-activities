import React, { lazy, Suspense, Component } from 'react';
import './App.scss';
import Container from 'react-bootstrap/Container';
import Run from './util/Run';
import { getActivities } from './util/StravaAPI';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
const RunDetail = lazy(() => import('./components/Run'));

export default class App extends Component {

  state: {loading: boolean, data: Run[]} = { loading: true, data: [] };

  render() {
    return (
      <>
        <Navbar bg="dark" data-bs-theme="dark" sticky="top">
          <Container style={{ justifyContent: 'center' }} fluid>
            <a href='https://nickvolgas.com'><img
                src="/NV.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Nickvolgas.com"
              /></a>
          </Container>
        </Navbar>
        <Container fluid>
          <Row>
          {! this.state.loading ? (
            this.state.data.map((run: Run) => {
              return <Suspense key={run.id} fallback={`Loading run...`}><RunDetail {...run} /></Suspense>
            })
          ) : (<div>Loading...</div>)}
          </Row>
        </Container>
      </>
    );
  }

  componentDidMount() {
    getActivities(10).then(runs => {
      this.setState({...this.state, ...{data: runs, loading: false}});
    });
  }
};
