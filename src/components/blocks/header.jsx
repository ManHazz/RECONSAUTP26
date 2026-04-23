import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const logo = "/logo/LogoRECONSAwhite.png";

export default function Navbar({ onScrollTo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [homeDropdown, setHomeDropdown] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll detection to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsOpen(false);
        setHomeDropdown(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id) => {
    if (location.pathname === "/") {
      onScrollTo(id);
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
    setIsOpen(false);
    setHomeDropdown(false);
  };

  // NEW: Dedicated handler for the Logo
  const handleLogoClick = (e) => {
    e.preventDefault(); // Prevents standard <a> tag reload
    if (location.pathname === "/") {
      // If already on home, just scroll smoothly to the very top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // If on another page, navigate cleanly to the home page
      navigate("/");
    }
    setIsOpen(false);
    setHomeDropdown(false);
  };

  const navLinks = [
    {
      name: "Home",
      dropdown: [
        { name: "About", href: "#about" },
        { name: "Speakers", href: "#speakers" },
        { name: "Venue", href: "#venue" },
        { name: "Booklet", href: "#booklet" },
      ],
    },
    { name: "Agenda", href: "/agenda" },
    { name: "Key Events", href: "/key-events" },
    { name: "Past Editions", href: "/past-editions" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-[#9f44db00] backdrop-blur-md text-white z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* 1. LEFT: Logo */}
        <div className="flex-1 flex justify-start">
          {/* UPDATED: Removed link.href and added handleLogoClick */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center cursor-pointer"
          >
            <img
              src={logo}
              alt="RECONSA Logo"
              className="h-10 md:h-12 lg:h-14 w-auto object-contain transition-all duration-300"
            />
          </a>
        </div>

        {/* 2. CENTER: Desktop Nav */}
        <div className="hidden md:flex flex-none gap-8 relative font-bold items-center">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.name} className="relative group">
                <button className="flex items-center gap-1 hover:text-[#562fe2] transition-colors">
                  {link.name}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown */}
                <div
                  className="
                    absolute left-1/2 -translate-x-1/2 mt-2 bg-[#ffffffcc] text-black backdrop-blur-md rounded-lg shadow-lg py-2 w-40 
                    opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible 
                    transition-all duration-200
                  "
                >
                  {link.dropdown.map((sub) => (
                    <button
                      key={sub.name}
                      onClick={() => scrollToSection(sub.href)}
                      className="block w-full text-center px-4 py-2 text-sm hover:text-[#5a38d4] transition-colors"
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button
                key={link.name}
                onClick={() => navigate(link.href)}
                className="hover:text-[#5a38d4] transition-colors"
              >
                {link.name}
              </button>
            ),
          )}
        </div>

        {/* 3. RIGHT: Contact Us Button & Mobile Toggle */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <button className="hidden md:flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full font-bold hover:bg-[#5a38d4] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
            <Phone className="w-4 h-4" />
            Contact Us
          </button>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-black/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#ffffffcc] text-black backdrop-blur-md px-6 py-6 space-y-6 shadow-xl border-t border-gray-200 font-bold">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.name}>
                <button
                  className="flex items-center gap-1 w-full text-left hover:text-[#5a38d4] transition-colors text-lg"
                  onClick={() => setHomeDropdown(!homeDropdown)}
                >
                  {link.name}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      homeDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {homeDropdown && (
                  <div className="pl-4 mt-3 space-y-3 border-l-2 border-[#5a38d4]">
                    {link.dropdown.map((sub) => (
                      <button
                        key={sub.name}
                        onClick={() => scrollToSection(sub.href)}
                        className="block w-full text-left text-base text-gray-700 hover:text-[#5a38d4] pl-2"
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={link.name}
                onClick={() => {
                  navigate(link.href);
                  setIsOpen(false);
                }}
                className="block w-full text-left hover:text-[#5a38d4] transition-colors text-lg"
              >
                {link.name}
              </button>
            ),
          )}

          <div className="pt-4 mt-4 border-t border-gray-300">
            <button className="w-full flex justify-center items-center gap-2 py-3 bg-black text-white rounded-lg font-bold hover:bg-[#5a38d4] transition-colors text-lg">
              <Phone className="w-5 h-5" />
              Contact Us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
