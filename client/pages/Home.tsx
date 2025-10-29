import React, { useEffect, useState } from 'react'
import { CaseGrid } from '../components/CaseGrid'
import type { CaseItem } from '../src/types'

export const Home: React.FC = () => {
  const [cases, setCases] = useState<CaseItem[]>([])

  useEffect(() => {
    fetch('/api/getcases')
      .then(r => r.json())
      .then(setCases)
      .catch(console.error)
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <div className='grid-text'>
        <h2>Available Cases</h2>
      </div>
      <CaseGrid cases={cases} />
    </div>
  )
}
