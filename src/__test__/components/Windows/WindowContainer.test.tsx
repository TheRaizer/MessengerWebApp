import { act, screen } from '@testing-library/react';
import { WindowContainer } from '../../../components/Windows/WindowContainer';
import { render } from '../../test-helpers/custom-renderer';

describe('WindowContainer', () => {
  it('renders the provided title', async () => {
    const title = 'Test Window';
    await act(() => {
      render(
        <WindowContainer title={title} windowId={0}>
          <div></div>
        </WindowContainer>
      );
    });

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the provided children', async () => {
    await act(() => {
      const children = <div>Test Content</div>;
      render(
        <WindowContainer title="Test Window" windowId={0}>
          {children}
        </WindowContainer>
      );
    });

    const contentElement = screen.getByText('Test Content');
    expect(contentElement).toBeInTheDocument();
  });
});
