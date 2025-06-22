import type { Meta, StoryObj } from '@storybook/react';
import ScreenHeader from '.';

const meta = {
  title: 'Organisms/ScreenHeader',
  component: ScreenHeader,
  // argTypes: {
  //   onPress: { action: 'pressed the button' },
  // },
  args: {
    onPress: () => console.log('button pressed'),
    avatarUrl: 'https://avatars.githubusercontent.com/u/4726921?v=4',
    title: 'Screen Header Title',
    onBackPress: () => console.log('button pressed'),
  },
} satisfies Meta<typeof ScreenHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
