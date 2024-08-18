'use client'
import { useState, useEffect } from 'react';
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import { motion, useAnimation } from 'framer-motion';
import { MoveUp, Brain, Globe, PenTool, Zap, Ban } from 'lucide-react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 100) {
        controls.start({ opacity: 1, y: 0 });
      } else {
        controls.start({ opacity: 0, y: 50 });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);


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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200 min-h-screen">
      <Head>
        <title>CardCrafter - AI-Powered Flashcards</title>
        <meta name="description" content="Revolutionize your learning with AI-generated flashcards"></meta>
      </Head>

      <main className="container mx-auto px-4 pt-24">
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center my-20"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6"
          >
            Welcome to CardCrafter
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-2xl text-indigo-700 mb-10"
          >
            Revolutionize your learning with AI-powered flashcards
          </motion.p>
          <SignedOut>
            <motion.a 
              href="/sign-up" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-10 rounded-full text-xl transition duration-300 ease-in-out inline-block"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Learning Journey
            </motion.a>
          </SignedOut>
          <SignedIn>
            <motion.a 
              href="/generate" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-10 rounded-full text-xl transition duration-300 ease-in-out inline-block"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
              whileTap={{ scale: 0.95 }}
            >
              Create Your Flashcards
            </motion.a>
          </SignedIn>
        </motion.section>

        <motion.section 
          className="my-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-5xl font-bold text-center text-indigo-800 mb-16">Unleash Your Learning Potential</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Effortless Creation",
                description: "Transform your notes into flashcards with a single click, powered by advanced AI.",
                icon: <PenTool className="w-12 h-12 text-purple-500" />
              },
              {
                title: "Intelligent Learning",
                description: "Our AI adapts to your learning style, optimizing your study sessions for maximum retention.",
                icon: <Brain className="w-12 h-12 text-blue-500" />
              },
              {
                title: "Learn Anywhere",
                description: "Access your personalized flashcards from any device, anytime, anywhere in the world.",
                icon: <Globe className="w-12 h-12 text-green-500" />
              },
              {
                title: "Unlimited Flashcards",
                description: "Create as many AI-generated flashcards as you need to master your subjects.",
                icon: <Zap className="w-12 h-12 text-yellow-500" />
              },
              {
                title: "Ad-Free Experience",
                description: "Enjoy uninterrupted learning without any distracting advertisements.",
                icon: <Ban className="w-12 h-12 text-gray-500" />
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2"
                variants={itemVariants}
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="my-32 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transform -skew-y-6 z-0"></div>
          <div className="relative z-10 py-20">
            <motion.h2 variants={itemVariants} className="text-5xl font-bold text-center text-white mb-16">How It Works</motion.h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
              {[
                { step: "1", text: "Input your study material" },
                { step: "2", text: "AI generates tailored flashcards" },
                { step: "3", text: "Review, learn, and master" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center"
                  variants={itemVariants}
                >
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-white bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <p className="text-white text-xl text-center max-w-[200px]">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="my-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-5xl font-bold text-center text-indigo-800 mb-16">Support CardCrafter</motion.h2>
          <motion.div 
            className="max-w-md mx-auto"
            variants={itemVariants}
          >
            <div className="bg-white p-10 rounded-2xl shadow-2xl hover:shadow-3xl transition duration-300 ease-in-out transform hover:-translate-y-2">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-3">THE GOAT</h3>
              <p className="text-2xl font-semibold text-indigo-600 mb-6">$5 / Month</p>
              <p className="text-gray-600 mb-8 space-y-2">
                $5 monthly donation to support the development of CardCrafter. We appreciate your support!
              </p>
              <motion.button 
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-xl transition duration-300 ease-in-out"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(129,140,248)" }}
                whileTap={{ scale: 0.95 }}
              >
                Choose to THE GOAT
              </motion.button>
            </div>
          </motion.div>
        </motion.section>

        <motion.section 
          className="mt-32 bg-gradient-to-r from-blue-100 to-purple-100 py-20 rounded-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 variants={itemVariants} className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">Ready to Transform Your Learning?</motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-indigo-700 mb-12">Join thousands of students who are already experiencing the power of AI-driven learning with CardCrafter.</motion.p>
            <motion.a 
              href="/sign-up" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-10 rounded-full text-xl transition duration-300 ease-in-out inline-block"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(129,140,248)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started For Free
            </motion.a>
          </div>
        </motion.section>
      </main>

      <motion.button
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg"
        initial={{ opacity: 0 }}
        animate={controls}
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgb(129,140,248)" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <MoveUp />
      </motion.button>
    </div>
  );
}