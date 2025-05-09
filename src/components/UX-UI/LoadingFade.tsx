import React, { useEffect, useState } from 'react';

interface LoadingFadeProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const LoadingFade: React.FC<LoadingFadeProps> = ({ isLoading, children }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowContent(false);
    } else {
      setShowContent(true);
    }
  }, [isLoading]);

  return (
    <div className="relative min-h-[100px]">
      <div 
        className={`absolute inset-0 flex justify-center items-center transition-opacity duration-300 ${
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
      <div 
        className={`transition-all duration-500 ease-in-out ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default LoadingFade;
