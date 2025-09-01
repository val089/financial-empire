import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { mergeClasses } from 'utils/functions/mergeClasses';

import { ScreenContentWrapperProps } from './types';

const ScreenContentWrapper = ({
  children,
  isScrollable,
  style,
  withoutPadding,
  className,
  ref,
}: ScreenContentWrapperProps) => {
  const content = (
    <View
      className={mergeClasses(
        'flex-1 bg-white',
        {
          'p-0': withoutPadding,
          'px-[16px] pb-10 pt-0': !withoutPadding,
        },
        className
      )}
      {...{ style }}
    >
      {children}
    </View>
  );

  return isScrollable ? (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps='handled'
      automaticallyAdjustContentInsets={false}
      showsVerticalScrollIndicator={false}
      {...{ style }}
      ref={ref}
      bottomOffset={20}
    >
      {content}
    </KeyboardAwareScrollView>
  ) : (
    content
  );
};

export default ScreenContentWrapper;
