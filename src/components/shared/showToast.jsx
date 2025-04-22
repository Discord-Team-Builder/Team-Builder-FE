import { toast } from 'sonner';

const toastTypes = {
  success: {
    backgroundColor: '#4CAF50', // Green
    color: '#fff',
    icon: '✅',
    title: 'Success!',
    duration: 3000,
  },
  error: {
    backgroundColor: '#F44336', // Red
    color: '#fff',
    icon: '❌',
    title: 'Error!',
    duration: 4000,
  },
  warning: {
    backgroundColor: '#FF9800', // Orange
    color: '#fff',
    icon: '⚠️',
    title: 'Warning!',
    duration: 3500,
  },
  info: {
    backgroundColor: '#2196F3', // Blue
    color: '#fff',
    icon: 'ℹ️',
    title: 'Info',
    duration: 3000,
  },
};

const showToast = (type, message) => {
  const { backgroundColor, color, icon, title, duration } = toastTypes[type] || toastTypes.info;

  toast(message, {
    style: {
      backgroundColor,
      color,
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    },
    icon,
    title,
    duration,
    animation: 'slideIn', 
  });
};

export default showToast;
