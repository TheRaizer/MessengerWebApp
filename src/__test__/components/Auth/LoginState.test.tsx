import { screen, waitFor } from '@testing-library/react';
import { render } from '../../test-helpers/custom-renderer';
import userEvent from '@testing-library/user-event';
import { LoginState } from '../../../components/Auth/LoginState';
import { AuthStates } from '../../../../types/components/Auth/Auth.type';

describe('LoginState component', () => {
  it('should render input fields and a login button', () => {
    const changeState = jest.fn();

    render(
      <LoginState changeState={changeState} inputProps={{ labelText: '' }} />
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('should update the email and password state values when inputs change', async () => {
    const user = userEvent.setup();
    const changeState = jest.fn();

    render(
      <LoginState changeState={changeState} inputProps={{ labelText: '' }} />
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@test.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('when login successful, should show a hour glass', async () => {
    const user = userEvent.setup();

    const changeState = jest.fn();

    render(
      <LoginState changeState={changeState} inputProps={{ labelText: '' }} />
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'password123');

    await user.click(loginButton);

    await waitFor(() =>
      expect(screen.getByLabelText(/hour glass/i)).toBeVisible()
    );
  });

  describe('login should be unsuccessful', () => {
    test('when missing email', async () => {
      const user = userEvent.setup();

      const changeState = jest.fn();

      render(
        <LoginState changeState={changeState} inputProps={{ labelText: '' }} />
      );

      const passwordInput = screen.getByPlaceholderText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      await waitFor(() =>
        expect(
          screen.getByText('you need to fill in all fields!')
        ).toBeVisible()
      );
    });
    test('when missing password', async () => {
      const user = userEvent.setup();

      const changeState = jest.fn();

      render(
        <LoginState changeState={changeState} inputProps={{ labelText: '' }} />
      );

      const emailInput = screen.getByPlaceholderText(/email/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@test.com');
      await user.click(loginButton);

      await waitFor(() =>
        expect(
          screen.getByText('you need to fill in all fields!')
        ).toBeVisible()
      );
    });
    test('when missing either input', async () => {
      const user = userEvent.setup();

      const changeState = jest.fn();

      render(
        <LoginState changeState={changeState} inputProps={{ labelText: '' }} />
      );

      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.click(loginButton);

      await waitFor(() =>
        expect(
          screen.getByText('you need to fill in all fields!')
        ).toBeVisible()
      );
    });
  });

  it('should execute the change state function when selecting "create one"', async () => {
    const user = userEvent.setup();
    const changeState = jest.fn();

    const inputProps = { labelText: '' };
    render(<LoginState changeState={changeState} inputProps={inputProps} />);

    const changeToSignUpState = screen.getByRole('button', {
      name: /create one/i,
    });

    await user.click(changeToSignUpState);

    expect(changeState).toHaveBeenCalledTimes(1);
    expect(changeState).toHaveBeenCalledWith(AuthStates.SIGN_UP, {
      changeState,
      inputProps,
    });
  });
});
