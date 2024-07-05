import React from "react";

const Spiner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 6px solid rgba(0, 0, 0, 0.1);
          border-left-color: #3b82f6;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Spiner;
