"use client"

import globalState from '@/globalstate/page';

export default function TeamsPage() {

  const {projectId} = globalState

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Teams for Project: {projectId}</h1>
      {/* Fetch and render teams here */}
    </div>
  );
}
