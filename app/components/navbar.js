import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Home, FolderOpen, PlusCircle, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="z-50 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <div className="flex items-center">
                        <a href="/" className="flex items-center space-x-2 text-white hover:text-blue-100 transition duration-150 ease-in-out">
                            <Home className="h-6 w-6 sm:h-7 sm:w-7" />
                            <span className="font-bold text-xl sm:text-2xl tracking-tight">CardCrafter</span>
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <SignedOut>
                            <a href="/sign-in" className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center space-x-1">
                                <LogIn className="h-5 w-5" />
                                <span>Login</span>
                            </a>
                            <a href="/sign-up" className="bg-white text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center space-x-1">
                                <UserPlus className="h-5 w-5" />
                                <span>Sign Up</span>
                            </a>
                        </SignedOut>
                        <SignedIn>
                            <a href="/flashcards" className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center space-x-1">
                                <FolderOpen className="h-5 w-5" />
                                <span className="hidden sm:inline">Collection</span>
                            </a>
                            <a href="/generate" className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center space-x-1">
                                <PlusCircle className="h-5 w-5" />
                                <span className="hidden sm:inline">Generate</span>
                            </a>
                            <UserButton 
                                appearance={{
                                    elements: {
                                        avatarBox: "w-10 h-10 rounded-full ring-2 ring-white hover:ring-blue-200 transition-all duration-200"
                                    }
                                }}
                            />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    );
}