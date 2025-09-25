import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';

export type ScreenHeaderProps = {
  avatarUrl?: string | null;
  title?: string;
  onBackPress?: () => void;
  showMainSideMenu?: boolean;
  onAvatarPress?: () => void;
  navigation?: NativeStackNavigationProp<ParamListBase, string, undefined>;
  isAvatarLoading?: boolean;
};
