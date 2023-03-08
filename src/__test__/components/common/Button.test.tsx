import { screen } from '@testing-library/react';
import { Button } from '../../../components/common/Button';
import { render } from '../../test-helpers/custom-renderer';

describe('Button component', () => {
  it('renders the button with the correct text', () => {
    render(<Button>Click me!</Button>);
    const button = screen.getByText('Click me!');
    expect(button).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick}>Click me!</Button>);
    const button = screen.getByText('Click me!');
    button.click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('applies the correct dimensions as inline styles', () => {
    const dimensions = {
      width: '200px',
      height: '50px',
    };
    render(<Button dimensions={dimensions}>Click me!</Button>);
    const button = screen.getByText('Click me!');
    expect(button).toHaveStyle(`
      width: ${dimensions.width};
      height: ${dimensions.height};
    `);
  });
});
