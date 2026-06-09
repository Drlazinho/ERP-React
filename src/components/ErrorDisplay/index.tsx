import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
        color: '#333',
        fontFamily: 'Poppins-Regular',
        fontWeight: 'bold',
      }}
    >
      {message}
    </div>
  );
};

export default ErrorDisplay;
