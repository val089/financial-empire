import { TouchableOpacityProps } from 'react-native';

export type AvatarProps = {
  url?: string | null;
  isLoading?: boolean;
  onAvatarPress?: TouchableOpacityProps['onPress'];
  size?: number;
};
