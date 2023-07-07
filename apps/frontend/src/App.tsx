import { useEffect, useState } from 'react';
import './App.css';
import LoginContainer from './containers/LoginContainer/LoginContainer';

function App() {
  // const [text, setText] = useState('');

  // useEffect(() => {
  //   fetch('/api')
  //     .then((res) => res.text())
  //     .then(setText);
  // }, []);

  return (
    <>
      <LoginContainer />
  
    </>
  );
}

export default App;
