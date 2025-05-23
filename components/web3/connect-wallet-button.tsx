"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ConnectWalletButton = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [address, setAddress] = useState('')
  
  const handleConnect = async () => {
    if (isConnected) {
      // Disconnect wallet
      setIsConnected(false)
      setAddress('')
      return
    }
    
    // Simulate connection process
    setIsConnecting(true)
    
    setTimeout(() => {
      // Generate random wallet address
      const mockAddress = '0x' + Array(40).fill(0).map(() => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('')
      
      setAddress(mockAddress)
      setIsConnected(true)
      setIsConnecting(false)
    }, 1500)
  }
  
  const formatAddress = (addr: string) => {
    if (!addr) return ''
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }
  
  return (
    <div className="relative">
      <Button
        variant="neon"
        size="sm"
        className="flex items-center gap-2"
        onClick={handleConnect}
        disabled={isConnecting}
      >
        <Wallet className="h-4 w-4" />
        <AnimatePresence mode="wait">
          <motion.span
            key={isConnected ? 'connected' : 'connect'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isConnecting ? 'Connecting...' : 
             isConnected ? formatAddress(address) : 'Connect Wallet'}
          </motion.span>
        </AnimatePresence>
      </Button>
    </div>
  )
}

export default ConnectWalletButton