import { forwardRef } from "react"

const Button = forwardRef(
    ({ className = "", variant = "default", size = "md", children, ...props }, ref) => {
        const baseClasses =
            "inline-flex items-center justify-center font-mono font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"

        const variants = {
            default: "bg-white text-black hover:bg-gray-300",
            outline: "border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black",
            ghost: "text-gray-300 hover:text-white hover:bg-gray-800",
        }

        const sizes = {
            sm: "px-4 py-2 text-sm rounded-md",
            md: "px-6 py-2 text-base rounded-md",
            lg: "px-8 py-3 text-lg rounded-lg",
        }

        const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

        return (
            <button ref={ref} className={classes} {...props}>
                {children}
            </button>
        )
    },
)

Button.displayName = "Button"

export { Button }
