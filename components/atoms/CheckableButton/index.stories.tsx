import type { Meta, StoryObj } from '@storybook/react';
import CheckableButton from '.';
import { View } from 'react-native';

const meta = {
  title: 'Atoms/CheckableButton',
  component: CheckableButton,
  argTypes: {},
  args: {
    onPress: () => console.log('button pressed'),
    label: 'Click Me',
    isSelected: true,
  },
  decorators: [
    (Story: StoryObj) => (
      <View
        style={{
          padding: 16,
          alignItems: 'flex-start',
          flexDirection: 'row',
          flex: 1,
        }}
      >
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof CheckableButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
