import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import Radio from '.';

const meta = {
  title: 'Atoms/Radio',
  component: Radio,
  argTypes: {
    onPress: {
      action: 'pressed',
    },
    isSelected: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    size: {
      control: 'number',
    },
  },
  args: {
    onPress: () => console.log('radio pressed'),
    isSelected: false,
    label: 'Radio Button',
    size: 30,
  },
  decorators: [
    (Story: StoryFn) => (
      <View
        style={{
          marginTop: 100,
          marginLeft: 50,
        }}
      >
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
