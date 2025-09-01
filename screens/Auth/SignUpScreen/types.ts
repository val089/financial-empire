import { AuthStackParamList } from 'setup/navigation/AuthNavigation/types';
import { Screens } from 'utils/Screens';
import { LoginFormData } from '../LoginScreen/types';

export type SignUpScreenProps = ScreenProps<AuthStackParamList, Screens.SignUp>;

export type SignUpFormData = LoginFormData;
