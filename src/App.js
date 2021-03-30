import './App.css';
import { db, auth } from './Firestore';
import NavBar from './navBar';
import Feed from './Feed';
import NotFound from './NotFound';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  setValue = (newMap) => {
    this.setState(newMap);
  }

  componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
      this.setState({
        user,
      });

      if (user) {
        db.ref('remy').on("value", snapshot => {
          var {feed, last} = snapshot.val();
          this.setState({
            feed,
            last
          });
        }); 
      }
    });
  }

  feedMeNow = () => {

    db.ref('remy').update({feed: {
      speed: 100,
      length: 100
    }});
  }

  dontFeedMeNow = () => {

    db.ref('remy').update({feed: null});
  }
  render() {
    const {feed, user}  = this.state;

    return (
      <div>
        <NavBar setValue={this.setValue} user={this.state.user} name={"Remy's Feeder"}/>
        {user ? 
          <Router>
            <Switch>
              <Route exact path="/" render={() => <Feed user={user} feed={feed} />} />
              {/* <Route exact path="/admin" render={() => <Feed user={user} feed={feed} />} /> */}
              <Route path='*' component={NotFound} />
            </Switch>
          </Router>
        :
          <h3>Log in please</h3>
        }
      </div>
    );
  }
}

export default App;
