import React from 'react';
import ReanimatedSwipeable, {
  SwipeableMethods,
  SwipeableProps,
} from 'react-native-gesture-handler/ReanimatedSwipeable';

const Swipeable = React.forwardRef<SwipeableMethods, SwipeableProps>(
  ({ children, ...props }, ref) => (
    <ReanimatedSwipeable ref={ref} {...props}>
      {children}
    </ReanimatedSwipeable>
  )
);

Swipeable.displayName = 'Swipeable';

export default Swipeable;
