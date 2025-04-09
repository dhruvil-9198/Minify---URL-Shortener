import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/clerk-react';
import Navbar from './Navbar';

const Analytics = () => {
    const { isSignedIn, isLoaded, user } = useUser();
    const [arr, setArr] = useState(null); // Start with null to check loading
    const params = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const getdata = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/links/${user.username}/${params.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setArr(data);
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

            <div className="flex justify-center items-center p-6 pb-2">
                <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-3xl">

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
                        {loading ? (
                            // Loader while fetching data
                            <div className="flex justify-center items-center min-h-[20rem]">
                                <div className="w-12 h-12 border-4 border-purple-400 border-dashed rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            arr && (
                                <div className="space-y-8">
                                    <div className="text-center">
                                        <h2 className="text-3xl font-bold text-blue-600 cursor-pointer hover:underline">
                                            <a href={`${import.meta.env.VITE_API_URL}/${arr.short_id}`} target="_blank" rel="noreferrer">
                                                {`${import.meta.env.VITE_API_URL}/${arr.short_id}`}
                                            </a>
                                        </h2>
                                        <p className="text-xl font-medium text-purple-700 mt-2 break-words">
                                            <a href={arr.og_URL} target="_blank" rel="noreferrer">{arr.og_URL}</a>
                                        </p>
                                    </div>

                                    <div className="flex justify-around text-lg">
                                        <div className="flex flex-col items-center">
                                            <span className="text-gray-600">Total Visits</span>
                                            <span className="text-2xl font-bold text-blue-500">{arr.visits?.length || 0}</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="text-gray-600">Creation Date</span>
                                            <span className="text-2xl font-bold text-purple-500">
                                                {(new Date(arr.createdAt).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                }))}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-3xl font-bold text-blue-700 mb-2 font-sans tracking-wide">Visit History</h3>
                                        <div className="grid grid-cols-3 text-center text-purple-800 font-bold mb-2">
                                            <div>Sr No.</div>
                                            <div>Day</div>
                                            <div>Time</div>
                                        </div>

                                        <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-2">
                                            {arr.visits && arr.visits.map((ele, index) => {
                                                const visitDate = new Date(ele.timestamps);

                                                const dateString = visitDate.toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                });

                                                const timeString = visitDate.toLocaleTimeString('en-GB', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit',
                                                    hour12: false
                                                });

                                                return (
                                                    <div
                                                        key={index}
                                                        className="grid grid-cols-3 bg-white rounded-xl shadow-md px-4 py-3 transition-all duration-300 text-center hover:bg-purple-100"
                                                    >
                                                        <div className="text-gray-700">{index + 1}</div>
                                                        <div className="text-gray-500">{dateString}</div>
                                                        <div className="text-gray-500">{timeString}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </SignedIn>

                </div>
            </div>
        </div>
    );
};

export default Analytics;
