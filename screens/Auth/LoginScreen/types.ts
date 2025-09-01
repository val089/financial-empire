import { AuthStackParamList } from 'setup/navigation/AuthNavigation/types';
import { Screens } from 'utils/Screens';

export type LoginScreenProps = ScreenProps<AuthStackParamList, Screens.Login>;

export type LoginFormData = {
  email: string;
  password: string;
};
