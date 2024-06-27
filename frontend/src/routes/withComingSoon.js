import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
// Ensure you have SidebarContext properly set up and imported
// import { SidebarContext } from './SidebarContext';

const withComingSoon = (WrappedComponent) => {
  return (props) => {
    const location = useLocation();
    //const { isSidebarOpen } = useContext(SidebarContext); // Use the sidebar state
    const allowedPaths = ['/dashboard', '/settings', '/calendar'];

    if (!allowedPaths.includes(location.pathname)) {
      // Dynamically adjust overlay classes based on the sidebar state
      const overlayClasses = 'absolute top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center z-50';
      const textClasses = 'text-white text-2xl sm:text-4xl font-bold';

      return (
        <div className="relative">
          <div className={overlayClasses}>
            <span className={textClasses}>Coming Soon</span>
          </div>
          <WrappedComponent {...props} />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withComingSoon;