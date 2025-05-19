"use client";
import React, { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { acceptTeamInvite } from '@/api/APICall'
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

const AcceptInvitePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter()

  const token = searchParams.get('token')
  const team = searchParams.get('team')
  const project = searchParams.get('project')
  const invitedBy = searchParams.get('by')

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // 'success', 'declined', 'error'
  const [message, setMessage] = useState('')

  const handleAccept = async () => {
    setLoading(true)
    try {
      const res = await acceptTeamInvite({ token })

      if (res?.status === 200) {
        setStatus('success')
        setMessage(res?.data?.message || 'You have successfully joined the team!')
      } else {
        setStatus('error')
        setMessage(res?.data?.error || 'Something went wrong!')
      }

      setTimeout(() => router.push('/dashboard'), 2000)
    } catch (error) {
      setStatus('error')
      setMessage(error?.response?.data?.error || 'Something went wrong!')
      setTimeout(() => router.push('/dashboard'), 2000)
    } finally {
      setLoading(false)
    }
  }

  const handleDecline = () => {
    setStatus('declined')
    setMessage('You have declined the invite.')
    setTimeout(() => router.push('/dashboard'), 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center transition-all">
        <h1 className="text-3xl font-bold mb-2 text-[#111827]">You're Invited!</h1>
        <p className="text-gray-600 mb-6">You've been invited to join a team on our platform.</p>

        <div className="bg-gray-50 rounded-md p-4 text-left mb-6 border">
          <p className="text-sm text-gray-500 mb-1">Project</p>
          <p className="font-medium text-[#111827] mb-3">{project}</p>

          <p className="text-sm text-gray-500 mb-1">Team</p>
          <p className="font-medium text-[#111827] mb-3">{team}</p>

          <p className="text-sm text-gray-500 mb-1">Invited By</p>
          <p className="font-medium text-[#111827]">{invitedBy}</p>
        </div>

        {status ? (
          <div className="flex items-center justify-center gap-2 text-lg font-medium mt-4">
            {status === 'success' && (
              <p className="text-green-600 flex items-center gap-2"><CheckCircle size={20} /> {message}</p>
            )}
            {status === 'declined' && (
              <p className="text-yellow-600 flex items-center gap-2"><AlertTriangle size={20} /> {message}</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 flex items-center gap-2"><XCircle size={20} /> {message}</p>
            )}
          </div>
        ) : (
          <div className="flex gap-4 justify-center mt-4">
            <Button
              onClick={handleAccept}
              disabled={loading}
              className="bg-[#5865F2] hover:bg-[#4752c4] text-white px-6 py-2 rounded-xl text-lg"
            >
              {loading ? "Joining..." : "Accept"}
            </Button>
            <Button
              onClick={handleDecline}
              variant="outline"
              disabled={loading}
              className="text-gray-700 border-gray-300 px-6 py-2 rounded-xl text-lg hover:bg-gray-100"
            >
              Decline
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AcceptInvitePage
