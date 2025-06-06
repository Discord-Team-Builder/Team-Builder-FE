"use client";
import React, {  useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { acceptTeamInvite} from '@/api/APICall'
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import useAuthorised from '@/lib/isAuthorised';
import { isValidToken } from '@/api/APICall';

const AcceptInvitePage = () => {
  
  const { isLoggedIn, loading } = useAuthorised();
  const searchParams = useSearchParams();
  const router = useRouter()

  const token = searchParams.get('token')
  const team = searchParams.get('team')
  const project = searchParams.get('project')
  const invitedBy = searchParams.get('by')

  const [loader, setLoader] = useState(false)
  const [status, setStatus] = useState(null) // 'success', 'declined', 'error'
  const [message, setMessage] = useState('')
  const [tokenValid, setTokenValid] = useState(null);

  useEffect(() => {
    if (token) {
      isValidToken({ token }) 
        .then((res) => {
          
          if (res.statusCode === 200) {
            
            setTokenValid(true);
            localStorage.setItem('pendingInvite', window.location.search); 
          } else {
            setTokenValid(false);
            setMessage(res?.message || "Invalid or expired invite link.");
          }
        })
        .catch(() => {
          setTokenValid(false);
          setMessage("Invalid or expired invite link.");
        });
    } else {
      setTokenValid(false);
      setMessage("Invalid invite link.");
    }
  }, [token]);
  

  const handleAccept = async () => {
    setLoader(true)
    try {
      const res = await acceptTeamInvite({ token })

      if (res?.status === 200) {
        setStatus('success')
        setMessage(res?.data?.message || 'You have successfully joined the team!')
        localStorage.removeItem('pendingInvite')
      } else {
        setStatus('error')
        setMessage(res?.data?.error || 'Something went wrong!')
      }

      setTimeout(() => router.push('/dashboard'), 1000)
    } catch (error) {
      setStatus('error')
      setMessage(error?.response?.data?.error || 'Something went wrong!')
      setTimeout(() => router.push('/dashboard'), 1000)
    } finally {
      setLoader(false)
    }
  }

  const handleDecline = () => {
    setStatus('declined')
    setMessage('You have declined the invite.')
    setTimeout(() => router.push('/dashboard'), 2000)
    localStorage.removeItem('pendingInvite')
  }

  if (loading || isLoggedIn === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <p className="text-lg text-gray-700">Checking login status...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold mb-2 text-[#111827]">Login Required</h1>
          <p className="text-gray-600 mb-6">You must be logged in to accept the invite.</p>
          <Button
            onClick={() => router.push('/login')}
            className="bg-[#5865F2] hover:bg-[#4752c4] text-white px-6 py-2 rounded-xl text-lg"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }
  if (loading || isLoggedIn === null || tokenValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <p className="text-lg text-gray-700">Checking invite link...</p>
        </div>
      </div>
    );
  }

   if (!token || tokenValid === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold mb-2 text-[#111827]">Invalid Invite Link</h1>
          <p className="text-gray-600 mb-6">The invite link is invalid or has expired.</p>
          <Button
            onClick={() => router.push('/dashboard')}
            className="bg-[#5865F2] hover:bg-[#4752c4] text-white px-6 py-2 rounded-xl text-lg"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    )
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
              disabled={loader}
              className="bg-[#5865F2] hover:bg-[#4752c4] text-white px-6 py-2 rounded-xl text-lg"
            >
              {loading ? "Joining..." : "Accept"}
            </Button>
            <Button
              onClick={handleDecline}
              variant="outline"
              disabled={loader}
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
