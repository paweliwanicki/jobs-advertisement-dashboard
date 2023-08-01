import { render, screen, act } from '@testing-library/react';
import LoginContainer from '../containers/LoginContainer/LoginContainer';

test('render', async () => {
  await act(async () => render(<LoginContainer />));
  const loginContainerElement = screen.getByRole('logincontainer');
  expect(loginContainerElement).toBeInTheDocument();
});
