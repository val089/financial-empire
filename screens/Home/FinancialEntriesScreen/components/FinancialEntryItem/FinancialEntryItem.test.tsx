import { FinancialEntry } from 'lib/types';
import FinancialEntryItem from '.';
import { fireEvent, render } from 'setup/testing-library';
import { Formatter } from 'utils/Formatter/Formatter';

describe('FinancialEntryItem', () => {
  const mockOnDelete = jest.fn();
  const entry: FinancialEntry = {
    id: 2,
    amount: 50,
    type: 'expense',
    created_at: '2025-07-07T11:15:20.280647+00:00',
    category_name: 'food & drinks',
    subcategory_name: 'restaurant',
    user_id: '1',
  };

  test('renders correctly with given props', () => {
    const { getByTestId } = render(
      <FinancialEntryItem item={entry} showMainDate onDelete={mockOnDelete} />
    );

    expect(getByTestId(`swipeable-item-${entry.id.toString()}`)).toBeTruthy();
  });

  test('renders showMainDate with correct date format', () => {
    const { getByTestId } = render(
      <FinancialEntryItem item={entry} showMainDate onDelete={mockOnDelete} />
    );

    expect(getByTestId('main-date').props.children).toEqual(
      Formatter.formatDate(entry.created_at)
    );
  });

  test('calls onDelete when delete action is pressed', () => {
    const { getByText } = render(
      <FinancialEntryItem item={entry} showMainDate onDelete={mockOnDelete} />
    );

    const deleteButton = getByText('Delete');
    fireEvent.press(deleteButton);
    expect(mockOnDelete).toHaveBeenCalled();
  });
});
