import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';


const Navbar = () => {
  const navigate = useNavigate();

  const handlehome = () => {
    navigate('/');
  }

  const handleanal = () => {
    navigate('/anal');
  }

  const handlelinks = () => {
    navigate('/links')
  }

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-5 bg-white shadow-lg">
      <div className="flex items-center gap-3">
        <div className="text-4xl">🔗</div>
        <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">Minify</h1>
      </div>
      <SignedIn>
        <div className="flex items-center gap-4">
          <button onClick={handlehome} className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full font-semibold shadow-md transition-transform hover:scale-105">
            Generate URL
          </button>
          <button onClick={handlelinks} className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full font-semibold shadow-md transition-transform hover:scale-105">
            Your links
          </button>
          <UserButton appearance={{ elements: { avatarBox: 'w-10 h-10' } }} />
        </div>
      </SignedIn>
    </nav>
  )
}

export default Navbar
