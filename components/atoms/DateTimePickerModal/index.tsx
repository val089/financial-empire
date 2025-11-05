import { IS_ANDROID, IS_IOS } from 'consts/environment';
import MainModal from 'components/molecules/Modal/templates/MainModal';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Button from '../Button';
import { DateTimePickerModalProps } from './types';
import { testIDs } from 'utils/testIDs';

const DateTimePickerModal = ({
  visible,
  value,
  onClose,
  onChange,
}: DateTimePickerModalProps) => (
  <>
    {IS_ANDROID && visible && (
      <DateTimePicker
        testID={testIDs.dateTimePicker}
        value={value}
        display='calendar'
        onChange={(event: DateTimePickerEvent, date) => {
          if (!date) return;
          onChange(date);
          onClose();
        }}
      />
    )}

    {IS_IOS && (
      <MainModal isVisible={visible} onClose={onClose}>
        <DateTimePicker
          testID={testIDs.dateTimePicker}
          value={value}
          display='spinner'
          onChange={(event: DateTimePickerEvent, date) => {
            if (!date) return;
            onChange(date);
          }}
        />

        <Button label='Close' onPress={onClose} />
      </MainModal>
    )}
  </>
);

export default DateTimePickerModal;
