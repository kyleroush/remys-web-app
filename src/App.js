import './App.css';
import { db } from './firestore';

function App() {
  const feedMeNow = () => {
    db.ref('feednow').push('please?')
  }

  return (
    <div className="App">
      <button onClick={feedMeNow}>Feed Me! shNow!</button>
    </div>
  );
}

export default App;
