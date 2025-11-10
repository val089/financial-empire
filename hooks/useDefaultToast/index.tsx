import Toast from 'react-native-toast-message';

const useDefaultToast = () => {
  // TOOD: improve this hook to support more customization
  const showErrorToast = (message?: string, title?: string) =>
    Toast.show({
      type: 'error',
      text1: title || 'Error',
      text2:
        message ||
        'Something was wrong. Please try again or contact the administrator if the error occurs again.',
      position: 'top',
      // text1Style: { fontSize: 14 },
      // text2Style: { fontSize: 12 },
    });

  const showSuccessToast = (message: string) =>
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: message,
      position: 'bottom',
    });

  const showInfoToast = (message: string) =>
    Toast.show({
      type: 'info',
      text1: 'Info',
      text2: message,
      position: 'bottom',
    });

  return {
    showErrorToast,
    showSuccessToast,
    showInfoToast,
  };
};

export default useDefaultToast;
