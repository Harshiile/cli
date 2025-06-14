import { forwardRef } from "react"

const Input = forwardRef(({ className = "", label, error, ...props }, ref) => {
    const baseClasses =
        "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white font-mono placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"

    return (
        <div className="space-y-2">
            {label && <label className="block text-sm font-medium text-gray-300 font-mono">{label}</label>}
            <input ref={ref} className={`${baseClasses} ${error ? "border-red-500" : ""} ${className}`} {...props} />
            {error && <p className="text-sm text-red-400 font-mono">{error}</p>}
        </div>
    )
})

Input.displayName = "Input"

export { Input }
