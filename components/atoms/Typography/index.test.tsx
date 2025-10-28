import { render } from 'setup/testing-library';
import Typography from '.';

describe('Typography', () => {
  const text = 'test';
  test('renders correctly', () => {
    const { getByText } = render(<Typography>{text}</Typography>);

    expect(getByText(text)).toBeTruthy();
  });

  test('applies correct styles for variant h1', () => {
    const { getByText } = render(<Typography variant='h1'>{text}</Typography>);
    const textElement = getByText(text);

    expect(textElement.props.className).toContain('font-interMedium');
    expect(textElement.props.className).toContain('text-h1');
  });
});
