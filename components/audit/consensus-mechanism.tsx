"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Users, TrendingUp, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ConsensusMechanismProps {
  auditResults: any
}

const ConsensusMechanism = ({ auditResults }: ConsensusMechanismProps) => {
  const [validators, setValidators] = useState<any[]>([])
  const [staked, setStaked] = useState(false)
  const [totalStaked, setTotalStaked] = useState(0)
  const [userReward, setUserReward] = useState(0)
  const [userReputation, setUserReputation] = useState(25)
  
  useEffect(() => {
    // Generate mock validators
    const mockValidators = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      staked: Math.floor(Math.random() * 1000) + 100,
      reputation: Math.floor(Math.random() * 95) + 5,
    }))
    
    setValidators(mockValidators)
    setTotalStaked(mockValidators.reduce((acc, val) => acc + val.staked, 0))
  }, [])
  
  const handleStake = () => {
    // Simulate staking
    const stakeAmount = 150
    setStaked(true)
    setTotalStaked(prev => prev + stakeAmount)
    setUserReward(15)
    
    // Simulate reputation increase
    const interval = setInterval(() => {
      setUserReputation(prev => {
        if (prev >= 75) {
          clearInterval(interval)
          return 75
        }
        return prev + 1
      })
    }, 50)
  }
  
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Proof-of-Audit Consensus</h3>
        <p className="text-sm text-muted-foreground">
          Validators stake tokens to verify AI-detected vulnerabilities and earn rewards
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 border border-border rounded-md bg-card/50 flex flex-col items-center">
          <Shield className="h-8 w-8 text-primary mb-2" />
          <h4 className="font-semibold mb-1">Total Vulnerabilities</h4>
          <p className="text-2xl font-bold">{auditResults?.vulnerabilities.length || 0}</p>
          <p className="text-xs text-muted-foreground">Detected by AI</p>
        </div>
        
        <div className="p-4 border border-border rounded-md bg-card/50 flex flex-col items-center">
          <Users className="h-8 w-8 text-primary mb-2" />
          <h4 className="font-semibold mb-1">Active Validators</h4>
          <p className="text-2xl font-bold">{validators.length + (staked ? 1 : 0)}</p>
          <p className="text-xs text-muted-foreground">Participating in consensus</p>
        </div>
        
        <div className="p-4 border border-border rounded-md bg-card/50 flex flex-col items-center">
          <TrendingUp className="h-8 w-8 text-primary mb-2" />
          <h4 className="font-semibold mb-1">Total Staked</h4>
          <p className="text-2xl font-bold">{totalStaked.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">OASIS tokens</p>
        </div>
      </div>
      
      <div className="border border-border rounded-md p-6 bg-card/50 mb-8">
        <h4 className="text-lg font-semibold mb-4">Stake to Validate</h4>
        
        <p className="text-sm text-muted-foreground mb-6">
          Stake OASIS tokens to participate in the Proof-of-Audit consensus and verify the AI's findings. Earn rewards and build reputation.
        </p>
        
        {!staked ? (
          <div className="flex justify-center">
            <Button variant="neon" onClick={handleStake}>Stake 150 OASIS Tokens</Button>
          </div>
        ) : (
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-semibold">Successfully Staked!</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Your Reward</p>
                <p className="text-2xl font-bold">{userReward} OASIS</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Reputation</p>
                <p className="text-2xl font-bold">{userReputation}</p>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              Thank you for contributing to the security of the ecosystem!
            </p>
          </motion.div>
        )}
      </div>
      
      <div>
        <h4 className="text-lg font-semibold mb-4">Top Validators</h4>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left pb-3 text-muted-foreground font-medium text-sm">Rank</th>
                <th className="text-left pb-3 text-muted-foreground font-medium text-sm">Validator</th>
                <th className="text-right pb-3 text-muted-foreground font-medium text-sm">Staked</th>
                <th className="text-right pb-3 text-muted-foreground font-medium text-sm">Reputation</th>
              </tr>
            </thead>
            <tbody>
              {validators.map((validator, index) => (
                <tr key={validator.id} className="border-b border-border/50">
                  <td className="py-3 text-sm">{index + 1}</td>
                  <td className="py-3 text-sm font-mono">{validator.address.substring(0, 8)}...{validator.address.slice(-6)}</td>
                  <td className="py-3 text-sm text-right">{validator.staked.toLocaleString()}</td>
                  <td className="py-3 text-sm text-right">{validator.reputation}</td>
                </tr>
              ))}
              
              {staked && (
                <motion.tr 
                  className="border-b border-border/50"
                  initial={{ opacity: 0, backgroundColor: "rgba(var(--primary-rgb), 0.2)" }}
                  animate={{ opacity: 1, backgroundColor: "rgba(0, 0, 0, 0)" }}
                  transition={{ duration: 1.5 }}
                >
                  <td className="py-3 text-sm">{validators.length + 1}</td>
                  <td className="py-3 text-sm font-mono">You (0x8f71...4e2a)</td>
                  <td className="py-3 text-sm text-right">150</td>
                  <td className="py-3 text-sm text-right">{userReputation}</td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ConsensusMechanism