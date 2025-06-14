import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Download, Terminal, CheckCircle, AlertCircle, Monitor, Apple, Check, Copy } from "lucide-react"
import { Link } from "react-router-dom"

export default function DownloadPage() {
    const [os, setOS] = useState("unknown")
    const [copiedCommands, setCopiedCommands] = useState({})

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        if (userAgent.includes("win")) {
            setOS("windows")
        } else if (userAgent.includes("mac") || userAgent.includes("linux")) {
            setOS("unix")
        }
    }, [])

    const downloadOptions = [
        {
            platform: "Linux & macOS",
            icon: <Apple className="w-8 h-8 text-gray-400" />,
            command: "curl -fsSL https://harshiile.onrender.com/fetch/unix | bash",
            description: "One-line installation for Unix-based systems",
            requirements: ["curl", "bash", "Internet connection"],
            recommended: os === "unix",
        },
        {
            platform: "Windows",
            icon: <Monitor className="w-8 h-8 text-blue-400" />,
            command: "iwr https://harshiile.onrender.com/fetch/win | iex",
            description: "PowerShell installation for Windows systems",
            requirements: ["PowerShell 5.0+", "Internet connection", "Administrator privileges"],
            recommended: os === "windows",
        },
    ]

    const installationSteps = [
        {
            step: 1,
            title: "Download & Install",
            description: "Run the installation command for your operating system",
            icon: <Download className="w-6 h-6 text-purple-400" />,
        },
        {
            step: 2,
            title: "Verify Installation",
            description: "Check that JOU CLI is installed correctly",
            icon: <CheckCircle className="w-6 h-6 text-green-400" />,
            command: "jou --version",
        },
        {
            step: 3,
            title: "Authenticate",
            description: "Login to your JOU account to start using the CLI",
            icon: <Terminal className="w-6 h-6 text-blue-400" />,
            command: "jou login <username> <password>",
        },
    ]

    const copyToClipboard = (text, commandId) => {
        navigator.clipboard.writeText(text)
        setCopiedCommands((prev) => ({ ...prev, [commandId]: true }))
        setTimeout(() => {
            setCopiedCommands((prev) => ({ ...prev, [commandId]: false }))
        }, 2000)
    }

    return (
        <div className="min-h-screen bg-black text-white font-mono">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <Download className="w-8 h-8 text-purple-400" />
                            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
                                Download JOU CLI
                            </h1>
                        </div>
                        <p className="text-xl text-gray-300 ">Get started with JOU CLI in seconds</p>
                    </div>
                </div>
            </section>

            {/* Download Options */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">Choose Your Platform</h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {downloadOptions.map((option, index) => (
                            <div
                                key={index}
                                className={`bg-gray-900 border rounded-lg overflow-hidden transition-all ${option.recommended
                                    ? "border-purple-400 ring-2 ring-purple-400/20"
                                    : "border-gray-700 hover:border-gray-600"
                                    }`}
                            >
                                {option.recommended && (
                                    <div className="bg-purple-600 text-white text-center py-2 text-sm font-bold">
                                        RECOMMENDED FOR YOUR SYSTEM
                                    </div>
                                )}

                                <div className="p-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        {option.icon}
                                        <h3 className="text-xl font-bold">{option.platform}</h3>
                                    </div>

                                    <p className="text-gray-400 mb-4">{option.description}</p>

                                    {/* Requirements */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-bold text-gray-300 mb-2">Requirements:</h4>
                                        <ul className="space-y-1">
                                            {option.requirements.map((req, reqIndex) => (
                                                <li key={reqIndex} className="flex items-center space-x-2 text-sm text-gray-400">
                                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                                    <span>{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Command */}
                                    <div className="bg-black border border-gray-700 rounded-lg overflow-hidden">
                                        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                                            <div className="flex items-center space-x-2 justify-between">
                                                <div className="flex space-x-1 items-center">
                                                    <div className="flex space-x-1">
                                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    </div>
                                                    <Terminal className="w-4 h-4 text-purple-400" />
                                                    <span className="text-sm text-gray-400">Installation Command</span>
                                                </div>
                                                <button
                                                    onClick={() => copyToClipboard(option.command, `platform-${index}`)}
                                                    className="text-gray-400 hover:text-white transition-colors"
                                                >
                                                    {copiedCommands[`platform-${index}`] ? (
                                                        <Check className="w-4 h-4 text-green-400" />
                                                    ) : (
                                                        <Copy className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex items-center space-x-2">
                                                <span className={option.platform.includes("Windows") ? "text-blue-400" : "text-green-400"}>
                                                    {option.platform.includes("Windows") ? "PS>" : "$"}
                                                </span>
                                                <code className="text-white text-sm break-all">{option.command}</code>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Installation Steps */}
            <section className="bg-gray-900 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">Installation Steps</h2>

                        <div className="space-y-8">
                            {installationSteps.map((step, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center">
                                        <span className="text-purple-400 font-bold">{step.step}</span>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            {step.icon}
                                            <h3 className="text-xl font-bold">{step.title}</h3>
                                        </div>
                                        <p className="text-gray-400 mb-4">{step.description}</p>

                                        {step.command && (
                                            <div className="bg-black border border-gray-700 rounded-lg p-4 max-w-md">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-green-400">$</span>
                                                    <code className="text-white">{step.command}</code>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Troubleshooting */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">Troubleshooting</h2>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                        <div className="flex items-center space-x-2 mb-4">
                            <AlertCircle className="w-6 h-6 text-yellow-400" />
                            <h3 className="text-xl font-bold">Common Issues</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="font-bold text-gray-300 mb-2">Permission Denied</h4>
                                <p className="text-gray-400 text-sm mb-2">
                                    If you get permission errors, try running with elevated privileges:
                                </p>
                                <div className="bg-black border border-gray-700 rounded p-2">
                                    <span className="text-green-400 mr-2">$</span>
                                    <code className="text-sm text-gray-300">sudo curl -fsSL ... | bash</code>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-gray-300 mb-2">Command Not Found</h4>
                                <p className="text-gray-400 text-sm mb-2">
                                    Restart your terminal or reload your shell configuration:
                                </p>
                                <div className="bg-black border border-gray-700 rounded p-2">
                                    <span className="text-green-400 mr-2">$</span>
                                    <code className="text-sm text-gray-300">source ~/.bashrc</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Steps */}
            <section className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">What's Next?</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Once you've installed JOU CLI, explore our examples and documentation to get the most out of your new tool.
                    </p>
                    <Link to='/docs'>
                        <Button variant="outline" size="lg">
                            Read Documentation
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
