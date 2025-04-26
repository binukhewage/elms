import React, { useState, useEffect } from 'react'
import { User } from 'lucide-react'
import Sidebar from '../Components/Sidebar'
import axios from 'axios'

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => { 
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    setUserData(user);
                    
                    // Optional: Fetch fresh data from server
                    /*
                    const response = await axios.get(`http://localhost:3001/user/${user._id}`);
                    setUserData(response.data);
                    */
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen bg-gray-900">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-white">Loading profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="flex h-screen bg-gray-900">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-white">User data not available. Please log in.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-900">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-800">
                    <div>
                        <h1 className="text-white text-3xl font-bold tracking-tight">User Profile</h1>
                        <p className="text-gray-400 text-sm mt-1">User account information</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-gray-300 text-sm">Welcome Back</p>
                            <p className="text-white font-medium">{userData.name}</p>
                        </div>
                        
                        <div className="flex cursor-pointer group relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                                <User className="text-white" size={20}/>
                            </div>
                        </div>
                    </div>
                </div>   
                
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden max-w-3xl mx-auto">
                        <div className="p-5 border-b border-gray-700">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 rounded-lg bg-blue-500/10">
                                    <User className="text-blue-500" size={20}/>
                                </div>
                                <h2 className="text-white font-semibold">User Profile</h2>
                            </div>
                        </div>
                        
                        <div className="p-8">
                            <div className="flex flex-col items-center">
                                <div className="relative mb-6">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl">
                                        <User className="text-white" size={60}/>
                                    </div>
                                </div>
                                
                                <div className="w-full space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-gray-700/50 p-4 rounded-lg">
                                            <p className="text-gray-400 text-sm">Full Name</p>
                                            <p className="text-white font-medium">{userData.name}</p>
                                        </div>
                                        <div className="bg-gray-700/50 p-4 rounded-lg">
                                            <p className="text-gray-400 text-sm">Package</p>
                                            <p className="text-white font-medium">Pro User Package</p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-gray-700/50 p-4 rounded-lg">
                                            <p className="text-gray-400 text-sm">Email</p>
                                            <p className="text-white font-medium">{userData.email}</p>
                                        </div>
                                        <div className="bg-gray-700/50 p-4 rounded-lg">
                                            <p className="text-gray-400 text-sm">Phone Number</p>
                                            <p className="text-white font-medium">{userData.phone}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex space-x-4 mt-8 w-full justify-center">
                                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        Edit Profile
                                    </button>
                                    <button className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;