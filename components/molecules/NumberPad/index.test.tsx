import { screen, fireEvent } from '@testing-library/react-native';
import { render } from 'setup/testing-library';
import Calculator from './index';
import { testIDs } from 'utils/testIDs';
import { Keys } from './types';

describe('NumberPad', () => {
  const numberPadButtonId = testIDs.numberPadButton;
  const numberPadDisplayId = testIDs.numberPadDisplay;
  const numberPadId = testIDs.numberPad;
  test('renders correctly', () => {
    render(<Calculator />);

    expect(screen.getByTestId(numberPadId)).toBeTruthy();
  });

  test('renders display when display prop is true', () => {
    render(<Calculator display />);
    expect(screen.getByTestId(numberPadId)).toBeTruthy();
  });

  test('displays initial value as 0', () => {
    render(<Calculator display />);

    const display = screen.getByTestId(numberPadDisplayId);
    expect(display.props.children).toBe(0);
  });

  test('renders all calculator buttons', () => {
    render(<Calculator />);

    for (let i = 0; i <= 9; i++) {
      expect(screen.getByTestId(`${numberPadButtonId}-${i}`)).toBeTruthy();
    }

    expect(
      screen.getByTestId(`${numberPadButtonId}-${Keys['.']}`)
    ).toBeTruthy();
    expect(
      screen.getByTestId(`${numberPadButtonId}-${Keys['<']}`)
    ).toBeTruthy();
  });

  test('handles single digit input', () => {
    render(<Calculator display />);

    const button5 = screen.getByTestId(`${numberPadButtonId}-5`);
    fireEvent.press(button5);

    const display = screen.getByTestId(numberPadDisplayId);
    expect(display.props.children).toBe('5');
  });

  test('handles multiple digit input', () => {
    render(<Calculator display />);

    const button1 = screen.getByTestId(`${numberPadButtonId}-1`);
    const button2 = screen.getByTestId(`${numberPadButtonId}-2`);
    const button3 = screen.getByTestId(`${numberPadButtonId}-3`);

    fireEvent.press(button1);
    fireEvent.press(button2);
    fireEvent.press(button3);

    const display = screen.getByTestId(numberPadDisplayId);
    expect(display.props.children).toBe('123');
  });

  test('handles decimal point input', () => {
    render(<Calculator display />);

    const button1 = screen.getByTestId(`${numberPadButtonId}-1`);
    const buttonDot = screen.getByTestId(
      `${testIDs.numberPadButton}-${Keys['.']}`
    );
    const button5 = screen.getByTestId(`${numberPadButtonId}-5`);

    fireEvent.press(button1);
    fireEvent.press(buttonDot);
    fireEvent.press(button5);

    const display = screen.getByTestId(numberPadDisplayId);
    expect(display.props.children).toBe('1.5');
  });

  test('prevents multiple decimal points', () => {
    render(<Calculator display />);

    const button1 = screen.getByTestId(`${numberPadButtonId}-1`);
    const buttonDot = screen.getByTestId(`${numberPadButtonId}-${Keys['.']}`);

    fireEvent.press(button1);
    fireEvent.press(buttonDot);
    fireEvent.press(buttonDot);

    const display = screen.getByTestId(numberPadDisplayId);
    expect(display.props.children).toBe('1.');
  });

  test('prevents decimal point as first character when value is empty', () => {
    render(<Calculator display />);

    const buttonDot = screen.getByTestId(`${numberPadButtonId}-${Keys['.']}`);
    fireEvent.press(buttonDot);

    const display = screen.getByTestId(numberPadDisplayId);
    expect(display.props.children).toBe(0);
  });

  test('limits decimal places to 2', () => {
    render(<Calculator display />);

    const button1 = screen.getByTestId(`${numberPadButtonId}-1`);
    const buttonDot = screen.getByTestId(`${numberPadButtonId}-${Keys['.']}`);
    const button2 = screen.getByTestId(`${numberPadButtonId}-2`);
    const button3 = screen.getByTestId(`${numberPadButtonId}-3`);
    const button4 = screen.getByTestId(`${numberPadButtonId}-4`);

    fireEvent.press(button1);
    fireEvent.press(buttonDot);
    fireEvent.press(button2);
    fireEvent.press(button3);
    fireEvent.press(button4);

    const display = screen.getByTestId(numberPadDisplayId);
    expect(display.props.children).toBe('1.23');
  });

  test('handles backspace functionality', () => {
    render(<Calculator display />);

    const button1 = screen.getByTestId(`${numberPadButtonId}-1`);
    const button2 = screen.getByTestId(`${numberPadButtonId}-2`);
    const button3 = screen.getByTestId(`${numberPadButtonId}-3`);
    const backspaceButton = screen.getByTestId(
      `${numberPadButtonId}-${Keys['<']}`
    );

    fireEvent.press(button1);
    fireEvent.press(button2);
    fireEvent.press(button3);

    fireEvent.press(backspaceButton);

    const display = screen.getByTestId(numberPadDisplayId);
    expect(display.props.children).toBe('12');
  });

  test('handles backspace on empty value', () => {
    render(<Calculator display />);

    const backspaceButton = screen.getByTestId(
      `${numberPadButtonId}-${Keys['<']}`
    );
    fireEvent.press(backspaceButton);

    const display = screen.getByTestId(numberPadDisplayId);
    expect(display.props.children).toBe(0);
  });

  test('handles backspace until empty', () => {
    render(<Calculator display />);

    const button5 = screen.getByTestId(`${numberPadButtonId}-5`);
    const backspaceButton = screen.getByTestId(
      `${numberPadButtonId}-${Keys['<']}`
    );

    fireEvent.press(button5);

    fireEvent.press(backspaceButton);

    const display = screen.getByTestId(numberPadDisplayId);
    expect(display.props.children).toBe(0);
  });

  test('calls onChange with correct values for complex input sequence and checks that onChange returns a number', () => {
    const mockOnChange = jest.fn();
    render(<Calculator onChange={mockOnChange} display />);

    const button1 = screen.getByTestId(`${numberPadButtonId}-1`);
    const button2 = screen.getByTestId(`${numberPadButtonId}-2`);
    const buttonDot = screen.getByTestId(`${numberPadButtonId}-${Keys['.']}`);
    const button5 = screen.getByTestId(`${numberPadButtonId}-5`);
    const button0 = screen.getByTestId(`${numberPadButtonId}-0`);
    const backspaceButton = screen.getByTestId(
      `${numberPadButtonId}-${Keys['<']}`
    );

    // Enter 12.50
    fireEvent.press(button1);
    fireEvent.press(button2);
    fireEvent.press(buttonDot);
    fireEvent.press(button5);
    fireEvent.press(button0);

    // Backspace once to get 12.5
    fireEvent.press(backspaceButton);

    const display = screen.getByTestId(numberPadDisplayId);
    expect(display.props.children).toBe('12.5');
    expect(mockOnChange).toHaveBeenCalledWith(12.5);
  });

  test('prevents leading zeros', () => {
    render(<Calculator display />);

    const button0 = screen.getByTestId(`${numberPadButtonId}-0`);
    const button1 = screen.getByTestId(`${numberPadButtonId}-1`);

    fireEvent.press(button0);
    fireEvent.press(button1);

    const display = screen.getByTestId(numberPadDisplayId);
    expect(display.props.children).toBe('1');
  });
});
