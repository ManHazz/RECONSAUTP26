import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

export default function Navbar({ onScrollTo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [homeDropdown, setHomeDropdown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname === "/") {
      // Already on home → smooth scroll
      onScrollTo(id);
    } else {
      // Navigate home and tell App which section to scroll
      navigate("/", { state: { scrollTo: id } });
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
    <nav className="fixed top-0 left-0 w-full bg-[#ffffff99] backdrop-blur-md text-black z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-black">
          RECONSA26
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 relative font-bold">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.name} className="relative group">
                <button className="flex items-center gap-1 hover:text-[#5a38d4] transition-colors">
                  {link.name}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown */}
                <div
                  className="
                    absolute left-0 mt-2 bg-[#ffffff99] backdrop-blur-md rounded-lg shadow-lg py-2 w-40 
                    opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible 
                    transition-all duration-200
                  "
                >
                  {link.dropdown.map((sub) => (
                    <button
                      key={sub.name}
                      onClick={() => scrollToSection(sub.href)}
                      className="block w-full text-left px-4 py-2 text-sm hover:text-[#5a38d4] transition-colors"
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#5a38d4] transition-colors"
              >
                {link.name}
              </a>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#ffffff99] backdrop-blur-md px-6 py-4 space-y-4">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.name}>
                <button
                  className="flex items-center gap-1 w-full text-left hover:text-[#5a38d4] transition-colors"
                  onClick={() => setHomeDropdown(!homeDropdown)}
                >
                  {link.name}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      homeDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {homeDropdown && (
                  <div className="pl-4 mt-2 space-y-2">
                    {link.dropdown.map((sub) => (
                      <button
                        key={sub.name}
                        onClick={() => scrollToSection(sub.href)}
                        className="block w-full text-left text-sm hover:text-[#5a38d4]"
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
                onClick={() => navigate(link.href)}
                className="block w-full text-left hover:text-[#5a38d4] transition-colors"
              >
                {link.name}
              </button>
            )
          )}
        </div>
      )}
    </nav>
  );
}
