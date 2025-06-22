import { useToast, ToastOptions } from 'react-native-toast-notifications';

const useDefaultToast = () => {
  const toast = useToast();

  const showDefaultToastOnError = (options?: ToastOptions) =>
    toast.show(
      'Something was wrong. Please try again or contact the administrator if the error occurs again.',
      {
        type: 'danger',
        ...options,
      }
    );

  return {
    showDefaultToastOnError,
    toast,
  };
};

export default useDefaultToast;
