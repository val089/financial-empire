import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import FloatingAddButton from '.';

const meta = {
  title: 'Atoms/FloatingAddButton',
  component: FloatingAddButton,
  argTypes: {},
  args: {
    onPress: () => console.log('button pressed'),
  },
  decorators: [
    (Story: StoryFn) => (
      <View
        style={{
          marginTop: 200,
          marginRight: 100,
        }}
      >
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof FloatingAddButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
