import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { render } from '../../test-helpers/custom-renderer';
import { Input } from '../../../components/common/Input';

describe('Input', () => {
  it('should render an input element with the given props', () => {
    const dimensions = { width: '100px', height: '50px' };
    const labelText = 'Username';
    const onChange = jest.fn();
    const onEnter = jest.fn();
    const type = 'password';
    const testId = 'username-input';

    render(
      <Input
        dimensions={dimensions}
        labelText={labelText}
        onChange={onChange}
        onEnter={onEnter}
        type={type}
        data-testid={testId}
      />
    );

    const input = screen.getByTestId(testId);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', type);
    expect(input).toHaveAttribute('placeholder', labelText);
    expect(input).toHaveStyle(`width: ${dimensions.width};`);
    expect(input).toHaveStyle(`height: ${dimensions.height};`);
  });

  it('should run onChange callback when input changes', async () => {
    const user = userEvent.setup();
    const dimensions = { width: '100px', height: '50px' };
    const labelText = 'Username';
    const onChange = jest.fn();
    const testId = 'username-input';

    render(
      <Input
        dimensions={dimensions}
        labelText={labelText}
        onChange={onChange}
        data-testid={testId}
      />
    );

    const input = screen.getByTestId(testId);

    await user.type(input, 'testuser');
    expect(onChange).toHaveBeenCalledWith(expect.anything());
  });

  it('should execute onEnter callback when enter key is pressed', async () => {
    const user = userEvent.setup();
    const dimensions = { width: '100px', height: '50px' };
    const labelText = 'Username';
    const onEnter = jest.fn();
    const testId = 'username-input';

    render(
      <Input
        dimensions={dimensions}
        labelText={labelText}
        onEnter={onEnter}
        data-testid={testId}
      />
    );

    const input = screen.getByTestId(testId);

    await user.click(input);
    await user.keyboard('{enter}');
    expect(onEnter).toHaveBeenCalledTimes(1);
  });
});
