import { Link, useLocation } from "react-router-dom"
import { Terminal, Menu, X } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"

export function Header() {
    const { pathname } = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/docs", label: "Docs" },
        { href: "/download", label: "Download" },
    ]

    return (
        <header className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Terminal className="w-6 h-6 text-purple-400" />
                    <span className="text-xl font-bold font-mono">JOU</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={`font-mono transition-colors ${pathname === item.href ? "text-purple-400" : "text-gray-300 hover:text-white"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="flex items-center space-x-3">
                        <Link to="/login">
                            <Button variant="ghost" size="sm">
                                Login
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button size="sm">Sign Up</Button>
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-800 bg-black">
                    <nav className="container mx-auto px-4 py-4 space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`block font-mono transition-colors ${pathname === item.href ? "text-purple-400" : "text-gray-300 hover:text-white"
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="flex flex-col space-y-2 pt-4 border-t border-gray-800">
                            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="ghost" size="sm" className="w-full">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                                <Button size="sm" className="w-full">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}
