import React from 'react';
import { FailableInput } from '../../../components/common/FailableInput';
import { render } from '../../test-helpers/custom-renderer';
import userEvent from '@testing-library/user-event';

describe('FailableInput', () => {
  it('renders a failed input when `failed` prop is true', () => {
    const { getByTestId } = render(
      <FailableInput
        data-testid="input"
        failed={true}
        labelText={''}
        failedText={''}
      />
    );
    const input = getByTestId('input');

    expect(input).toHaveStyle('border: 1px solid red');
  });

  it('renders a non-failed input when `failed` prop is false', () => {
    const { getByTestId } = render(
      <FailableInput
        data-testid="input"
        failed={false}
        labelText={''}
        failedText={''}
      />
    );
    const input = getByTestId('input');

    expect(input).toHaveStyle('border: 1px solid black');
  });

  it('renders the failed text when `failed` prop is true', () => {
    const { getByText } = render(
      <FailableInput failed={true} failedText="Failed" labelText={''} />
    );
    const failedText = getByText('Failed');

    expect(failedText).toBeVisible();
  });

  it('does not render the failed text when `failed` prop is false', () => {
    const { queryByText } = render(
      <FailableInput failed={false} failedText="Failed" labelText={''} />
    );
    const failedText = queryByText('Failed');

    expect(failedText).toBeNull();
  });

  it('calls the `onChange` function when input value changes', async () => {
    const user = userEvent.setup();

    const onChange = jest.fn();
    const { getByRole } = render(
      <FailableInput
        onChange={onChange}
        data-testid="input"
        labelText={''}
        failedText={''}
        failed={false}
      />
    );
    const input = getByRole('textbox');

    await user.type(input, 'test');

    expect(onChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
