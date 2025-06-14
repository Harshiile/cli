import { useState, useEffect } from "react"
import { Button } from "./button"
import { Copy, Check, Monitor, Apple, Zap } from "lucide-react"

export function OSDetector({ className = "" }) {
    const [os, setOS] = useState("unknown")
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        if (userAgent.includes("win")) {
            setOS("windows")
        } else if (userAgent.includes("mac") || userAgent.includes("linux")) {
            setOS("unix")
        }
    }, [])

    const commands = {
        unix: "curl -fsSL https://harshiile.onrender.com/cli/unix_install.sh | bash",
        windows: "iwr https://harshiile.onrender.com/win_install.ps1 | iex",
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const getOSIcon = () => {
        switch (os) {
            case "windows":
                return <Monitor className="w-5 h-5 text-blue-400" />
            case "unix":
                return <Apple className="w-5 h-5 text-gray-400" />
            default:
                return <Zap className="w-5 h-5 text-purple-400" />
        }
    }

    const getCommand = () => {
        if (os === "unknown") return commands.unix
        return commands[os]
    }

    const getPrompt = () => {
        return os === "windows" ? "PS>" : "$"
    }

    const getPromptColor = () => {
        return os === "windows" ? "text-blue-400" : "text-green-400"
    }

    return (
        <div className={`bg-gray-900 border border-gray-700 rounded-lg overflow-hidden ${className}`}>
            {/* Terminal Header */}
            <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                            {getOSIcon()}
                            <span className="text-sm text-gray-400">
                                {os === "windows" ? "PowerShell" : os === "unix" ? "Terminal" : "Install JOU CLI"}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => copyToClipboard(getCommand())}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Command */}
            <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                    <span className={getPromptColor()}>{getPrompt()}</span>
                    <code className="text-white text-sm break-all">{getCommand()}</code>
                </div>

                {os === "unknown" && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                        <p className="text-xs text-gray-400 mb-3">Choose your operating system:</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setOS("unix")}
                                className="flex items-center space-x-2 text-xs"
                            >
                                <Apple className="w-4 h-4" />
                                <span>Linux / macOS</span>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setOS("windows")}
                                className="flex items-center space-x-2 text-xs"
                            >
                                <Monitor className="w-4 h-4" />
                                <span>Windows</span>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
