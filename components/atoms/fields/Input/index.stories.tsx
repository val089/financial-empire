import type { Meta, StoryObj } from '@storybook/react';
import Input from '.';
import { Ionicons } from '@expo/vector-icons';

const meta = {
  title: 'Atoms/fields/Input',
  component: Input,
  argTypes: {
    placeholder: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
  },
  args: {
    placeholder: 'Type something...',
    value: '',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithError: Story = {
  args: {
    placeholder: 'Type something...',
    value: '',
    errorMessage: 'This is an error message',
  },
};

export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Type something...',
    value: '',
    leftIcon: {
      icon: () => <Ionicons name='eye-off' size={24} />,
      onPress: () => console.log('Left icon pressed'),
    },
  },
};

export const WithRightIcon: Story = {
  args: {
    placeholder: 'Type something...',
    value: '',
    rightIcon: {
      icon: () => <Ionicons name='eye' size={24} />,
      onPress: () => console.log('Right icon pressed'),
    },
  },
};
