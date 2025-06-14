import { Link } from "react-router-dom"
import { Terminal } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-gray-800 py-8 bg-black">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <Terminal className="w-5 h-5 text-purple-400" />
                        <span className="font-bold font-mono">JOU</span>
                        <span className="text-gray-500 font-mono">© 2024</span>
                    </div>
                    <div className="flex space-x-6 text-gray-500 font-mono">
                        <Link href="/docs" className="hover:text-white transition-colors">
                            Documentation
                        </Link>
                        <Link href="/examples" className="hover:text-white transition-colors">
                            Examples
                        </Link>
                        <Link href="#" className="hover:text-white transition-colors">
                            GitHub
                        </Link>
                        <Link href="#" className="hover:text-white transition-colors">
                            Support
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
