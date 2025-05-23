"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  
  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'tween',
        duration: 0.3,
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
      }
    }
  }
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/audit', label: 'Audit' },
    { href: '/monitor', label: 'Monitor' },
    { href: '/ledger', label: 'Ledger' },
    { href: '/about', label: 'About' },
  ]
  
  return (
    <>
      <button 
        onClick={toggleMenu}
        className="p-2 text-foreground/90 hover:text-primary transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={toggleMenu}
            />
            
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-64 bg-card border-l border-border z-50 p-6 flex flex-col"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={toggleMenu}
                  className="p-2 text-foreground/90 hover:text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <nav className="flex flex-col space-y-6">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default MobileMenu