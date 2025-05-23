"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Activity, Search, Filter, RefreshCw, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend 
} from 'recharts'
import { generateMockTransactions, generateDailyAnomalyData } from '@/lib/mock-data'
import TransactionFeed from '@/components/monitor/transaction-feed'
import AnomalyDetails from '@/components/monitor/anomaly-details'

export default function MonitorPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [chartData, setChartData] = useState<any[]>([])
  const [pieData, setPieData] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [selectedTx, setSelectedTx] = useState<any>(null)
  const [showAnomalyDetails, setShowAnomalyDetails] = useState(false)
  
  useEffect(() => {
    // Generate initial mock data
    const mockTransactions = generateMockTransactions(20)
    setTransactions(mockTransactions)
    
    // Generate daily data for chart
    const dailyData = generateDailyAnomalyData(14)
    setChartData(dailyData)
    
    // Generate protocol distribution data
    const protocols = ['Uniswap', 'Aave', 'Compound', 'PancakeSwap', 'SushiSwap']
    const protocolData = protocols.map(name => ({
      name,
      value: Math.floor(Math.random() * 50) + 10
    }))
    setPieData(protocolData)
    
    // Set up periodic refresh
    const interval = setInterval(() => {
      handleRefresh()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [])
  
  const handleRefresh = () => {
    setRefreshing(true)
    
    setTimeout(() => {
      // Add new transactions to the top
      const newTransactions = generateMockTransactions(3)
      setTransactions(prev => [...newTransactions, ...prev].slice(0, 20))
      setRefreshing(false)
    }, 1000)
  }
  
  const handleTxSelect = (tx: any) => {
    setSelectedTx(tx)
    setShowAnomalyDetails(true)
  }
  
  const handleCloseDetails = () => {
    setShowAnomalyDetails(false)
  }
  
  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))']
  
  return (
    <div className="min-h-screen pt-20">
      <div className="container px-4 mx-auto py-12">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 neon-text">DeFi Anomaly Detection</h1>
          <p className="text-lg text-muted-foreground">
            Monitor DeFi transactions in real-time and detect suspicious activity using federated AI models.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="card-dark neon-glow lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Anomaly Dashboard</h2>
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Last 14 days</span>
              </div>
            </div>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorAnomalies" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => value.split('-').slice(1).join('/')}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
                    orientation="right"
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '0.5rem',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="anomalies" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1}
                    fill="url(#colorAnomalies)" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="transactions" 
                    stroke="hsl(var(--chart-3))" 
                    strokeDasharray="5 5" 
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex justify-between items-center text-sm text-muted-foreground mt-4">
              <div>
                <span className="inline-block w-3 h-3 bg-primary rounded-full mr-2"></span>
                Detected Anomalies
              </div>
              <div>
                <span className="inline-block w-3 h-3 border border-[hsl(var(--chart-3))] rounded-full mr-2"></span>
                Transaction Volume (scaled)
              </div>
            </div>
          </div>
          
          <div className="card-dark neon-glow">
            <h2 className="text-xl font-semibold mb-6">Protocol Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name }) => name}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '0.5rem',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center text-sm">
                  <span 
                    className="inline-block w-3 h-3 rounded-full mr-1"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></span>
                  <span className="text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card-dark neon-glow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Live Transaction Feed</h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="flex items-center gap-1"
                >
                  <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </Button>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search transactions..."
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </div>
              
              <TransactionFeed 
                transactions={transactions} 
                onTxSelect={handleTxSelect}
              />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="card-dark neon-glow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Security Insights</h2>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-destructive/10 rounded-md">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-destructive mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Flash Loan Attack Pattern Detected</h3>
                      <p className="text-sm text-muted-foreground">
                        Unusual flash loan activity observed across multiple protocols. Monitor for price manipulation.
                      </p>
                      <Button variant="link" className="text-primary p-0 h-auto text-sm mt-1">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-orange-500/10 rounded-md">
                  <div className="flex items-start">
                    <Activity className="h-5 w-5 text-orange-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Unusual Transaction Volume</h3>
                      <p className="text-sm text-muted-foreground">
                        Spike in transaction volume detected on PancakeSwap in the last hour.
                      </p>
                      <Button variant="link" className="text-primary p-0 h-auto text-sm mt-1">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-border pt-6">
                <h3 className="font-semibold mb-4">Privacy-Preserving Detection</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  OASIS-FedDeFi uses federated learning to detect anomalies without exposing sensitive transaction data.
                </p>
                
                <div className="flex items-center justify-between text-sm p-3 bg-muted/30 rounded-md">
                  <span>Federated Model Status:</span>
                  <span className="flex items-center text-green-500">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Active
                  </span>
                </div>
                
                <div className="mt-4 text-xs text-muted-foreground">
                  <p>
                    Last model update: {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Anomaly Details Modal */}
      {showAnomalyDetails && selectedTx && (
        <AnomalyDetails 
          transaction={selectedTx} 
          onClose={handleCloseDetails} 
        />
      )}
    </div>
  )
}