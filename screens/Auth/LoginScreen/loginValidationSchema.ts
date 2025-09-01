import * as Yup from 'yup';
import { LoginFormData } from './types';

export const loginValidationSchema: Yup.ObjectSchema<LoginFormData> =
  Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
