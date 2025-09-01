import { ActivityIndicator, View } from 'react-native';
import { mergeClasses } from 'utils/functions/mergeClasses';
import { LoaderProps } from './types';
import colors from 'theme/colors';

const Loader = ({ className, ...rest }: LoaderProps) => (
  <View
    className={mergeClasses('items-center justify-center', className)}
    testID='loader'
  >
    <ActivityIndicator color={colors.primary.blue[400]} {...rest} />
  </View>
);

export default Loader;
