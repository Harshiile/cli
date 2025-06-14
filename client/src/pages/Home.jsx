import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { ChevronRight, Upload, Share2, Code, Zap } from "lucide-react"
import { Link } from "react-router-dom"

export default function HomePage() {
    const [currentCommand, setCurrentCommand] = useState(0)
    const [showCursor, setShowCursor] = useState(true)

    const terminalCommands = ["jou push <name> <path>", "jou get <username>/<project>", "jou login <username> <pass>"]

    const codeExamples = [
        {
            title: "Push your project",
            code: `$ jou push <name> <path> -m "..."
✔ Zipped successfully
✔ Upload successful
✔ Cleanup done`
        },
        {
            title: "Share instantly",
            code: `$ jou get <username>/<project_name>
✔ Fetched metadata successfully
✔ Download complete
✔ Unzipped successfully
✔ Code arrived at : .cli-code/theharshiile/vite_ui`
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCommand((prev) => (prev + 1) % terminalCommands.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev)
        }, 500)
        return () => clearInterval(cursorInterval)
    }, [])

    return (
        <div className="min-h-screen bg-black text-white font-mono">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10" />
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-purple-400/20 text-xs animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                    >
                        {Math.random() > 0.5 ? "0" : "1"}
                    </div>
                ))}
            </div>

            {/* Hero Section */}
            <section className="relative z-10 container mx-auto px-4 py-20 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
                        One CLI. Infinite Possibilities.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Push, manage, and share code or assets directly from terminal to the cloud.
                    </p>

                    {/* Terminal Command Block */}
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8 max-w-md mx-auto">
                        <div className="flex items-center mb-2">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                        </div>
                        <div className="text-left">
                            <span className="text-green-400">$</span>
                            <span className="ml-2 text-white">
                                {terminalCommands[currentCommand]}
                                <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/download">
                            <Button size="lg" className="font-mono text-lg px-8 py-3">
                                Get Started
                                <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link to="/docs">
                            <Button variant="outline" size="lg" className="font-mono text-lg px-8 py-3">
                                Learn How It Works
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Code Examples Carousel */}
            <section className="relative z-10 container mx-auto px-4 py-16">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">See It In Action</h2>
                    <div className="grid md:grid-cols-2 gap-6">

                        {codeExamples.map((example, index) => (
                            <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                                <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        </div>
                                        <span className="text-sm text-gray-400">{example.title}</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <pre className="text-sm text-gray-300 whitespace-pre-wrap">{example.code}</pre>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 bg-gray-900 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
                        Why Developers Choose JOU
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="text-center p-6 border border-gray-700 rounded-lg bg-black/50">
                            <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                            <p className="text-gray-300">Upload and deploy in seconds. Optimized for speed and efficiency.</p>
                        </div>
                        <div className="text-center p-6 border border-gray-700 rounded-lg bg-black/50">
                            <Share2 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-3">Instant Sharing</h3>
                            <p className="text-gray-300">Generate shareable links instantly. Perfect for demos and collaboration.</p>
                        </div>
                        <div className="text-center p-6 border border-gray-700 rounded-lg bg-black/50">
                            <Code className="w-12 h-12 text-green-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-3">Developer First</h3>
                            <p className="text-gray-300">Built by developers, for developers. Integrates with your workflow.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 container mx-auto px-4 py-20 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Workflow?</h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Join thousands of developers who've streamlined their deployment process
                    </p>

                    <Link to="/download">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-purple-400 to-blue-600 text-white hover:from-purple-500 hover:to-blue-700 font-mono text-lg px-8 py-3"
                        >
                            <Zap className="mr-2 w-5 h-5" />
                            Get Started Now
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
