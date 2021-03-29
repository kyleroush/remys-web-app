import './App.css';
import { db, auth } from './Firestore';
import NavBar from './navBar';
import React from 'react';
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
      })
    });

    db.ref('remy').on("value", snapshot => {
      var {feed, last} = snapshot.val();
      this.setState({
        feed,
        last
      });
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
    const feed  = this.state.feed;

    return (
      <div>
        <NavBar setValue={this.setValue} user={this.state.user} name={"Remy's Feeder"}/>
        <button onClick={this.feedMeNow}>Feed Me! shNow!</button>
        {feed && <p>currently waiting to feed remy</p>}
        {feed && <button onClick={this.dontFeedMeNow}>on second thought</button>}

      </div>
    );
  }
}

export default App;
