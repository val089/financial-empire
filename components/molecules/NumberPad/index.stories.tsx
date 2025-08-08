import type { Meta, StoryObj } from '@storybook/react';
import NumberPad from '.';
import { useState } from 'react';
import { NumberPadProps } from './types';

const meta = {
  title: 'Molecules/NumberPad',
  component: NumberPad,
  argTypes: {},
  args: {
    display: true,
    value: '0',
    onChange: (value: string) => console.log(value),
  },
} satisfies Meta<typeof NumberPad>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args: NumberPadProps) {
    const [value, setValue] = useState(args.value);

    return (
      <NumberPad
        {...args}
        value={value}
        onChange={(newValue: string) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
  },
};
