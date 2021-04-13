import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import TodosView from './views/TodosView';
import RegisterView from './views/RegisterView';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import Container from './components/Container';
import AppBar from './components/AppBar';
import { authOperations } from './redux/auth';

class App extends Component {
  componentDidMount() {
    this.props.onGetCuurentUser();
  }
  render() {
    return (
      <>
        <Container>
          <AppBar />

          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route path="/register" component={RegisterView} />
            <Route path="/login" component={LoginView} />
            <Route path="/todos" component={TodosView} />
          </Switch>
        </Container>
      </>
    );
  }
}

const mapDispatchToProps = {
  onGetCuurentUser: authOperations.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
