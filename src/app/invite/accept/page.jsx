"use client";
import React, { Suspense } from 'react';
import AcceptInvitePage from '@/components/AccepeInvite';

const AcceptInvite = () => {
  return (
    <Suspense fallback={<div>Loading invite info...</div>}>
      <AcceptInviteContent />
    </Suspense>
  );
};

export default AcceptInvitePage;
