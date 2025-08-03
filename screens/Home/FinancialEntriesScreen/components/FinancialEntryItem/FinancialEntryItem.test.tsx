import { FinancialEntry } from 'lib/types';
import FinancialEntryItem from '.';
import { render } from 'setup/testing-library';
import { Formatter } from 'utils/Formatter/Formatter';

describe('FinancialEntryItem', () => {
  const entry: FinancialEntry = {
    id: 2,
    amount: 50,
    type: 'expense',
    created_at: '2025-07-07T11:15:20.280647+00:00',
    category_name: 'food & drinks',
    subcategory_name: 'restaurant',
    name: 'Test Expense',
    user_id: '1',
  };

  test('renders correctly with given props', () => {
    const { getByTestId } = render(
      <FinancialEntryItem item={entry} showMainDate />
    );

    expect(getByTestId(`swipeable-item-${entry.id.toString()}`)).toBeTruthy();
  });

  test('renders showMainDate with correct date format', () => {
    const { getByTestId } = render(
      <FinancialEntryItem item={entry} showMainDate />
    );

    expect(getByTestId('main-date').props.children).toEqual(
      Formatter.formatDate(entry.created_at)
    );
  });
});
