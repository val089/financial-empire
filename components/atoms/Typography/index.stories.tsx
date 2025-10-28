import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import Typography from '.';
import { TypographyType } from './types';
import { View } from 'react-native';

const meta = {
  title: 'Atoms/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'h1',
        'h1Bold',
        'h1Regular',
        'h2',
        'h2Regular',
        'h2Bold',
        'h3',
        'h4Regular',
      ] satisfies TypographyType[],
    },
  },
  args: {
    variant: 'h1',
    children: 'Typography Text',
  },
  decorators: [
    (Story: StoryFn) => (
      <View
        style={{
          padding: 16,
          flex: 1,
          marginTop: 50,
          alignItems: 'center',
        }}
      >
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
