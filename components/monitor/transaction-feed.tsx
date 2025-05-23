"use client"

import { motion } from 'framer-motion'
import { AlertCircle, ArrowRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TransactionFeedProps {
  transactions: any[]
  onTxSelect: (tx: any) => void
}

const TransactionFeed = ({ transactions, onTxSelect }: TransactionFeedProps) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
  }
  
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }
  
  return (
    <div className="space-y-3">
      {transactions.map((tx, index) => (
        <motion.div
          key={tx.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={`p-4 rounded-md border ${
            tx.isAnomalous 
              ? 'bg-destructive/10 border-destructive/20' 
              : 'bg-card/50 border-border/50'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-start">
                {tx.isAnomalous && (
                  <div className="mr-2 mt-0.5">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  </div>
                )}
                <div>
                  <div className="font-medium flex items-center">
                    <span>{tx.protocol}</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span>{tx.actionType}</span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mt-1 flex items-center">
                    <span>{formatAddress(tx.from)}</span>
                    <ArrowRight className="h-3 w-3 mx-1" />
                    <span>{formatAddress(tx.to)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-medium">
                {tx.amount} {tx.tokenA}
                {tx.tokenB && <span> → {tx.tokenB}</span>}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {formatTime(tx.timestamp)}
              </div>
            </div>
          </div>
          
          {tx.isAnomalous && (
            <div className="mt-3 border-t border-destructive/20 pt-3">
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-destructive font-medium">Anomaly Score: {tx.anomalyScore}</span>
                  <span className="text-muted-foreground ml-2 text-xs">
                    {tx.anomalyReason}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 text-xs"
                    onClick={() => onTxSelect(tx)}
                  >
                    Details
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default TransactionFeed