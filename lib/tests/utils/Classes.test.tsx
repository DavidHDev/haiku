import { render, screen } from '@testing-library/react';
import { Classes } from '../../utils/Classes';

describe('Classes component', () => {
  const text = 'Classes Block';

  it('renders the Classes component', () => {
    const { asFragment } = render(
      <Classes className="base-class">{text}</Classes>,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('renders with base className', () => {
    render(<Classes className="base-class">{text}</Classes>);

    const element = screen.queryByText(text);
    expect(element).toHaveClass('base-class');
  });

  it('applies toggleClasses when condition is true', () => {
    render(
      <Classes
        as="section"
        className="base-class"
        toggleClasses={{ 'active-class': true }}
      >
        {text}
      </Classes>,
    );
    const element = screen.getByText(text);
    expect(element).toHaveClass('base-class active-class');
  });

  it('does not apply toggleClasses when condition is false', () => {
    render(
      <Classes
        className="base-class"
        toggleClasses={{ 'inactive-class': false }}
      >
        {text}
      </Classes>,
    );
    const element = screen.getByText(text);
    expect(element).not.toHaveClass('inactive-class');
  });

  it('removes duplicate classes', () => {
    render(
      <Classes
        className="base-class"
        toggleClasses={{ 'active-class focus base-class': true }}
      >
        {text}
      </Classes>,
    );
    const element = screen.getByText(text);
    expect(element).toHaveClass('base-class active-class focus');
  });
});
