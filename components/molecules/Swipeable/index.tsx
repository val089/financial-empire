import ReanimatedSwipeable, {
  SwipeableProps,
} from 'react-native-gesture-handler/ReanimatedSwipeable';

const Swipeable = ({ children, ...props }: SwipeableProps) => (
  <ReanimatedSwipeable {...props}>{children}</ReanimatedSwipeable>
);

export default Swipeable;
