import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import RadioGroup from '.';

const meta = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  argTypes: {
    onSelect: {
      action: 'onSelect',
    },
    options: {
      control: 'object',
    },
    selectedValue: {
      control: 'text',
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
  },
  args: {
    onSelect: (value: string) => console.log(value),
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ],
    selectedValue: 'option1',
    orientation: 'vertical',
  },
  decorators: [
    (Story: StoryFn) => (
      <View
        style={{
          marginTop: 100,
        }}
      >
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
