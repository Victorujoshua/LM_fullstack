import React, { useState, useEffect } from 'react';

const Toast = ({ message, type, duration = 3000, onDismiss }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onDismiss) {
          onDismiss();
        }
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [message, duration, onDismiss]);

  if (!visible || !message) return null;

  let bgColor = 'bg-gray-700'; // Default
  if (type === 'success') {
    bgColor = 'bg-green-500';
  } else if (type === 'error') {
    bgColor = 'bg-red-500';
  } else if (type === 'info') {
    bgColor = 'bg-blue-500';
  }

  return (
    <div
      className={`fixed bottom-5 right-5 p-4 rounded-lg text-white shadow-lg transition-opacity duration-300 ease-in-out ${bgColor} ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ zIndex: 1000 }} // Ensure it's on top
    >
      {message}
      <button onClick={() => { setVisible(false); if (onDismiss) onDismiss(); }} className="ml-4 text-xl font-semibold leading-none">&times;</button>
    </div>
  );
};

export default Toast;
