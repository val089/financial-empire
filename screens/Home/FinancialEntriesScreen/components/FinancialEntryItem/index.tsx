import { View, Text } from 'react-native';
import { Formatter } from 'utils/Formatter/Formatter';
import RightAction from '../RightAction';
import { FinancialEntryItemProps } from './types';
import { mergeClasses } from 'utils/functions/mergeClasses';
import { Swipeable } from 'components/molecules';

const FinancialEntryItem = ({
  item,
  showMainDate,
}: FinancialEntryItemProps) => (
  <>
    {showMainDate && (
      <Text className='text-h2 px-4 mt-10 mb-5 font-interMedium'>
        {Formatter.formatDate(item.created_at)}
      </Text>
    )}
    <Swipeable
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={(progressAnimatedValue, dragAnimatedValue) => (
        <RightAction
          {...{ dragAnimatedValue }}
          className={showMainDate ? 'border-t' : ''}
        />
      )}
      onSwipeableOpen={(directions, swipeable) => {
        const timeout = setTimeout(() => swipeable.close(), 2000);
        return () => clearTimeout(timeout);
      }}
    >
      <View
        className={mergeClasses(
          'p-4 flex-row justify-between items-center border-b border-gray-200',
          {
            'border-t': showMainDate,
          }
        )}
      >
        <View>
          <Text className='text-h3'>{item.category || 'TEST'}</Text>
          <Text className='text-h4 text-gray-400'>
            {Formatter.timeFromDate(item.created_at)}
          </Text>
        </View>

        {item.type === 'income' ? (
          <Text className='text-h3 text-green-500'>+ {item.amount}</Text>
        ) : (
          <Text className='text-h3 text-red-500'>- {item.amount}</Text>
        )}
      </View>
    </Swipeable>
  </>
);

export default FinancialEntryItem;
