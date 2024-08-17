'use client';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return;
            const docRef = doc(collection(db, 'users'), user.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || [];
                setFlashcards(collections);
            } else {
                await setDoc(docRef, { flashcards: [] });
            }
        }
        getFlashcards();
    }, [user]);

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`);
    };

    return (
        <div style={{ minHeight: 'calc(100vh - 80px)' }} className="bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.h1 
                    className="text-4xl font-extrabold text-center text-blue-800 mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Your Flashcard Collections
                </motion.h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {flashcards.map((flashcard, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg"
                        >
                            <div 
                                className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center cursor-pointer"
                                onClick={() => handleCardClick(flashcard.name)}
                            >
                                <h2 className="text-2xl font-bold text-white text-center px-4">
                                    {flashcard.name}
                                </h2>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600 text-sm mb-4">
                                    {flashcard.description || "No description available"}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-blue-600 font-semibold">
                                        {flashcard.length || 0} cards
                                    </span>
                                    <button
                                        onClick={() => handleCardClick(flashcard.name)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors duration-300"
                                    >
                                        Study Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {flashcards.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mt-12"
                    >
                        <p className="text-xl text-gray-600">You don&apos;t have any flashcard collections yet.</p>
                        <button
                            onClick={() => router.push('/generate')}
                            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                        >
                            Create Your First Collection
                        </button>
                    </motion.div>
                )}
            </div>
            
            <div className="mt-16 bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Quick Stats</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-600">Total Collections</p>
                        <p className="text-3xl font-bold text-blue-800">{flashcards.length}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-600">Total Cards</p>
                        <p className="text-3xl font-bold text-blue-800">
                            {flashcards.reduce((sum, collection) => sum + (collection.cardCount || 0), 0)}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}