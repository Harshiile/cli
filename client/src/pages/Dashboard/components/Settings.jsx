import { Button } from "../../../components/ui/button"

export function Settings() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Settings</h2>

            <div className="grid gap-6">
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Account Settings</h3>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white">Default Visibility</p>
                            <p className="text-sm text-gray-400">Set default visibility for new pushes</p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300"
                        >
                            Public
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}
