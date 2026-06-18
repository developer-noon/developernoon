"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "UX Study", href: "/ux-study" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  // Handle scroll effect - FEATURE 1: Always visible with backdrop effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scroll effect - FEATURE 2: Hide on scroll down, show on scroll up (COMMENTED OUT)
  /* 
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header if near top of page
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down - hide header
        setIsVisible(false);
      } else {
        // Scrolling up - show header
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  */

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check auth status when pathname changes
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user has a valid session by checking a cookie or making a request
        const response = await fetch("/api/health", {
          credentials: "include",
        });
        // If health check passes and we're on a protected route, user is authenticated
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [pathname]);

  const getStartedLink = isAuthenticated ? "/dashboard" : "/auth/signup";

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md" : "bg-white"
      }`}
    >
      <div className="w-full px-4 md:px-6 lg:px-24 py-4 md:py-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-[28px] md:text-[38px] lg:text-[47px] font-product-sans-medium text-[#111] "
          >
            developernoon
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-sm bg-[#111] border-2 border-[#111] px-3 lg:px-4 py-2 lg:py-3 text-white text-base lg:text-2xl font-product-sans hover:scale-105 active:scale-95 transition-all hover:bg-white hover:text-[#111]"
              >
                {item.name}
              </Link>
            ))}

            {/* Get Started Button */}
            <Link
              href={getStartedLink}
              className="rounded-sm bg-blue-600 border-2 border-blue-600 px-3 lg:px-4 py-2 lg:py-3 text-white text-base lg:text-2xl font-product-sans-bold hover:scale-105 active:scale-95 transition-all hover:bg-white hover:text-blue-600"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#111] text-white hover:bg-blue-600 transition-all duration-300"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-lg bg-[#111] hover:bg-blue-600 transition-all duration-300 px-4 py-3 text-white text-lg font-product-sans text-center hover:scale-105 active:scale-95"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Get Started Button */}
            <Link
              href={getStartedLink}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 px-4 py-3 text-white text-lg font-product-sans-bold text-center hover:scale-105 active:scale-95 shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
