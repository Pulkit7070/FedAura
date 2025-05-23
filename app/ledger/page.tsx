"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Search, Filter, Database, BarChart2, List, Grid3X3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { generateThreatIntelligence, generateVulnerabilityDistributionData } from '@/lib/mock-data'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts'

export default function LedgerPage() {
  const [threatData, setThreatData] = useState<any[]>([])
  const [chartData, setChartData] = useState<any[]>([])
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  
  useEffect(() => {
    // Generate mock data
    const threats = generateThreatIntelligence(12)
    setThreatData(threats)
    
    // Chart data
    const vulnData = generateVulnerabilityDistributionData()
    setChartData(vulnData)
  }, [])
  
  const filteredThreats = threatData.filter(threat => 
    threat.vulnType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    threat.description.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Get severity distribution
  const severityDistribution = [
    { name: 'Critical', value: threatData.filter(t => t.severity === 'Critical').length },
    { name: 'High', value: threatData.filter(t => t.severity === 'High').length },
    { name: 'Medium', value: threatData.filter(t => t.severity === 'Medium').length },
    { name: 'Low', value: threatData.filter(t => t.severity === 'Low').length },
    { name: 'Informational', value: threatData.filter(t => t.severity === 'Informational').length },
  ].filter(item => item.value > 0)
  
  const COLORS = ['hsl(var(--destructive))', 'hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))']
  
  return (
    <div className="min-h-screen pt-20">
      <div className="container px-4 mx-auto py-12">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 neon-text">Threat Intelligence Ledger</h1>
          <p className="text-lg text-muted-foreground">
            Collaborative database of vulnerabilities and threats stored on BNB Greenfield
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="card-dark neon-glow lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Vulnerability Distribution</h2>
              <div className="text-sm text-muted-foreground flex items-center">
                <Database className="h-4 w-4 mr-1" />
                <span>BNB Greenfield Data</span>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData.slice(0, 8)}
                  margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '0.5rem',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {chartData.slice(0, 8).map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={`hsl(var(--chart-${(index % 5) + 1}))`} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="card-dark neon-glow">
            <h2 className="text-xl font-semibold mb-6">Severity Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {severityDistribution.map((entry, index) => (
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
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="card-dark neon-glow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Threat Intelligence Database</h2>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`p-2 ${viewMode === 'list' ? 'bg-primary/10' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary/10' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by vulnerability type, description..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
          
          {viewMode === 'list' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left pb-3 text-muted-foreground font-medium text-sm">Vulnerability Type</th>
                    <th className="text-left pb-3 text-muted-foreground font-medium text-sm">Description</th>
                    <th className="text-left pb-3 text-muted-foreground font-medium text-sm">Severity</th>
                    <th className="text-left pb-3 text-muted-foreground font-medium text-sm">Affected</th>
                    <th className="text-left pb-3 text-muted-foreground font-medium text-sm">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredThreats.map((threat) => (
                    <tr key={threat.id} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="py-3 text-sm font-medium">{threat.vulnType}</td>
                      <td className="py-3 text-sm">{threat.description}</td>
                      <td className="py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          threat.severity === 'Critical' ? 'bg-destructive/20 text-destructive' :
                          threat.severity === 'High' ? 'bg-red-500/20 text-red-500' :
                          threat.severity === 'Medium' ? 'bg-orange-500/20 text-orange-500' :
                          threat.severity === 'Low' ? 'bg-yellow-500/20 text-yellow-500' :
                          'bg-blue-500/20 text-blue-500'
                        }`}>
                          {threat.severity}
                        </span>
                      </td>
                      <td className="py-3 text-sm">{threat.affectedContracts} contracts</td>
                      <td className="py-3 text-sm text-muted-foreground">
                        {new Date(threat.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredThreats.map((threat) => (
                <motion.div 
                  key={threat.id}
                  className="border border-border rounded-md p-4 hover:border-primary/50 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-primary mr-2" />
                      <h3 className="font-medium text-sm">{threat.vulnType}</h3>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      threat.severity === 'Critical' ? 'bg-destructive/20 text-destructive' :
                      threat.severity === 'High' ? 'bg-red-500/20 text-red-500' :
                      threat.severity === 'Medium' ? 'bg-orange-500/20 text-orange-500' :
                      threat.severity === 'Low' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-blue-500/20 text-blue-500'
                    }`}>
                      {threat.severity}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{threat.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{threat.affectedContracts} contracts affected</span>
                    <span>{new Date(threat.timestamp).toLocaleDateString()}</span>
                  </div>
                  
                  {threat.exploitedInWild && (
                    <div className="mt-3 pt-3 border-t border-border/50 text-xs text-destructive">
                      Exploited in the wild
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Displaying {filteredThreats.length} of {threatData.length} threat intelligence entries
          </div>
        </div>
        
        <div className="mt-8 card-dark neon-glow p-6">
          <h2 className="text-xl font-semibold mb-4">Natural Language Query</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Query the threat intelligence database using natural language to find specific patterns or vulnerabilities.
          </p>
          
          <div className="mb-6">
            <Input 
              placeholder="e.g., 'Show me all reentrancy vulnerabilities affecting more than 10 contracts'"
              className="h-12"
            />
          </div>
          
          <div className="text-center">
            <Button variant="neon">
              <Search className="mr-2 h-4 w-4" />
              Search Knowledge Base
            </Button>
          </div>
          
          <div className="mt-6 text-sm text-muted-foreground">
            <p className="mb-2">Example queries:</p>
            <ul className="space-y-1 list-disc pl-5">
              <li>"Show recent critical vulnerabilities in DEX contracts"</li>
              <li>"Which vulnerabilities have been exploited in the wild?"</li>
              <li>"Compare flash loan attacks vs. reentrancy exploits"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}