import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { mergeClasses } from 'utils/functions/mergeClasses';

import { SafeAreaWrapperProps } from './types';

const SafeAreaWrapper = ({ children, className }: SafeAreaWrapperProps) => {
  const { top, right, left } = useSafeAreaInsets();

  return (
    <View
      className={mergeClasses('flex-1', className)}
      style={{ paddingTop: top, paddingLeft: left, paddingRight: right }}
    >
      {children}
    </View>
  );
};

export default SafeAreaWrapper;
