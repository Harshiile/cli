
import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "../../../../components/ui/button"


export function MessageDialog({ workspace, onClose, onSubmit }) {
    const [message, setMessage] = useState(workspace?.message || "")

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(message)
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-3xl mx-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Change Workspace Message</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Current Message:</label>
                        <div className="bg-gray-800 border border-gray-600 rounded p-3 mb-3">
                            <p className="text-sm text-gray-400 italic">"{workspace?.message}"</p>
                        </div>
                        <textarea
                            placeholder="Enter new workspace message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white font-mono placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none"
                            rows={3}
                            maxLength={200}
                            required
                            autoFocus
                        />
                        <p className="text-xs text-gray-500 mt-1">{message.length}/200 characters</p>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                            Update Message
                        </Button>
                        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
