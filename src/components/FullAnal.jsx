import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const FullAnal = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const getdata = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/links/${user.username}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isSignedIn && user) {
      getdata();
    }
  }, [isSignedIn, user]);

  const handlelink = (id) => {
    navigate(`/links/${id}`);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-purple-400 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      <Navbar />

      <div className="flex justify-center items-center p-6">
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-4xl">

          <SignedOut>
            <div className="text-center text-lg font-semibold text-gray-700">
              Please <SignInButton>
                <button className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-4 py-2 shadow-lg transition-transform hover:scale-105'>
                  Sign In
                </button>
              </SignInButton> to view full analytics.
            </div>
          </SignedOut>

          <SignedIn>
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-blue-600 drop-shadow-lg">Your Analytics</h2>
                <p className="text-lg text-purple-700 mt-2 tracking-wide">Manage and track all your links efficiently</p>
              </div>

              {/* Loader */}
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="w-12 h-12 border-4 border-purple-400 border-dashed rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  {/* Table headers */}
                  <div className="grid grid-cols-3 text-center text-purple-800 font-semibold mb-6">
                    <div>Original Link</div>
                    <div>Total Visits</div>
                    <div>Created On</div>
                  </div>

                  {/* Data */}
                  <div className="flex flex-col gap-4 max-h-80 overflow-y-auto pr-1">
                    {analytics.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => handlelink(item.short_id)}
                        className="grid grid-cols-3 bg-white rounded-xl shadow-md px-4 py-3 hover:bg-purple-100 transition-all duration-300 items-center cursor-pointer"
                      >
                        <div className="text-blue-700 font-medium break-words text-center text-sm hover:underline">
                          {item.og_URL}
                        </div>
                        <div className="text-blue-500 font-bold text-center text-lg">
                          {item.visits?.length || 0}
                        </div>
                        <div className="text-gray-600 text-center text-sm">
                          {(new Date(item.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          }))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </SignedIn>

        </div>
      </div>
    </div>
  );
};

export default FullAnal;
