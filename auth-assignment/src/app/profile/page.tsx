"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();

    const handleLogout = () => {
        console.log("User logged out");
        router.push("/login");
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen p-4"
            style={{
               backgroundImage: 'url("https://ae01.alicdn.com/kf/S9b2b12c8b04e4ed78b26049b9a9aded10.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="bg-transparent p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h1 className="text-2xl mb-4 text-gray-800 italic font-bold">Greetings! Welcome to our platform.</h1>
                <p className="text-gray-800 mb-2">Authentication successful. You are now logged in.</p>
                <p className="text-gray-800 font-semibold"></p>
                <div className="mt-6 flex justify-around">
                    
                    <button
                        onClick={handleLogout}
                        className="p-2 border border-gray-300 rounded-lg bg-slate-800 text-white focus:outline-none"
                    >
                        Sign Off
                    </button>
                </div>
            </div>
        </div>
    );
}
