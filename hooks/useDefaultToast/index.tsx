import Toast from 'react-native-toast-message';

const useDefaultToast = () => {
  const showDefaultToastOnError = (message?: string) =>
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2:
        message ||
        'Something was wrong. Please try again or contact the administrator if the error occurs again.',
      position: 'top',
    });

  const showSuccessToast = (message: string) =>
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: message,
      position: 'top',
    });

  return {
    showDefaultToastOnError,
    showSuccessToast,
  };
};

export default useDefaultToast;
