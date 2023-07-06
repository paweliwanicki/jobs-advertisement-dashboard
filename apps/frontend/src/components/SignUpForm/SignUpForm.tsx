import { ApiService } from '../../utils/ApiService';
import Input from '../common/Input/Input';
import classes from './SignUpForm.module.scss';
import { useState } from 'react';

const SignUpForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignUp = async () => {
    const response = await ApiService.get<{
      username: string;
      password: string;
    }>({
      path: '/api',
      // payload: JSON.stringify({
      //   username,
      //   password,
      // }),
    });

    console.log(response);
  };

  return (
    <div className={classes.signUpForm}>
      <Input
        type="text"
        id="username"
        labelText="username"
        errorText="cant by empty"
        isValid={true}
        hasError={false}
        onChange={setUsername}
      />

      <Input
        type="text"
        id="password"
        labelText="password"
        errorText="cant by empty"
        isValid={true}
        hasError={false}
        onChange={setPassword}
      />

      <button type="button" onClick={handleSignUp}>
        send
      </button>
    </div>
  );
};

export default SignUpForm;
