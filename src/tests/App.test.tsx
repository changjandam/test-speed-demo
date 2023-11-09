import App from '../App';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    screen.getByRole('textbox');
    screen.getByRole('button', { name: /submit/i });
  });
});

describe('App behavior', () => {
  test('shows error message when email is invalid', async () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    const user = userEvent.setup();
    await user.type(input, 'test');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
    screen.getByText(/invalid email/i);
    await user.type(input, '@demo.com');
    expect(submitButton).toBeEnabled();
    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
    const spy = jest.spyOn(console, 'log');
    await user.click(submitButton);
    expect(spy).toHaveBeenCalledWith({ email: 'test@demo.com' });
  });
});
