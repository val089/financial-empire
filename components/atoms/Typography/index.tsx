import { Text } from 'react-native';
import { mergeClasses } from 'utils/functions/mergeClasses';
import { TypographyProps } from './types';

const Typography = ({
  variant = 'h1',
  children,
  className,
  ...rest
}: TypographyProps) => (
  <Text
    className={mergeClasses(
      'text-primary-black',
      'tracking-normal',
      {
        //h1
        'font-interMedium text-h1': variant === 'h1',
        'font-interRegular text-h1': variant === 'h1Regular',
        'font-interBold text-h1': variant === 'h1Bold',

        //h2
        'font-interMedium text-h2': variant === 'h2',
        'font-interRegular text-h2': variant === 'h2Regular',
        'font-interBold text-h2': variant === 'h2Bold',

        //h3
        'font-interMedium text-h3': variant === 'h3',

        //h4
        'font-interRegular text-h4': variant === 'h4Regular',
      },
      className
    )}
    {...rest}
    allowFontScaling={false}
  >
    {children}
  </Text>
);

export default Typography;
