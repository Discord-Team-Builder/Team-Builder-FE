"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { acceptTeamInvite } from '@/api/APICall'

const AcceptInvitePage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // 'success', 'declined', 'error', or null
  const [message, setMessage] = useState('')

  const handleAccept = async () => {
  setLoading(true)
  console.log("Token:", token)
  
  acceptTeamInvite({token})
    .then((res) => {
      console.log("Response:", res)
    
        if (res?.status === 200) {
          setStatus('success')
          setMessage(res?.data?.message || 'You have successfully joined the team!')
        } else {
         
          setStatus('error')
          setMessage(res?.data?.error || 'Something went wrong!')
        }

        setTimeout(() => router.push('/dashboard'), 2000)
      })
    .catch((error) => {
      console.error("API Error:", error)
      setStatus('error')
      setMessage(error?.response?.data?.error || 'Something went wrong!')
      setTimeout(() => router.push('/dashboard'), 2000)
    })
    .finally(() => setLoading(false))
  }

  const handleDecline = async () => {
    setLoading(true)
    try {
      setStatus('declined')
      setMessage(res?.data?.message || 'You have declined the invite.')
    } catch (error) {
      setStatus('error')
      setMessage(error?.response?.data?.error || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-4 text-center'>
      <h1 className='text-3xl font-bold mb-4'>Team Invitation</h1>
      <p className='text-gray-600 mb-6'>You've been invited to join a team. Would you like to accept the invitation?</p>

      {status ? (
        <div className='text-lg font-medium'>
          {status === 'success' && <p className='text-green-600'>{message}</p>}
          {status === 'declined' && <p className='text-yellow-600'>{message}</p>}
          {status === 'error' && <p className='text-red-600'>{message}</p>}
        </div>
      ) : (
        <div className='flex gap-4'>
          <Button variant="secondary" className="bg-white text-[#5865F2] cursor-pointer hover:bg-gray-100 text-lg" disabled={loading} onClick={handleAccept}>Accept</Button>
          <Button variant="destructive" disabled={loading} onClick={handleDecline}>Decline</Button>
        </div>
      )}
    </div>
  )
}

export default AcceptInvitePage
