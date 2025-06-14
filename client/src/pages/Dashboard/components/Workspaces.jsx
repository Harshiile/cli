import { useState, useEffect } from "react"
import {
    Globe,
    Lock,
    FolderOpen,
    HardDrive,
    ExternalLink,
    MoreHorizontal,
    Terminal,
    Eye,
    EyeOff,
    Trash2,
} from "lucide-react"
import { Button } from "../../../components/ui/button"
import { NameDialog } from "./Update/Name"
import { MessageDialog } from "./Update/Message"
import { VisibilityDialog } from "./Update/Visibility"
import { DeleteDialog } from "./Update/Delete"


export function Workspaces({ workspaces, onUpdateWorkspace, onDeleteWorkspace }) {
    const [openDropdown, setOpenDropdown] = useState(null)
    const [activeDialog, setActiveDialog] = useState(null)
    const [selectedWorkspace, setSelectedWorkspace] = useState(null)

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openDropdown && !(event.target).closest(".dropdown-container")) {
                setOpenDropdown(null)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [openDropdown])

    // Handle escape key to close dialogs
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                closeDialog()
            }
        }

        if (activeDialog) {
            document.addEventListener("keydown", handleEscape)
            return () => document.removeEventListener("keydown", handleEscape)
        }
    }, [activeDialog])

    const openDialog = (dialogType, workspace) => {
        setSelectedWorkspace(workspace)
        setActiveDialog(dialogType)
        setOpenDropdown(null)
    }

    const closeDialog = () => {
        setActiveDialog(null)
        setSelectedWorkspace(null)
    }

    const handleDropdownAction = (action, workspace) => {
        switch (action) {
            case "changeName":
                openDialog("changeName", workspace)
                break
            case "changeMessage":
                openDialog("changeMessage", workspace)
                break
            case "updateVisibility":
                openDialog("updateVisibility", workspace)
                break
            case "deleteWorkspace":
                openDialog("deleteWorkspace", workspace)
                break
            default:
                break
        }
    }

    const handleNameUpdate = (name) => {
        onUpdateWorkspace(selectedWorkspace.id, { name })
        closeDialog()
    }

    const handleMessageUpdate = (message) => {
        onUpdateWorkspace(selectedWorkspace.id, { message })
        closeDialog()
    }

    const handleVisibilityUpdate = () => {
        const newVisibility = selectedWorkspace.visibility === "public" ? "private" : "public"
        onUpdateWorkspace(selectedWorkspace.id, { visibility: newVisibility })
        closeDialog()
    }

    const handleWorkspaceDelete = () => {
        onDeleteWorkspace(selectedWorkspace.id)
        closeDialog()
    }

    return (
        <div className="space-y-6">
            {/* Fixed Header */}
            <h2 className="text-2xl font-bold text-white">Workspaces</h2>

            {/* Scrollable Workspaces Grid */}
            <div className="space-y-6">
                {workspaces.map((workspace) => (
                    <div
                        key={workspace.id}
                        className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <h3 className="text-lg font-bold text-white">{workspace.name}</h3>
                                    <div className="flex items-center space-x-2">
                                        {workspace.visibility === "public" ? (
                                            <div className="flex items-center space-x-1 px-2 py-1 bg-green-900/30 border border-green-700 rounded-md">
                                                <Globe className="w-3 h-3 text-green-400" />
                                                <span className="text-xs text-green-400">Public</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center space-x-1 px-2 py-1 bg-gray-800 border border-gray-600 rounded-md">
                                                <Lock className="w-3 h-3 text-gray-400" />
                                                <span className="text-xs text-gray-400">Private</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                                    <span className="flex items-center gap-x-2">
                                        <HardDrive className="w-4 h-4 mb-0.5" />
                                        <span>{workspace.size}</span>
                                    </span>
                                    <span className="flex items-center gap-x-2">
                                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-purple-400 mb-0.5" />
                                        {workspace.pushed}
                                    </span>
                                </div>

                                <div className="bg-gray-800 border border-gray-600 rounded-md p-3 mb-4">
                                    <p className="text-sm text-gray-300 italic">"{workspace.message}"</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 ml-4 relative dropdown-container">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hover:bg-gray-800"
                                    onClick={() => setOpenDropdown(openDropdown === workspace.id ? null : workspace.id)}
                                >
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>

                                {/* Dropdown Menu */}
                                {openDropdown === workspace.id && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-lg shadow-black/50 z-50">
                                        <div className="py-2">
                                            <button
                                                onClick={() => handleDropdownAction("changeName", workspace)}
                                                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center space-x-2"
                                            >
                                                <Terminal className="w-4 h-4" />
                                                <span>Change Name</span>
                                            </button>
                                            <button
                                                onClick={() => handleDropdownAction("changeMessage", workspace)}
                                                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center space-x-2"
                                            >
                                                <Terminal className="w-4 h-4" />
                                                <span>Change Message</span>
                                            </button>
                                            <button
                                                onClick={() => handleDropdownAction("updateVisibility", workspace)}
                                                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center space-x-2"
                                            >
                                                {workspace.visibility === "public" ? (
                                                    <EyeOff className="w-4 h-4" />
                                                ) : (
                                                    <Eye className="w-4 h-4" />
                                                )}
                                                <span>Update Visibility</span>
                                            </button>
                                            <div className="border-t border-gray-600 my-1"></div>
                                            <button
                                                onClick={() => handleDropdownAction("deleteWorkspace", workspace)}
                                                className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors flex items-center space-x-2"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span>Delete Workspace</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <Button
                                variant="outline"
                                size="sm"
                                className="hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/20 transition-all duration-300"
                            >
                                Download
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="hover:border-green-400 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300"
                            >
                                Share
                            </Button>
                        </div>
                    </div>
                ))}

                {/* Create Workspace Modal Trigger */}
                <div className="bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-purple-400 hover:bg-gray-800/50 transition-all duration-300 cursor-pointer">
                    <div className="flex flex-col items-center space-y-3">
                        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                            <FolderOpen className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-1">Create New Workspace</h3>
                            <p className="text-gray-400 text-sm">Upload a new project or folder to get started</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dialog Modals */}
            {activeDialog === "changeName" && (
                <NameDialog workspace={selectedWorkspace} onClose={closeDialog} onSubmit={handleNameUpdate} />
            )}
            {activeDialog === "changeMessage" && (
                <MessageDialog workspace={selectedWorkspace} onClose={closeDialog} onSubmit={handleMessageUpdate} />
            )}
            {activeDialog === "updateVisibility" && (
                <VisibilityDialog workspace={selectedWorkspace} onClose={closeDialog} onConfirm={handleVisibilityUpdate} />
            )}
            {activeDialog === "deleteWorkspace" && (
                <DeleteDialog workspace={selectedWorkspace} onClose={closeDialog} onConfirm={handleWorkspaceDelete} />
            )}
        </div>
    )
}
