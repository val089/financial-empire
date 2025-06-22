import type { Meta, StoryObj } from '@storybook/react';
import Button from '.';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {},
  args: {
    onPress: () => console.log('button pressed'),
    label: 'Click Me',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
