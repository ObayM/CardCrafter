'use client'
import { useState, useEffect } from 'react';
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import { motion } from 'framer-motion';
import {MoveUp} from 'lucide-react'
export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    });

    if (error) {
      console.warn(error.message);
    }
  }

  return (
    <div className="bg-gradient-to-b from-blue-100 to-indigo-200">
      <Head>
        <title>CardCrafter</title>
        <meta name="description" content="Craft Flashcards With Ease"></meta>
      </Head>

      <main className="container mx-auto px-4 pt-24">
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center my-20"
        >
          <h1 className="text-6xl font-bold text-blue-800 mb-6">Welcome to CardCrafter</h1>
          <p className="text-2xl text-blue-600 mb-10">AI-powered flashcard generation and storage, all for free.</p>
          <SignedOut>
            <motion.a 
              href="/sign-up" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full text-xl transition duration-300 ease-in-out transform hover:scale-105 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </SignedOut>
          <SignedIn>
            <motion.a 
              href="/generate" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full text-xl transition duration-300 ease-in-out transform hover:scale-105 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Flashcards
            </motion.a>
          </SignedIn>
        </motion.section>

        <section className="my-32">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-16">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Effortless Flashcards",
                description: "Just type in your content, and watch as flashcards are crafted for you with zero effort.",
                icon: "✍️"
              },
              {
                title: "Smart & Efficient",
                description: "Our AI meticulously transforms your text into precise, study-ready flashcards in seconds.",
                icon: "🧠"
              },{
                title: "Global Accessibility",
                description: "Study anytime, anywhere—your flashcards are accessible from any device with an internet connection.",
                icon: "🌍"}].map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="my-32 relative">
          <div className="absolute inset-0 bg-blue-600 transform -skew-y-6 z-0"></div>
          <div className="relative z-10 py-20">
            <h2 className="text-4xl font-bold text-center text-white mb-16">How It Works</h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
              {[
                { step: "1", text: "Input your study material" },
                { step: "2", text: "AI generates flashcards" },
                { step: "3", text: "Review and learn" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-blue-600 mb-4">
                    {item.step}
                  </div>
                  <p className="text-white text-xl">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="my-32">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-16">Support CardCrafter</h2>
          <motion.div 
            className="max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-10 rounded-2xl shadow-2xl hover:shadow-3xl transition duration-300 ease-in-out">
              <h3 className="text-3xl font-bold text-blue-700 mb-3">THE GOAT</h3>
              <p className="text-2xl font-semibold text-blue-600 mb-6">$5 / Month</p>
              <p className="text-gray-600 mb-8">$5 monthly donation to support the development of CardCrafter. We appreciate your support!</p>
              <motion.button 
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-xl transition duration-300 ease-in-out"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Choose THE GOAT
              </motion.button>
            </div>
          </motion.div>
        </section>


        <section className="mt-32 bg-blue-100 py-20 rounded-3xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-blue-800 mb-8">Ready to supercharge your learning?</h2>
            <p className="text-xl text-blue-600 mb-12">Join thousands of students who are already benefiting from CardCrafter's AI-powered flashcards.</p>
            <motion.a 
              href="/sign-up" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full text-xl transition duration-300 ease-in-out inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started for Free
            </motion.a>
          </div>
        </section>
      </main>

      <motion.button
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollY > 200 ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <MoveUp />
      </motion.button>
    </div>
  );
}