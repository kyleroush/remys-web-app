import './App.css';
import { db } from './Firestore';
import React from 'react';

class Feed extends React.Component {

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
    const {feed, user}  = this.props;

    return (
      <div>
        {user && !feed && <button onClick={this.feedMeNow}>Feed Me! shNow!</button>}
        {feed && <p>currently waiting to feed remy</p>}
        {feed && <button onClick={this.dontFeedMeNow}>on second thought</button>}
      </div>
    );
  }
}

export default Feed;
