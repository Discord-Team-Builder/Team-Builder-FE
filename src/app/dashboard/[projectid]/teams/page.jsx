"use client"
import { useParams } from 'next/navigation';
import { extractProjectId } from '@/lib/getProjectId';

export default function TeamsPage() {

  const pathname = useParams()
  console.log("pathname:", pathname)
  const projectid = pathname.projectid

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Teams for Project: {projectid}</h1>
      {/* Fetch and render teams here */}
    </div>
  );
}
