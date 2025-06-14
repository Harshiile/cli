import { useState, useEffect } from "react"
import {
    Home,
    SettingsIcon,
    Upload,
    Terminal,
    ExternalLink,
    Globe,
    Lock,
    FolderOpen,
    HardDrive,
} from "lucide-react"
import { Workspaces } from "./components/Workspaces"
import { Settings } from "./components/Settings"

export default function Dashboard() {
    const [activeSection, setActiveSection] = useState("home")

    // Mock data
    const userStats = {
        totalPushes: 47,
        totalSize: "2.3 GB",
    }

    // Extended workspaces for demonstration
    const [workspaces, setWorkspaces] = useState([
        {
            id: 1,
            name: "react-portfolio-v2",
            visibility: "public",
            size: "45.2 MB",
            pushed: "2 hours ago",
            message: "Latest portfolio with dark theme and animations - ready for client review",
            lastUpdated: "2 hours ago",
            projects: 3,
        },
        {
            id: 2,
            name: "ecommerce-backend",
            visibility: "private",
            size: "128.7 MB",
            pushed: "1 day ago",
            message: "Production API with payment integration - contains sensitive config files",
            lastUpdated: "1 day ago",
            projects: 5,
        },
        {
            id: 3,
            name: "mobile-app-flutter",
            visibility: "public",
            size: "89.3 MB",
            pushed: "3 days ago",
            message: "Cross-platform app for task management - open source contribution",
            lastUpdated: "3 days ago",
            projects: 2,
        },
        {
            id: 4,
            name: "client-dashboard",
            visibility: "private",
            size: "67.1 MB",
            pushed: "5 days ago",
            message: "Admin panel for client XYZ - includes custom branding and reports",
            lastUpdated: "5 days ago",
            projects: 4,
        },
        {
            id: 5,
            name: "nextjs-blog-site",
            visibility: "public",
            size: "34.8 MB",
            pushed: "1 week ago",
            message: "Personal blog with MDX support and SEO optimization",
            lastUpdated: "1 week ago",
            projects: 1,
        },
        {
            id: 6,
            name: "vue-ecommerce-frontend",
            visibility: "private",
            size: "156.3 MB",
            pushed: "1 week ago",
            message: "Client's online store with custom checkout flow and inventory management",
            lastUpdated: "1 week ago",
            projects: 6,
        },
        {
            id: 7,
            name: "python-data-analysis",
            visibility: "public",
            size: "78.9 MB",
            pushed: "2 weeks ago",
            message: "Machine learning project for stock price prediction - research purposes",
            lastUpdated: "2 weeks ago",
            projects: 3,
        },
        {
            id: 8,
            name: "react-native-fitness",
            visibility: "private",
            size: "234.1 MB",
            pushed: "2 weeks ago",
            message: "Fitness tracking app with workout plans and nutrition calculator",
            lastUpdated: "2 weeks ago",
            projects: 4,
        },
        {
            id: 9,
            name: "angular-crm-system",
            visibility: "private",
            size: "189.7 MB",
            pushed: "3 weeks ago",
            message: "Enterprise CRM with advanced reporting and customer management features",
            lastUpdated: "3 weeks ago",
            projects: 8,
        },
        {
            id: 10,
            name: "nodejs-microservices",
            visibility: "public",
            size: "145.6 MB",
            pushed: "1 month ago",
            message: "Microservices architecture demo with Docker and Kubernetes deployment",
            lastUpdated: "1 month ago",
            projects: 12,
        },
    ])

    const sidebarItems = [
        { id: "home", label: "Home", icon: <Home className="w-5 h-5" /> },
        { id: "workspaces", label: "Workspaces", icon: <FolderOpen className="w-5 h-5" /> },
        { id: "settings", label: "Settings", icon: <SettingsIcon className="w-5 h-5" /> },
    ]

    const handleUpdateWorkspace = (id, updates) => {
        setWorkspaces((prev) => prev.map((ws) => (ws.id === id ? { ...ws, ...updates } : ws)))
    }

    const handleDeleteWorkspace = (id) => {
        setWorkspaces((prev) => prev.filter((ws) => ws.id !== id))
    }

    const renderHomeSection = () => (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                        <Upload className="w-8 h-8 text-purple-400" />
                        <div>
                            <p className="text-2xl font-bold text-white">{userStats.totalPushes}</p>
                            <p className="text-gray-400 text-sm">Total Pushes</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/20 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                        <HardDrive className="w-8 h-8 text-blue-400" />
                        <div>
                            <p className="text-2xl font-bold text-white">{userStats.totalSize}</p>
                            <p className="text-gray-400 text-sm">Data Transferred</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Pushes */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
                    <h3 className="text-lg font-bold text-white">Recent Pushes</h3>
                </div>
                <div className="divide-y divide-gray-700">
                    {workspaces.map((ws) => (
                        <div key={ws.id} className="p-6 hover:bg-gray-800/50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    {ws.visibility === "public" ? (
                                        <Globe className="w-4 h-4 text-green-400" />
                                    ) : (
                                        <Lock className="w-4 h-4 text-gray-400" />
                                    )}
                                    <div>
                                        <h4 className="font-bold text-white">{ws.name}</h4>
                                        <p className="text-sm text-gray-400 max-w-7xl">
                                            {ws.size} • {ws.message}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ExternalLink className="w-4 h-4 text-gray-400 hover:text-purple-400 mb-0.75" />
                                    <span className="text-sm text-gray-500">{ws.pushed}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    return (
        <div className="h-screen bg-black text-white font-mono overflow-hidden">
            <div className="flex h-full">
                {/* Fixed Sidebar */}
                <div className="w-64 bg-gray-900 border-r border-gray-700 flex-shrink-0">
                    <nav className="space-y-2 py-6 px-2">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeSection === item.id
                                    ? "bg-purple-600 text-white shadow-lg shadow-purple-400/20"
                                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                                    }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0">

                    <div className="flex-1 flex min-h-0">
                        {/* Scrollable Main Panel */}
                        <div className="flex-1 overflow-y-auto p-8">
                            {activeSection === "home" && renderHomeSection()}
                            {activeSection === "workspaces" && (
                                <Workspaces
                                    workspaces={workspaces}
                                    onUpdateWorkspace={handleUpdateWorkspace}
                                    onDeleteWorkspace={handleDeleteWorkspace}
                                />
                            )}
                            {activeSection === "settings" && <Settings />}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
