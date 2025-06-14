import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"

export function NameDialog({ workspace, onClose, onSubmit }) {
    const [name, setName] = useState(workspace?.name || "")

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(name)
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-xl mx-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Change Workspace Name</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Current Name: <span className="text-purple-400">{workspace?.name}</span>
                        </label>
                        <Input
                            type="text"
                            placeholder="Enter new workspace name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                            Update Name
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
