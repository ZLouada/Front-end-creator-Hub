import React from 'react';

const Skeleton = ({ className = '', ...props }) => (
  <div className={`animate-pulse bg-editorial-strong rounded-lg ${className}`} {...props} />
);

export default Skeleton;
