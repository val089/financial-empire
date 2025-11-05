import type { Meta, StoryObj } from '@storybook/react';
import DateTimePickerModal from '.';
import { format } from 'date-fns';
import InputButton from '../InputButton';
import useModal from 'hooks/useModal';
import { useState } from 'react';

const meta = {
  title: 'Atoms/DateTimePickerModal',
  component: DateTimePickerModal,
  argTypes: {},
  args: {
    visible: false,
    value: new Date(),
    onClose: () => {},
    onChange: () => {},
  },
} satisfies Meta<typeof DateTimePickerModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { openModal, visible, closeModal } = useModal();

    return (
      <>
        <InputButton
          onPress={openModal}
          value={format(selectedDate, 'yyyy-MM-dd')}
        />
        <DateTimePickerModal
          visible={visible}
          value={selectedDate}
          onClose={closeModal}
          onChange={setSelectedDate}
        />
      </>
    );
  },
};
