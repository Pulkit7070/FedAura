// Mock data for the OASIS-FedDeFi platform

// Smart Contract Vulnerabilities
export const vulnerabilityTypes = [
  'Reentrancy',
  'Integer Overflow/Underflow',
  'Access Control',
  'Front-Running',
  'Oracle Manipulation',
  'Flash Loan Attack',
  'Logic Error',
  'Unchecked Return Value',
  'Gas Limitation',
  'Denial of Service',
]

export const severityLevels = [
  { level: 'Critical', color: 'text-destructive' },
  { level: 'High', color: 'text-red-500' },
  { level: 'Medium', color: 'text-orange-500' },
  { level: 'Low', color: 'text-yellow-500' },
  { level: 'Informational', color: 'text-blue-500' },
]

// Sample audit results
export const generateMockAuditResults = () => {
  const numVulnerabilities = Math.floor(Math.random() * 5) + 1
  const vulnerabilities = []
  
  for (let i = 0; i < numVulnerabilities; i++) {
    const vulnType = vulnerabilityTypes[Math.floor(Math.random() * vulnerabilityTypes.length)]
    const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)]
    const lineNumber = Math.floor(Math.random() * 500) + 1
    
    vulnerabilities.push({
      id: `VULN-${Date.now()}-${i}`,
      type: vulnType,
      severity: severity.level,
      severityColor: severity.color,
      lineNumber,
      description: `Potential ${vulnType} vulnerability detected in smart contract at line ${lineNumber}.`,
      recommendation: `Consider implementing proper checks to prevent ${vulnType.toLowerCase()} attacks.`,
      codeSnippet: `function transfer(address to, uint256 amount) public {
    // Vulnerable code here
    balances[msg.sender] -= amount;
    balances[to] += amount;
}`,
    })
  }
  
  return {
    contractId: `0x${Math.random().toString(16).substr(2, 40)}`,
    timestamp: new Date().toISOString(),
    scanDuration: `${(Math.random() * 10 + 1).toFixed(2)}s`,
    vulnerabilitiesFound: vulnerabilities.length,
    vulnerabilities,
    riskScore: Math.floor(Math.random() * 100),
    auditHash: `0x${Math.random().toString(16).substr(2, 64)}`,
  }
}

// Mock DeFi transactions for monitoring
export const generateMockTransactions = (count = 10) => {
  const transactions = []
  const protocols = ['Uniswap', 'Aave', 'Compound', 'PancakeSwap', 'SushiSwap', 'Curve']
  const actionTypes = ['Swap', 'Borrow', 'Lend', 'Add Liquidity', 'Remove Liquidity', 'Flash Loan']
  
  for (let i = 0; i < count; i++) {
    const protocol = protocols[Math.floor(Math.random() * protocols.length)]
    const actionType = actionTypes[Math.floor(Math.random() * actionTypes.length)]
    const amount = (Math.random() * 1000 + 0.1).toFixed(2)
    const tokenA = ['ETH', 'BNB', 'USDT', 'USDC', 'DAI'][Math.floor(Math.random() * 5)]
    const tokenB = ['ETH', 'BNB', 'USDT', 'USDC', 'DAI'][Math.floor(Math.random() * 5)]
    
    // 15% chance of being anomalous
    const isAnomalous = Math.random() < 0.15
    
    transactions.push({
      id: `TX-${Date.now()}-${i}`,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString(),
      protocol,
      actionType,
      from: `0x${Math.random().toString(16).substr(2, 40)}`,
      to: `0x${Math.random().toString(16).substr(2, 40)}`,
      amount,
      tokenA,
      tokenB: actionType === 'Swap' ? tokenB : null,
      gasUsed: Math.floor(Math.random() * 1000000) + 21000,
      isAnomalous,
      anomalyScore: isAnomalous ? (Math.random() * 50 + 50).toFixed(1) : (Math.random() * 30).toFixed(1),
      anomalyReason: isAnomalous ? 
        ['Unusual transaction value', 'Suspicious contract interaction', 'Known attack pattern', 'Price manipulation attempt'][Math.floor(Math.random() * 4)] 
        : null,
    })
  }
  
  return transactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

// Mock threat intelligence data
export const generateThreatIntelligence = (count = 20) => {
  const entries = []
  
  for (let i = 0; i < count; i++) {
    const vulnType = vulnerabilityTypes[Math.floor(Math.random() * vulnerabilityTypes.length)]
    const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)]
    const timestamp = new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 3600000)).toISOString()
    
    entries.push({
      id: `THREAT-${Date.now()}-${i}`,
      timestamp,
      vulnType,
      severity: severity.level,
      severityColor: severity.color,
      description: `${vulnType} vulnerability identified across multiple contracts`,
      affectedContracts: Math.floor(Math.random() * 50) + 1,
      reportedBy: Math.floor(Math.random() * 10) + 1,
      exploitedInWild: Math.random() > 0.7,
      mitigationAvailable: Math.random() > 0.3,
      associatedAddresses: Array(Math.floor(Math.random() * 3) + 1).fill(0).map(() => 
        `0x${Math.random().toString(16).substr(2, 40)}`
      ),
    })
  }
  
  return entries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

// Chart data generators
export const generateVulnerabilityDistributionData = () => {
  return vulnerabilityTypes.map(type => ({
    name: type,
    value: Math.floor(Math.random() * 100) + 1,
  }))
}

export const generateDailyAnomalyData = (days = 30) => {
  const data = []
  const now = new Date()
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      anomalies: Math.floor(Math.random() * 10),
      transactions: Math.floor(Math.random() * 100) + 50,
    })
  }
  
  return data
}