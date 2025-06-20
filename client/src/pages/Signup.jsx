import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Terminal, Eye, EyeOff, Check } from "lucide-react"
import { Link } from "react-router-dom"
import { Helmet } from 'react-helmet';

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle signup logic here
        console.log("Signup attempt:", formData)
    }

    const passwordRequirements = [
        { text: "At least 8 characters", met: formData.password.length >= 8 },
        { text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
        { text: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
        { text: "Contains number", met: /\d/.test(formData.password) },
    ]

    return (
        <>
            <Helmet>
                <title>Sign up - JOU CLI</title>
                <meta name="description" content="Create your JOU CLI account and unlock seamless video publishing, editor collaboration, and command-line control for YouTube workflows" />
                <link rel="icon" href="/favicon.svg" />
            </Helmet>

            <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center px-4 py-8">
                <div className="relative z-10 w-full max-w-2xl">
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
                                    <span className="text-sm text-gray-400">jou register</span>
                                </div>
                            </div>
                        </div>

                        {/* Terminal Content */}
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
                                    Create Account
                                </h1>
                                <p className="text-gray-400">Join the JOU community</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Input
                                    type="text"
                                    label="Username"
                                    placeholder="John Doe"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    required
                                />

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
                                        placeholder="Create a strong password"
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

                                {/* Password Requirements */}
                                {formData.password && (
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-400">Password requirements:</p>
                                        <div className="space-y-1">
                                            {passwordRequirements.map((req, index) => (
                                                <div key={index} className="flex items-center space-x-2 text-sm">
                                                    <Check className={`w-4 h-4 ${req.met ? "text-green-400" : "text-gray-600"}`} />
                                                    <span className={req.met ? "text-green-400" : "text-gray-400"}>{req.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <Button type="submit" className="w-full" size="lg">
                                    Create Account
                                </Button>
                            </form>

                            <div className="mt-8 text-center">
                                <p className="text-gray-400">
                                    Already have an account?{" "}
                                    <Link href="/login" className="text-purple-400 hover:text-purple-300">
                                        Sign in
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
