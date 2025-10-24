import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import CategoryIcon from '.';
import { CategoryFinancialEntryName } from 'lib/supabase/types';

const meta = {
  title: 'Atoms/CategoryIcon',
  component: CategoryIcon,
  argTypes: {
    categoryName: {
      control: 'select',
      description: 'Name of the financial category to display the icon for.',
      defaultValue: 'income',
      options: [
        'income',
        'communication, pc',
        'financial expenses',
        'food & drinks',
        'housing',
        'investments',
        'life & entertainment',
        'others',
        'shopping',
        'transportation',
        'vehicle',
      ] as CategoryFinancialEntryName[],
    },
    size: {
      control: 'number',
    },
  },
  args: {
    size: 50,
  },
  decorators: [
    (Story: StoryObj) => (
      <View
        style={{
          padding: 16,
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 100,
        }}
      >
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof CategoryIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
