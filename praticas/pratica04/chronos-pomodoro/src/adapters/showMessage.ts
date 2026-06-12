import { toast } from 'react-toastify';
import { Dialog } from '../components/Dialog';

export const showMessage = {
  success: (msg: string) => toast.success(msg, { toastId: msg }),
  error: (msg: string) => toast.error(msg, { toastId: msg }),
  warn: (msg: string) => toast.warn(msg, { toastId: msg }),
  warning: (msg: string) => toast.warning(msg, { toastId: msg }),
  info: (msg: string) => toast.info(msg, { toastId: msg }),
  dismiss: () => toast.dismiss(),
  confirm: (data: string, onClosing: (confirmation: boolean) => void) =>
    toast(Dialog, {
      data,
      onClose: confirmation => {
        if (confirmation) return onClosing(true);
        return onClosing(false);
      },
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
    }),
};
