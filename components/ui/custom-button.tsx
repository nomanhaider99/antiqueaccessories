type ButtonProps = {
  variant?: "primary" | "secondary"
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  className?: string
}

const Button = ({
  variant = "primary",
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) => {
  const baseStyles =
    "px-6 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary:
      "bg-black text-white hover:bg-gray-800 focus:ring-black",
    secondary:
      "border border-black text-black hover:bg-black hover:text-white focus:ring-black",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
