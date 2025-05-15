import type { Meta, StoryObj } from '@storybook/react';
import ArrowLeftButton from '.';

const meta = {
  title: 'Atoms/ArrowLeftButton',
  component: ArrowLeftButton,
  argTypes: {},
  args: {
    onPress: () => console.log('button pressed'),
  },
  // decorators: [
  //   (Story) => (
  //     <View style={{ padding: 16, alignItems: 'flex-start' }}>
  //       <Story />
  //     </View>
  //   ),
  // ],
} satisfies Meta<typeof ArrowLeftButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
