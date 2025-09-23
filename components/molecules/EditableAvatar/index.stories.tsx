import type { Meta, StoryObj } from '@storybook/react';
import EditableAvatar from '.';

const meta = {
  title: 'Molecules/EditableAvatar',
  component: EditableAvatar,
  args: {
    url: 'https://avatars.githubusercontent.com/u/4726921?v=4',
    onPress: () => console.log('avatar pressed'),
  },
  parameters: {
    notes: `
     ###  EditableAvatar Component
     Put here info about EditableAvatar.
    `,
  },
} satisfies Meta<typeof EditableAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Placeholder: Story = {
  args: {
    url: '',
  },
};
