"use client"

import { motion } from 'framer-motion'
import { Shield, Activity, Lock, Database, ChevronRight, Brain, Code, NetworkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container px-4 mx-auto py-12">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 neon-text">About OASIS-FedDeFi</h1>
          <p className="text-lg text-muted-foreground">
            A next-generation security platform for DeFi applications and protocols
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-16">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">OASIS</h2>
            </div>
            
            <h3 className="text-xl font-semibold neon-text">On-Chain AI Audit System</h3>
            
            <p className="text-muted-foreground">
              OASIS is a cutting-edge smart contract auditing system powered by advanced AI models. 
              It analyzes contract code to detect vulnerabilities and potential exploits before deployment, 
              providing real-time security assessment with high accuracy.
            </p>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span>Real-time vulnerability scanning using transformer-based models trained on thousands of smart contracts</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span>Proof-of-Audit consensus mechanism for validator verification of AI findings</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span>On-chain certification and audit verification for transparent security guarantees</span>
              </li>
            </ul>
            
            <Link href="/audit">
              <Button variant="neon">
                Explore OASIS Audit
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">FedDeFi</h2>
            </div>
            
            <h3 className="text-xl font-semibold neon-text">Federated DeFi Anomaly Detection</h3>
            
            <p className="text-muted-foreground">
              FedDeFi is a privacy-preserving anomaly detection system that uses federated learning 
              to identify suspicious transactions and potential exploits across DeFi protocols in real-time, 
              without exposing sensitive user data.
            </p>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span>Collaborative threat intelligence through decentralized model training</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span>Real-time anomaly detection using LSTM and GNN models</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span>Privacy-preserving analysis with differential privacy and secure aggregation</span>
              </li>
            </ul>
            
            <Link href="/monitor">
              <Button variant="neon">
                Explore FedDeFi Monitor
              </Button>
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          className="card-dark neon-glow mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6">AI & ML Technologies</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 border border-border/50 rounded-md bg-card/50 hover:border-primary/50 transition-colors">
              <div className="flex items-center mb-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Brain className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold">Transformer Models</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Specialized transformer-based models trained on thousands of smart contracts to identify code patterns associated with vulnerabilities.
              </p>
            </div>
            
            <div className="p-4 border border-border/50 rounded-md bg-card/50 hover:border-primary/50 transition-colors">
              <div className="flex items-center mb-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <NetworkIcon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold">Graph Neural Networks</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                GNNs analyze transaction graphs to detect suspicious patterns and relationships between addresses that may indicate exploits.
              </p>
            </div>
            
            <div className="p-4 border border-border/50 rounded-md bg-card/50 hover:border-primary/50 transition-colors">
              <div className="flex items-center mb-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold">LSTM Networks</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Long Short-Term Memory networks monitor transaction sequences over time to identify temporal anomalies and exploit attempts.
              </p>
            </div>
            
            <div className="p-4 border border-border/50 rounded-md bg-card/50 hover:border-primary/50 transition-colors">
              <div className="flex items-center mb-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Lock className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold">Differential Privacy</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Ensures that individual transaction data cannot be reverse-engineered from the trained models, protecting user privacy.
              </p>
            </div>
            
            <div className="p-4 border border-border/50 rounded-md bg-card/50 hover:border-primary/50 transition-colors">
              <div className="flex items-center mb-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Code className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold">Zero-Knowledge Proofs</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                ZK proofs allow for verification of contract properties without revealing the underlying code or execution details.
              </p>
            </div>
            
            <div className="p-4 border border-border/50 rounded-md bg-card/50 hover:border-primary/50 transition-colors">
              <div className="flex items-center mb-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Database className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold">Homomorphic Encryption</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Enables computation on encrypted data, allowing model training and inference without decrypting sensitive information.
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6">BNB Chain Integration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-dark neon-glow p-6">
              <h3 className="text-xl font-semibold mb-4 neon-text">BNB Smart Chain</h3>
              <p className="text-muted-foreground mb-4">
                The primary blockchain for smart contract deployment and on-chain audit verification. 
                OASIS-audited contracts receive a Proof-of-Audit certificate stored on BNB Smart Chain.
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
                  <span>Validator staking and rewards</span>
                </li>
              </ul>
            </div>
            
            <div className="card-dark neon-glow p-6">
              <h3 className="text-xl font-semibold mb-4 neon-text">opBNB</h3>
              <p className="text-muted-foreground mb-4">
                Optimistic rollup layer for high-performance, low-latency transaction monitoring 
                and real-time anomaly detection, enabling cost-effective security at scale.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Low-latency anomaly detection</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Cost-effective security monitoring</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Scalable transaction processing</span>
                </li>
              </ul>
            </div>
            
            <div className="card-dark neon-glow p-6">
              <h3 className="text-xl font-semibold mb-4 neon-text">BNB Greenfield</h3>
              <p className="text-muted-foreground mb-4">
                Decentralized storage for the threat intelligence ledger and federated learning models, 
                ensuring privacy-preserving collaboration across the DeFi ecosystem.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Decentralized threat database</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Encrypted model storage</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Private data sharing</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4 neon-text">Ready to secure your DeFi project?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the next generation of DeFi security. Protect your protocols, assets, and users with OASIS-FedDeFi.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/audit">
              <Button variant="neon" size="lg">
                <Shield className="mr-2 h-5 w-5" />
                Audit Smart Contracts
              </Button>
            </Link>
            <Link href="/monitor">
              <Button variant="outline" size="lg">
                <Activity className="mr-2 h-5 w-5" />
                Monitor DeFi Activity
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}