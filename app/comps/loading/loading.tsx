"use client";
import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';
import { useLoading } from '@abhang/app/context/loading-context';


const Loading: React.FC = () => {
  const { loading } = useLoading();

  
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
