import type { Meta, StoryObj } from '@storybook/react';
import InputButton from '.';
import { format } from 'date-fns';

const meta = {
  title: 'Atoms/InputButton',
  component: InputButton,
  argTypes: {},
  args: {
    value: format(new Date(), 'yyyy-MM-dd'),
    onPress: () => console.log('button pressed'),
    label: 'Select Date',
    placeholder: 'Select a date',
    errorMessage: '',
  },
} satisfies Meta<typeof InputButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
