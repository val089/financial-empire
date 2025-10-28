import { useState } from 'react';
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

export const Primary: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedButton, setSelectedButton] = useState<
      'first' | 'second' | null
    >('first');

    return (
      <>
        <CheckableButton
          label='First Button'
          isSelected={selectedButton === 'first'}
          onPress={() => setSelectedButton('first')}
        />
        <View style={{ width: 8 }} />
        <CheckableButton
          label='Second Button'
          isSelected={selectedButton === 'second'}
          onPress={() => setSelectedButton('second')}
        />
      </>
    );
  },
};
