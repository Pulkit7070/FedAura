"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { FileUp, CheckCircle, AlertTriangle, X, Shield } from 'lucide-react'
import { generateMockAuditResults } from '@/lib/mock-data'
import AuditReport from '@/components/audit/audit-report'
import ProofOfAuditSection from '@/components/audit/proof-of-audit'
import ConsensusMechanism from '@/components/audit/consensus-mechanism'

export default function AuditPage() {
  const [code, setCode] = useState('')
  const [isAuditing, setIsAuditing] = useState(false)
  const [auditComplete, setAuditComplete] = useState(false)
  const [auditResults, setAuditResults] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('report')
  
  // Sample solidity code for demo
  const sampleCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableToken {
    mapping(address => uint256) public balances;
    
    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }
    
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        // Vulnerable: Should update balance before transfer
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        balances[msg.sender] -= amount;
    }
    
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}`
  
  const handleLoadSample = () => {
    setCode(sampleCode)
  }
  
  const handleAudit = () => {
    if (!code.trim()) return
    
    setIsAuditing(true)
    
    // Simulate audit process
    setTimeout(() => {
      const results = generateMockAuditResults()
      setAuditResults(results)
      setIsAuditing(false)
      setAuditComplete(true)
    }, 3000)
  }
  
  const handleReset = () => {
    setCode('')
    setAuditComplete(false)
    setAuditResults(null)
  }
  
  return (
    <div className="min-h-screen pt-20">
      <div className="container px-4 mx-auto py-12">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 neon-text">Smart Contract Audit</h1>
          <p className="text-lg text-muted-foreground">
            Analyze your smart contracts using AI to detect vulnerabilities and potential exploits before deployment.
          </p>
        </motion.div>
        
        {!auditComplete ? (
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="card-dark neon-glow mb-6">
              <h2 className="text-xl font-semibold mb-4">Submit Contract for Audit</h2>
              
              <div className="mb-4">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste your Solidity smart contract code here..."
                  className="font-mono text-sm h-80 resize-none bg-muted/30 border-border"
                />
              </div>
              
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLoadSample}
                    disabled={isAuditing}
                  >
                    Load Sample
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCode('')}
                    disabled={!code || isAuditing}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    variant="neon" 
                    onClick={handleAudit}
                    disabled={!code || isAuditing}
                  >
                    {isAuditing ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Auditing...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Start Audit
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>
                Or upload a Solidity file (.sol)
              </p>
              <div className="mt-4">
                <Button variant="outline" className="border-dashed">
                  <FileUp className="mr-2 h-4 w-4" />
                  Upload Contract File
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold neon-text">Audit Results</h2>
              <Button variant="outline" size="sm" onClick={handleReset}>
                New Audit
              </Button>
            </div>
            
            <div className="card-dark neon-glow mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center mr-3">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Vulnerabilities Detected</h3>
                    <p className="text-sm text-muted-foreground">
                      {auditResults?.vulnerabilitiesFound} issues found
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    Contract ID: <span className="text-foreground/80 font-mono">{auditResults?.contractId.substring(0, 10)}...</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Scan Time: <span className="text-foreground/80">{auditResults?.scanDuration}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex border-b border-border mb-6">
                <button
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${
                    activeTab === 'report' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setActiveTab('report')}
                >
                  Audit Report
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${
                    activeTab === 'proof' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setActiveTab('proof')}
                >
                  Proof-of-Audit
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${
                    activeTab === 'consensus' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setActiveTab('consensus')}
                >
                  Consensus
                </button>
              </div>
              
              <div>
                {activeTab === 'report' && (
                  <AuditReport results={auditResults} />
                )}
                
                {activeTab === 'proof' && (
                  <ProofOfAuditSection auditResults={auditResults} />
                )}
                
                {activeTab === 'consensus' && (
                  <ConsensusMechanism auditResults={auditResults} />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}