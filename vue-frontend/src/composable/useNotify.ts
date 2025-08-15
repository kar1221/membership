const toast = useToast();

export const useNotify = () => ({
  error(message: string) {
    toast.add({
      title: 'Error',
      description: message,
      color: 'error',
    });
  },

  success(message: string) {
    toast.add({
      title: 'Success!',
      description: message,
      color: 'success',
    });
  },

  warning(message: string) {
    toast.add({
      title: 'Warning',
      description: message,
      color: 'warning',
    });
  },
});
