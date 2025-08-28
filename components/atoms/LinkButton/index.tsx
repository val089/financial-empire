import { TouchableOpacity, Text } from 'react-native';

import { mergeClasses } from 'utils/functions/mergeClasses';

import { LinkButtonProps } from './types';

const LinkButton = ({
  label,
  className,
  textClassName,
  ...rest
}: LinkButtonProps) => (
  <TouchableOpacity {...rest} className={className}>
    <Text
      className={mergeClasses('text-primary-blue-400 text-h4', textClassName)}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default LinkButton;
