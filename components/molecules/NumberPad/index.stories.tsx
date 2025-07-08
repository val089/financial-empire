import type { Meta, StoryObj } from '@storybook/react';
import NumberPad from '.';

const meta = {
  title: 'Molecules/NumberPad',
  component: NumberPad,
  argTypes: {},
  args: {
    display: false,
  },
} satisfies Meta<typeof NumberPad>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
