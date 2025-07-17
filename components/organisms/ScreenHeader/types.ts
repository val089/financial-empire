import { AvatarPickerProps } from 'components/molecules/AvatarPicker/types';

export type ScreenHeaderProps = Pick<AvatarPickerProps, 'onUpload'> & {
  avatarUrl?: string;
  title?: string;
  onBackPress?: () => void;
  showMainSideMenu?: boolean;
};
