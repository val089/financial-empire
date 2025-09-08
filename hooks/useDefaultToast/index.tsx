import Toast from 'react-native-toast-message';

const useDefaultToast = () => {
  const showErrorToast = (message?: string, title?: string) =>
    Toast.show({
      type: 'error',
      text1: title || 'Error',
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

  const showInfoToast = (message: string) =>
    Toast.show({
      type: 'info',
      text1: 'Info',
      text2: message,
      position: 'top',
    });

  return {
    showErrorToast,
    showSuccessToast,
    showInfoToast,
  };
};

export default useDefaultToast;
