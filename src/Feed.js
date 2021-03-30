import './App.css';
import { db } from './Firestore';
import React from 'react';
import TextField from '@material-ui/core/TextField';

class Feed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      speed: props?.feed?.speed || 100,
      length: props?.feed?.length || 100,
    };
  }

  feedMeNow = () => {
    var {speed, length} = this.state;

    db.ref('remy').update({feed: {
      speed,
      length
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
        {user && !feed && 
          <details>
            <summary>Details</summary>
            <TextField
              label="Length"
              type="number"
              defaultValue={feed?.length || 100}
              onChange={ (event) => { this.setState({length: event.target.value}) } }

            />
            <TextField
              label="Speed"
              type="number"
              defaultValue={feed?.speed || 100}
              onChange={ (event) => { this.setState({speed: event.target.value}) } }
            />
          </details>
        }
        {feed && <p>currently waiting to feed remy</p>}
        {feed && <button onClick={this.dontFeedMeNow}>on second thought</button>}
      </div>
    );
  }
}

export default Feed;
