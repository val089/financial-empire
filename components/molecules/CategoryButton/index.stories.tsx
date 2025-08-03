import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import CategoryButton from '.';
import { CategoryFinancialEntryName } from 'lib/types';

const meta = {
  title: 'Molecules/CategoryButton',
  component: CategoryButton,
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
    label: {
      control: 'text',
    },
  },
  args: {
    size: 50,
    label: 'Category Name',
    onPress: () => {
      console.log('Category button pressed');
    },
    categoryName: 'income' as CategoryFinancialEntryName,
  },
  decorators: [
    (Story: StoryObj) => (
      <View
        style={{
          flex: 1,
        }}
      >
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof CategoryButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
