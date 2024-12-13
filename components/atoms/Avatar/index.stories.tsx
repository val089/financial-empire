import type { Meta, StoryObj } from '@storybook/react';
import Avatar from '.';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  args: {
    url: 'https://avatars.githubusercontent.com/u/4726921?v=4',
  },
  parameters: {
    notes: `
     ### Avatar Component
     Put a full new line between each element.
     Put a full new line between each element.
    `,
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
