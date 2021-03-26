import './App.css';
import { db } from './Firestore';
import { useState, useEffect } from 'react';


function App() {

  const [count, setCount] = useState(0);

  const feedMeNow = () => {
    db.ref('feed').update({remy: count + 1})
  }

  useEffect(() => {
    // Update the document title using the browser API
    db.ref('feed/remy').on("value", snapshot => {
      // should i change this?
      const remy = snapshot.val()


      setCount(remy)

    }); 
  });


  return (
    <div className="App">
      <button onClick={feedMeNow}>Feed Me! shNow!</button>
      {count > 0 && <p>currently waiting to feed remy {count} number of times</p>}
    </div>
  );
}

export default App;
