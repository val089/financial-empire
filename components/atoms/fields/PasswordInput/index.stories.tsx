import type { Meta, StoryObj } from '@storybook/react';
import PasswordInput from '.';

const meta = {
  title: 'Atoms/fields/PsswordInput',
  component: PasswordInput,
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
} satisfies Meta<typeof PasswordInput>;

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
