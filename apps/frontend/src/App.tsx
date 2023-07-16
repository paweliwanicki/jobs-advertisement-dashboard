import { useEffect, useState } from 'react';
import './App.css';
import LoginContainer from './containers/LoginContainer/LoginContainer';
import Layout from './containers/Layout/Layout';

function App() {
  // const [text, setText] = useState('');

  // useEffect(() => {
  //   fetch('/api')
  //     .then((res) => res.text())
  //     .then(setText);
  // }, []);

  return (
    <Layout>
      <LoginContainer />
    </Layout>
  );
}

export default App;
