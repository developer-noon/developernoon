import React from "react";

interface ButtonProps {
  variant?: "filled" | "outlined";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
  type?: "button" | "submit" | "reset";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "filled",
  children,
  onClick,
  disabled = false,
  fullWidth = false,
  size = "medium",
  className = "",
  type = "button",
  leftIcon,
  rightIcon,
  ...rest
}) => {
  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-5 py-2.5 text-base",
    large: "px-10 py-5 text-2xl",
  };

  const variantClasses = {
    filled: `
      bg-blue-600 
      hover:bg-blue-700 
      active:bg-blue-800
      text-white 
      border 
      border-blue-600
      shadow-sm
      hover:shadow-md
    `,
    outlined: `
      bg-transparent 
      hover:bg-blue-50 
      active:bg-blue-100
      text-blue-600 
      border-2 
      border-blue-600
      hover:border-blue-700
    `,
  };

  const baseClasses = `
    inline-flex
    items-center
    justify-center
    gap-2
    font-regular
    font-helvetica-now-display
    rounded-lg
    transition-all
    duration-200
    ease-in-out
    cursor-pointer
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    focus:ring-offset-2
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:transform hover:-translate-y-0.5"}
    ${className}
  `;

  return (
    <button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
};

export default Button;
