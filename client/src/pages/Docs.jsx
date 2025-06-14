import { useState } from "react"
import { Search, Terminal, Copy, Check, ChevronRight, Book, Zap, Settings } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

export default function DocsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [copiedCommand, setCopiedCommand] = useState("")

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        setCopiedCommand(text)
        setTimeout(() => setCopiedCommand(""), 2000)
    }

    const sections = [
        {
            id: "getting-started",
            title: "Getting Started",
            icon: <Zap className="w-5 h-5" />,
            content: [
                {
                    title: "Installation",
                    commands: [
                        { cmd: "npm install -g jou-cli", desc: "Install JOU globally via npm" },
                        { cmd: "yarn global add jou-cli", desc: "Install JOU globally via yarn" },
                        { cmd: "jou --version", desc: "Verify installation" },
                    ],
                },
                {
                    title: "Authentication",
                    commands: [
                        { cmd: "jou login", desc: "Login to your JOU account" },
                        { cmd: "jou logout", desc: "Logout from your account" },
                        { cmd: "jou whoami", desc: "Check current user" },
                    ],
                },
            ],
        },
        {
            id: "basic-commands",
            title: "Basic Commands",
            icon: <Terminal className="w-5 h-5" />,
            content: [
                {
                    title: "Push & Deploy",
                    commands: [
                        { cmd: "jou push", desc: "Push current directory to cloud" },
                        { cmd: "jou push ./my-project", desc: "Push specific directory" },
                        { cmd: "jou push --name my-app", desc: "Push with custom name" },
                        { cmd: "jou deploy", desc: "Deploy to production" },
                        { cmd: "jou deploy --env staging", desc: "Deploy to staging environment" },
                    ],
                },
                {
                    title: "Sharing",
                    commands: [
                        { cmd: "jou share", desc: "Create shareable link" },
                        { cmd: "jou share --public", desc: "Create public shareable link" },
                        { cmd: "jou share --expires 7d", desc: "Create link that expires in 7 days" },
                        { cmd: "jou unshare <id>", desc: "Remove shared link" },
                    ],
                },
            ],
        },
        {
            id: "advanced",
            title: "Advanced Usage",
            icon: <Settings className="w-5 h-5" />,
            content: [
                {
                    title: "Configuration",
                    commands: [
                        { cmd: "jou config set <key> <value>", desc: "Set configuration value" },
                        { cmd: "jou config get <key>", desc: "Get configuration value" },
                        { cmd: "jou config list", desc: "List all configuration" },
                        { cmd: "jou config reset", desc: "Reset to default configuration" },
                    ],
                },
                {
                    title: "Project Management",
                    commands: [
                        { cmd: "jou list", desc: "List all your projects" },
                        { cmd: "jou delete <project-id>", desc: "Delete a project" },
                        { cmd: "jou rename <old-name> <new-name>", desc: "Rename a project" },
                        { cmd: "jou clone <project-id>", desc: "Clone a project locally" },
                    ],
                },
            ],
        },
    ]

    const filteredSections = sections.filter(
        (section) =>
            section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            section.content.some(
                (content) =>
                    content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    content.commands.some(
                        (cmd) =>
                            cmd.cmd.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            cmd.desc.toLowerCase().includes(searchQuery.toLowerCase()),
                    ),
            ),
    )

    return (
        <div className="min-h-screen bg-black text-white font-mono">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <Book className="w-8 h-8 text-purple-400" />
                            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
                                Documentation
                            </h1>
                        </div>
                        <p className="text-xl text-gray-300 mb-8">Everything you need to know about using JOU CLI</p>

                        {/* Search */}
                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Search documentation..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Documentation Content */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Sidebar Navigation */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <h3 className="text-lg font-bold mb-4 text-purple-400">Quick Navigation</h3>
                                <nav className="space-y-2">
                                    {sections.map((section) => (
                                        <a
                                            key={section.id}
                                            href={`#${section.id}`}
                                            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors p-2 rounded-md hover:bg-gray-800"
                                        >
                                            {section.icon}
                                            <span>{section.title}</span>
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3 space-y-12">
                            {filteredSections.map((section) => (
                                <div key={section.id} id={section.id} className="scroll-mt-24">
                                    <div className="flex items-center space-x-3 mb-8">
                                        {section.icon}
                                        <h2 className="text-3xl font-bold text-purple-400">{section.title}</h2>
                                    </div>

                                    <div className="space-y-8">
                                        {section.content.map((content, contentIndex) => (
                                            <div key={contentIndex}>
                                                <h3 className="text-xl font-bold mb-4 text-blue-400">{content.title}</h3>
                                                <div className="space-y-4">
                                                    {content.commands.map((command, cmdIndex) => (
                                                        <div
                                                            key={cmdIndex}
                                                            className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden"
                                                        >
                                                            {/* Terminal Header */}
                                                            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center space-x-2">
                                                                        <div className="flex space-x-1">
                                                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                                        </div>
                                                                        <Terminal className="w-4 h-4 text-purple-400" />
                                                                    </div>
                                                                    <button
                                                                        onClick={() => copyToClipboard(command.cmd)}
                                                                        className="text-gray-400 hover:text-white transition-colors"
                                                                    >
                                                                        {copiedCommand === command.cmd ? (
                                                                            <Check className="w-4 h-4 text-green-400" />
                                                                        ) : (
                                                                            <Copy className="w-4 h-4" />
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* Command Content */}
                                                            <div className="p-4">
                                                                <div className="flex items-center space-x-2 mb-2">
                                                                    <span className="text-green-400">$</span>
                                                                    <code className="text-white">{command.cmd}</code>
                                                                </div>
                                                                <p className="text-gray-400 text-sm ml-4">{command.desc}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Start CTA */}
            <section className="bg-gray-900 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-gray-400 mb-8">Install JOU CLI and start deploying in minutes</p>
                    <div className="bg-black border border-gray-700 rounded-lg p-6 max-w-md mx-auto mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <span className="text-green-400">$</span>
                                <code className="text-white">npm install -g jou-cli</code>
                            </div>
                            <button
                                onClick={() => copyToClipboard("npm install -g jou-cli")}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                {copiedCommand === "npm install -g jou-cli" ? (
                                    <Check className="w-4 h-4 text-green-400" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-purple-400 to-blue-600 text-white hover:from-purple-500 hover:to-blue-700"
                    >
                        View Examples
                        <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </section>
        </div>
    )
}
