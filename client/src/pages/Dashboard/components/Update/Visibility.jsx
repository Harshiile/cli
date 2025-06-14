
import { CheckCircle, X } from "lucide-react"
import { Button } from "../../../../components/ui/button"

export function VisibilityDialog({ workspace, onClose, onConfirm }) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-2xl mx-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Update Visibility</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0" />
                        <div>
                            <p className="text-white font-medium">Visibility Change</p>
                            <p className="text-sm text-gray-400">
                                Workspace "{workspace?.name}" will be changed from{" "}
                                <span
                                    className={`font-medium ${workspace?.visibility === "public" ? "text-green-400" : "text-gray-300"}`}
                                >
                                    {workspace?.visibility}
                                </span>{" "}
                                to{" "}
                                <span
                                    className={`font-medium ${workspace?.visibility === "private" ? "text-green-400" : "text-gray-300"}`}
                                >
                                    {workspace?.visibility === "public" ? "private" : "public"}
                                </span>
                            </p>
                        </div>
                    </div>

                    {workspace?.visibility === "public" && (
                        <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3">
                            <p className="text-sm text-yellow-400">
                                ⚠️ Making this workspace private will restrict access to only you.
                            </p>
                        </div>
                    )}

                    {workspace?.visibility === "private" && (
                        <div className="bg-green-900/20 border border-green-700 rounded-lg p-3">
                            <p className="text-sm text-green-400">
                                ✅ Making this workspace public will allow others to view and access it.
                            </p>
                        </div>
                    )}

                    <div className="flex space-x-3 pt-4">
                        <Button onClick={onConfirm} className="flex-1 bg-blue-600 hover:bg-blue-700">
                            Confirm Change
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
