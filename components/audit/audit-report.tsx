"use client"

import { motion } from 'framer-motion'
import { AlertTriangle, Info, CheckCircle } from 'lucide-react'

interface AuditReportProps {
  results: any
}

const AuditReport = ({ results }: AuditReportProps) => {
  if (!results) return null
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  }
  
  // Calculate risk level
  const getRiskLevel = (score: number) => {
    if (score < 20) return { text: 'Low Risk', color: 'text-green-500' }
    if (score < 50) return { text: 'Medium Risk', color: 'text-yellow-500' }
    if (score < 75) return { text: 'High Risk', color: 'text-orange-500' }
    return { text: 'Critical Risk', color: 'text-destructive' }
  }
  
  const riskLevel = getRiskLevel(results.riskScore)
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Vulnerability Report</h3>
          <p className="text-sm text-muted-foreground">
            AI-generated analysis of potential security issues
          </p>
        </div>
        
        <div className="flex items-center">
          <div className="mr-2">Risk Level:</div>
          <div className={`font-semibold ${riskLevel.color}`}>
            {riskLevel.text}
          </div>
        </div>
      </div>
      
      {results.vulnerabilities.length === 0 ? (
        <div className="flex items-center p-4 bg-green-500/10 rounded-md">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
          <span>No vulnerabilities detected. The contract appears secure.</span>
        </div>
      ) : (
        <motion.div 
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {results.vulnerabilities.map((vuln: any) => (
            <motion.div 
              key={vuln.id}
              className="p-4 border border-border rounded-md bg-card/50"
              variants={item}
            >
              <div className="flex items-start">
                <div className="mt-0.5">
                  <AlertTriangle className={`h-5 w-5 mr-3 ${
                    vuln.severity === 'Critical' || vuln.severity === 'High' 
                      ? 'text-destructive' 
                      : vuln.severity === 'Medium' 
                      ? 'text-orange-500' 
                      : 'text-yellow-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{vuln.type}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      vuln.severity === 'Critical' ? 'bg-destructive/20 text-destructive' :
                      vuln.severity === 'High' ? 'bg-red-500/20 text-red-500' :
                      vuln.severity === 'Medium' ? 'bg-orange-500/20 text-orange-500' :
                      'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {vuln.severity}
                    </span>
                  </div>
                  
                  <p className="text-sm mb-3">{vuln.description}</p>
                  
                  {vuln.codeSnippet && (
                    <div className="mb-3">
                      <div className="text-xs text-muted-foreground mb-1">Vulnerable Code:</div>
                      <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                        <code>{vuln.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    <Info className="h-4 w-4 text-primary mr-2 mt-0.5" />
                    <p className="text-xs text-muted-foreground">{vuln.recommendation}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default AuditReport