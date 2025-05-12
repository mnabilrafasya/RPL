// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen((prev) => !prev);
  };

  // Tutup menu/dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbarInner">
        <div className="navbarLogo">
          <img
            src="/4-2-3-1 Logo.png"
            alt="Logo 4-2-3-1"
            className="logoImage"
          />
          <div className="navbarText">
            4-2-3-1
          </div>
        </div>

   

        <ul className="navbarMenu">
          <li>
            <Link to="/" className="navbarLink" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/matches" className="navbarLink" onClick={() => setIsOpen(false)}>
              Matches
            </Link>
          </li>
          <li>
            <Link to="/news" className="navbarLink" onClick={() => setIsOpen(false)}>
              Berita
            </Link>
          </li>
          <li>
            <Link to="/stats" className="navbarLink" onClick={() => setIsOpen(false)}>
              Statistik
            </Link>
            </li>
        </ul>
      </div>
    </nav>
  );
}
