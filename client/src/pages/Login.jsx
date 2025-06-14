import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Terminal, Eye, EyeOff } from "lucide-react"
import { Link } from "react-router-dom"
import { Helmet } from 'react-helmet';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle login logic here
        console.log("Login attempt:", formData)
    }

    return (
        <>
            <Helmet>
                <title>Login - JOU CLI</title>
                <meta name="description" content="Securely log in to your JustOneUpload CLI account to manage workspaces, uploads, and schedule automation with one-click efficiency" />
                <link rel="icon" href="/favicon.svg" />
            </Helmet>

            <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center px-4">
                <div className="relative z-10 w-full max-w-xl">
                    {/* Terminal Window */}
                    <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                        {/* Terminal Header */}
                        <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
                            <div className="flex items-center space-x-2">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <div className="flex items-center space-x-2 ml-4">
                                    <Terminal className="w-4 h-4 text-purple-400" />
                                    <span className="text-sm text-gray-400">jou login</span>
                                </div>
                            </div>
                        </div>

                        {/* Terminal Content */}
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
                                    Welcome Back
                                </h1>
                                <p className="text-gray-400">Sign in to your JOU account</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Input
                                    type="email"
                                    label="Email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />

                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        label="Password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-9 text-gray-400 hover:text-white"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>

                                <Button type="submit" className="w-full" size="lg">
                                    Sign In
                                </Button>
                            </form>

                            <div className="mt-8 text-center">
                                <p className="text-gray-400">
                                    Don't have an account?{" "}
                                    <Link href="/signup" className="text-purple-400 hover:text-purple-300">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
