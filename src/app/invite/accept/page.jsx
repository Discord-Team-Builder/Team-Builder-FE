"use client";
import AcceptInvitePage from '@/components/AccepeInvite';
import React, { Suspense } from 'react';


const AcceptInvite = () => {
  return (
    <Suspense fallback={<div>Loading invite info...</div>}>
      <AcceptInvitePage/>
    </Suspense>
  );
};

export default AcceptInvite;
