import { ActivityIndicator } from 'react-native';
import { mergeClasses } from 'utils/functions/mergeClasses';
import { LoaderProps } from './types';
import colors from 'theme/colors';
import { testIDs } from 'utils/testIDs';

const Loader = ({ className, ...rest }: LoaderProps) => (
  <ActivityIndicator
    className={mergeClasses('items-center justify-center', className)}
    color={colors.primary.blue[400]}
    testID={testIDs.loader}
    {...rest}
  />
);

export default Loader;
