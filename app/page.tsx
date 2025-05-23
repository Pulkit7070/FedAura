"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield, FileSearch, Activity, ChevronDown } from 'lucide-react'
import { generateMockTransactions, generateVulnerabilityDistributionData } from '@/lib/mock-data'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [transactionData, setTransactionData] = useState<any[]>([])
  const [chartData, setChartData] = useState<any[]>([])
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      // Determine active section based on scroll position
      const sections = document.querySelectorAll('section')
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 300 && rect.bottom >= 300) {
          setActiveSection(index)
        }
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    
    // Generate mock data
    setTransactionData(generateMockTransactions(5))
    setChartData(generateVulnerabilityDistributionData())
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  }
  
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"
          style={{ 
            opacity: Math.max(0, 1 - scrollY / 500),
            transform: `scale(${1 + scrollY / 2000})` 
          }}
        />
        
        <motion.div 
          className="container px-4 mx-auto relative z-10 pt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 neon-text-intense"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              OASIS-FedDeFi
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl mb-6 text-foreground/90 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Next-Gen DeFi Security Powered by AI
            </motion.p>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              A unified Web3 security suite combining on-chain AI auditing and federated anomaly detection for unparalleled real-time exploit prevention and collaborative threat intelligence, without compromising privacy.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/audit">
                <Button variant="neon" size="lg" className="w-full sm:w-auto">
                  <FileSearch className="mr-2 h-5 w-5" />
                  Audit Contract
                </Button>
              </Link>
              <Link href="/monitor">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Activity className="mr-2 h-5 w-5" />
                  Monitor DeFi Activity
                </Button>
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
              })
            }}
          >
            <motion.span className="text-sm text-foreground/70 mb-2">Discover More</motion.span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            >
              <ChevronDown className="h-6 w-6 text-primary" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-background to-card">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={activeSection >= 1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 neon-text">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              OASIS-FedDeFi combines two powerful approaches to secure DeFi applications and protocols against exploits.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div 
              className="card-dark neon-glow"
              initial={{ opacity: 0, x: -20 }}
              animate={activeSection >= 1 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mr-4 p-3 bg-primary/10 rounded-full">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">On-Chain AI Audit System (OASIS)</h3>
                  <p className="text-muted-foreground">
                    Advanced AI models analyze smart contracts to detect vulnerabilities and potential exploits before deployment.
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3 pl-14 mb-4">
                <li className="text-sm text-foreground/80">
                  <span className="text-primary">●</span> Real-time vulnerability scanning
                </li>
                <li className="text-sm text-foreground/80">
                  <span className="text-primary">●</span> Proof-of-Audit consensus mechanism
                </li>
                <li className="text-sm text-foreground/80">
                  <span className="text-primary">●</span> AI-powered code analysis
                </li>
              </ul>
              
              <div className="mt-6 pl-14">
                <Link href="/audit">
                  <Button variant="link" className="text-primary p-0">
                    Learn more about OASIS →
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="card-dark neon-glow"
              initial={{ opacity: 0, x: 20 }}
              animate={activeSection >= 1 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mr-4 p-3 bg-primary/10 rounded-full">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Federated DeFi Anomaly Detection (FedDeFi)</h3>
                  <p className="text-muted-foreground">
                    Privacy-preserving federated learning to detect suspicious transactions and anomalies across protocols.
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3 pl-14 mb-4">
                <li className="text-sm text-foreground/80">
                  <span className="text-primary">●</span> Collaborative threat intelligence
                </li>
                <li className="text-sm text-foreground/80">
                  <span className="text-primary">●</span> Privacy-preserving analysis
                </li>
                <li className="text-sm text-foreground/80">
                  <span className="text-primary">●</span> Early detection of exploit patterns
                </li>
              </ul>
              
              <div className="mt-6 pl-14">
                <Link href="/monitor">
                  <Button variant="link" className="text-primary p-0">
                    Learn more about FedDeFi →
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Live Dashboard Preview */}
      <section className="py-20 bg-card">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={activeSection >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 neon-text">Real-Time DeFi Security</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Monitor transactions, detect anomalies, and prevent exploits before they happen.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              className="lg:col-span-2 card-dark neon-glow overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={activeSection >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-4">Latest Transactions</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left pb-3 text-muted-foreground font-medium">Protocol</th>
                      <th className="text-left pb-3 text-muted-foreground font-medium">Action</th>
                      <th className="text-left pb-3 text-muted-foreground font-medium">Amount</th>
                      <th className="text-left pb-3 text-muted-foreground font-medium">Risk Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionData.map((tx, index) => (
                      <tr 
                        key={tx.id} 
                        className={`border-b border-border/30 ${tx.isAnomalous ? 'bg-destructive/10' : ''}`}
                      >
                        <td className="py-3">{tx.protocol}</td>
                        <td className="py-3">{tx.actionType}</td>
                        <td className="py-3">
                          {tx.amount} {tx.tokenA}
                          {tx.tokenB && ` → ${tx.tokenB}`}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center">
                            <div 
                              className={`h-2 w-16 rounded-full overflow-hidden bg-muted`}
                            >
                              <div 
                                className={`h-full ${
                                  Number(tx.anomalyScore) > 70 ? 'bg-destructive' : 
                                  Number(tx.anomalyScore) > 40 ? 'bg-orange-500' : 
                                  'bg-green-500'
                                }`}
                                style={{ width: `${tx.anomalyScore}%` }}
                              />
                            </div>
                            <span className="ml-2 text-xs">{tx.anomalyScore}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 text-right">
                <Link href="/monitor">
                  <Button variant="link" className="text-primary p-0">
                    View all transactions →
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="card-dark neon-glow"
              initial={{ opacity: 0, y: 20 }}
              animate={activeSection >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4">Vulnerability Distribution</h3>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData.slice(0, 5)}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 10 }} 
                      tickFormatter={(value) => value.split(' ')[0]}
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '0.5rem',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {chartData.slice(0, 5).map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`hsl(var(--chart-${(index % 5) + 1}))`} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 text-right">
                <Link href="/ledger">
                  <Button variant="link" className="text-primary p-0">
                    View threat intelligence →
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* BNB Chain Integration */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={activeSection >= 3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 neon-text">BNB Chain Integration</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seamless integration with BNB Chain ecosystem for comprehensive security coverage.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={activeSection >= 3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card-dark neon-glow">
              <div className="flex items-center justify-center h-16 mb-4">
                <h3 className="text-xl font-semibold neon-text">BNB Smart Chain</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Deploy OASIS-audited smart contracts with confidence on BNB Smart Chain.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span>
                  <span>On-chain audit verification</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Proof-of-Audit consensus</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Secure contract deployment</span>
                </li>
              </ul>
            </div>
            
            <div className="card-dark neon-glow">
              <div className="flex items-center justify-center h-16 mb-4">
                <h3 className="text-xl font-semibold neon-text">opBNB</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Leverage optimistic rollups for faster, cheaper transactions without sacrificing security.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Low-latency anomaly detection</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Cost-effective security</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span>
                  <span>High-throughput monitoring</span>
                </li>
              </ul>
            </div>
            
            <div className="card-dark neon-glow">
              <div className="flex items-center justify-center h-16 mb-4">
                <h3 className="text-xl font-semibold neon-text">BNB Greenfield</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Store threat intelligence and federated learning models with decentralized privacy.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Decentralized threat database</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Privacy-preserving storage</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Collaborative intelligence sharing</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-t from-background to-card">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={activeSection >= 4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 neon-text-intense">
              Ready to Secure Your DeFi Project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join the next generation of DeFi security. Protect your protocols, assets, and users with AI-powered, privacy-preserving security solutions.
            </p>
            <Link href="/audit">
              <Button variant="neon" size="lg" className="animate-pulse">
                Get Started Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}