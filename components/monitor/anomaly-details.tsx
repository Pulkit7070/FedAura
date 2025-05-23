"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, ArrowRight, AlarmClock, Server, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AnomalyDetailsProps {
  transaction: any
  onClose: () => void
}

const AnomalyDetails = ({ transaction, onClose }: AnomalyDetailsProps) => {
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }
  
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }
  
  // Generate a mock anomaly timeline
  const timeline = [
    {
      time: new Date(new Date(transaction.timestamp).getTime() - 120000).toISOString(),
      event: 'First unusual transaction detected',
      severity: 'low',
    },
    {
      time: new Date(new Date(transaction.timestamp).getTime() - 60000).toISOString(),
      event: 'Pattern matching previous exploit attempts',
      severity: 'medium',
    },
    {
      time: transaction.timestamp,
      event: 'High confidence anomaly detected',
      severity: 'high',
    },
  ]
  
  // Generate similar patterns
  const similarPatterns = [
    'Flash loan followed by multiple swaps',
    'Price manipulation attempt',
    'Sandwiching pattern',
  ]
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="relative bg-card border border-border rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="sticky top-0 bg-card border-b border-border z-10 flex justify-between items-center px-6 py-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-destructive mr-3" />
              <h2 className="text-xl font-semibold">Anomaly Details</h2>
            </div>
            <button 
              className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Transaction Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Protocol:</span>
                    <span className="font-medium">{transaction.protocol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Action:</span>
                    <span className="font-medium">{transaction.actionType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">
                      {transaction.amount} {transaction.tokenA}
                      {transaction.tokenB && <span> → {transaction.tokenB}</span>}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timestamp:</span>
                    <span className="font-medium">{formatTime(transaction.timestamp)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gas Used:</span>
                    <span className="font-medium">{transaction.gasUsed.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Anomaly Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Anomaly Score:</span>
                    <span className="font-semibold text-destructive">{transaction.anomalyScore}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Detection Method:</span>
                    <span className="font-medium">Federated AI</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reason:</span>
                    <span className="font-medium">{transaction.anomalyReason}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="font-medium">High</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Similar Events:</span>
                    <span className="font-medium">5 in last 24h</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Transaction Flow</h3>
              <div className="bg-muted/30 p-4 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <div className="font-mono">{formatAddress(transaction.from)}</div>
                    <div className="text-xs text-muted-foreground mt-1">Sender</div>
                  </div>
                  
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  
                  <div className="text-sm">
                    <div className="px-3 py-2 bg-primary/10 rounded-md border border-primary/20 font-mono">
                      {transaction.protocol}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 text-center">Protocol</div>
                  </div>
                  
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  
                  <div className="text-sm">
                    <div className="font-mono">{formatAddress(transaction.to)}</div>
                    <div className="text-xs text-muted-foreground mt-1">Recipient</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Anomaly Timeline</h3>
              <div className="relative border-l border-muted-foreground/30 pl-6 ml-3 space-y-6">
                {timeline.map((item, index) => (
                  <div key={index} className="relative">
                    <div className={`absolute -left-9 h-4 w-4 rounded-full ${
                      item.severity === 'high' ? 'bg-destructive' :
                      item.severity === 'medium' ? 'bg-orange-500' :
                      'bg-yellow-500'
                    }`}></div>
                    <div className="flex items-start">
                      <AlarmClock className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {formatTime(item.time)}
                        </p>
                        <p className="font-medium mt-1">{item.event}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Similar Patterns</h3>
                <ul className="space-y-3">
                  {similarPatterns.map((pattern, index) => (
                    <li key={index} className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-3"></span>
                      <span>{pattern}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Privacy Assurance</h3>
                <div className="p-4 border border-border rounded-md bg-muted/20">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm">
                        This analysis was performed using privacy-preserving federated learning. No raw transaction data was shared between nodes.
                      </p>
                      <div className="flex items-center mt-3 text-xs text-muted-foreground">
                        <Server className="h-4 w-4 mr-1" />
                        <span>Processed by FedDeFi v1.2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button variant="neon">
                Report False Positive
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AnomalyDetails