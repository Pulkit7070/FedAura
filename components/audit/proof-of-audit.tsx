"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy, FileText, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProofOfAuditProps {
  auditResults: any
}

const ProofOfAuditSection = ({ auditResults }: ProofOfAuditProps) => {
  const [copied, setCopied] = useState(false)
  
  if (!auditResults) return null
  
  const handleCopy = () => {
    navigator.clipboard.writeText(auditResults.auditHash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  // Animation for the federated learning progress
  const [progress, setProgress] = useState(0)
  
  const startProgress = () => {
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      setProgress(currentProgress)
      
      if (currentProgress >= 100) {
        clearInterval(interval)
      }
    }, 150)
  }
  
  // Start progress animation when component mounts
  useState(() => {
    startProgress()
  })
  
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Proof-of-Audit Certificate</h3>
        <p className="text-sm text-muted-foreground">
          Cryptographic proof that this contract has been audited using OASIS AI models
        </p>
      </div>
      
      <div className="border border-border rounded-md p-6 mb-8 bg-card/50">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <FileText className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <div className="text-center mb-6">
          <h4 className="text-xl font-semibold mb-1 neon-text">OASIS Audit Certificate</h4>
          <p className="text-sm text-muted-foreground">
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-border/50 rounded-md bg-background/50">
            <div className="text-sm">
              <span className="text-muted-foreground">Contract ID:</span>
            </div>
            <div className="font-mono text-sm">{auditResults.contractId}</div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-border/50 rounded-md bg-background/50">
            <div className="text-sm">
              <span className="text-muted-foreground">Audit Hash:</span>
            </div>
            <div className="font-mono text-sm flex items-center">
              <span className="truncate max-w-[200px] sm:max-w-full">{auditResults.auditHash}</span>
              <button 
                className="ml-2 text-muted-foreground hover:text-foreground"
                onClick={handleCopy}
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-border/50 rounded-md bg-background/50">
            <div className="text-sm">
              <span className="text-muted-foreground">Risk Score:</span>
            </div>
            <div className="font-semibold">
              <span className={`
                ${auditResults.riskScore < 20 ? 'text-green-500' : 
                  auditResults.riskScore < 50 ? 'text-yellow-500' : 
                  auditResults.riskScore < 75 ? 'text-orange-500' : 
                  'text-destructive'}
              `}>
                {auditResults.riskScore}/100
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button variant="neon" size="sm">
            Verify On-Chain
          </Button>
        </div>
      </div>
      
      <div className="border border-border rounded-md p-6 bg-card/50">
        <h4 className="text-lg font-semibold mb-4">Federated Learning Status</h4>
        
        <p className="text-sm text-muted-foreground mb-6">
          OASIS uses federated learning to improve vulnerability detection without sharing sensitive contract code.
        </p>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Learning from multiple data sources</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
            <span>Privacy-preserving model training</span>
          </div>
          
          <ArrowRight className="hidden sm:block h-4 w-4 text-muted-foreground mx-4" />
          
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
            <span>Model improvement</span>
          </div>
          
          <ArrowRight className="hidden sm:block h-4 w-4 text-muted-foreground mx-4" />
          
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
            <span>Better vulnerability detection</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProofOfAuditSection