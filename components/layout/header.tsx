"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ShieldAlert } from 'lucide-react'
import ConnectWalletButton from '@/components/web3/connect-wallet-button'
import MobileMenu from '@/components/layout/mobile-menu'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50' 
          : 'bg-transparent'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <ShieldAlert className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold neon-text">OASIS-FedDeFi</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/audit" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Audit
            </Link>
            <Link href="/monitor" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Monitor
            </Link>
            <Link href="/ledger" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Ledger
            </Link>
            <Link href="/about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              About
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <ConnectWalletButton />
            <Link href="/audit">
              <Button className="hidden sm:inline-flex btn-neon" size="sm">
                Get Started
              </Button>
            </Link>
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header