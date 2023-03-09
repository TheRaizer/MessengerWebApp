import React, { createRef } from 'react';
import { fireEvent, screen } from '@testing-library/react';
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
    const ref = createRef<HTMLInputElement>();

    render(
      <Input
        dimensions={dimensions}
        labelText={labelText}
        onChange={onChange}
        onEnter={onEnter}
        type={type}
        data-testid={testId}
        ref={ref}
      />
    );

    const input = screen.getByTestId(testId);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', type);
    expect(input).toHaveAttribute('placeholder', labelText);
    expect(input).toHaveStyle(`width: ${dimensions.width};`);
    expect(input).toHaveStyle(`height: ${dimensions.height};`);

    fireEvent.change(input, { target: { value: 'testuser' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.anything());

    fireEvent.focus(input);
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });
    expect(onEnter).toHaveBeenCalledTimes(1);
  });
});
