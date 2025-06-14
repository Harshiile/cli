import { AlertTriangle, X } from "lucide-react"
import { Button } from "../../../../components/ui/button"

export function DeleteDialog({ workspace, onClose, onConfirm }) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-2xl mx-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Delete Workspace</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-red-900/20 border border-red-700 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
                        <div>
                            <p className="text-white font-medium">Permanent Deletion</p>
                            <p className="text-sm text-gray-400">
                                This action cannot be undone. You will no longer have access to this workspace.
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-2">Workspace Details:</h4>
                        <div className="space-y-1 text-sm text-gray-400">
                            <p>
                                <span className="text-gray-300">Name:</span> {workspace?.name}
                            </p>
                            <p>
                                <span className="text-gray-300">Size:</span> {workspace?.size}
                            </p>
                            <p>
                                <span className="text-gray-300">Projects:</span> {workspace?.projects}
                            </p>
                            <p>
                                <span className="text-gray-300">Last Updated:</span> {workspace?.lastUpdated}
                            </p>
                        </div>
                    </div>

                    <div className="bg-red-900/10 border border-red-800 rounded-lg p-3">
                        <p className="text-sm text-red-400">
                            ⚠️ After deletion, you will no longer be able to access this workspace or any of its contents.
                        </p>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <Button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700">
                            Delete Workspace
                        </Button>
                        <Button variant="outline" onClick={onClose} className="flex-1">
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
