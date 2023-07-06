import { useEffect, useState } from 'react';
import './App.css';
import SignUpForm from './components/SignUpForm/SignUpForm';

function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('/api')
      .then((res) => res.text())
      .then(setText);
  }, []);

  return (
    <>
      <SignUpForm />
      {text}
    </>
  );
}

export default App;
