import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OpenCaseButton } from '../components/OpenCaseButton';
import type { CaseItem } from '../src/types';

export const CasePage: React.FC = () => {
  const { id } = useParams();
  const [caseData, setCaseData] = useState<CaseItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/GetCaseById?id=${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch case data');
        return res.json();
      })
      .then(data => {
        setCaseData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!caseData) return <div>Case not found</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{caseData.name}</h1>
      <div style={{ display: 'flex', gap: '1rem', margin: '2rem' }}>
        {/* {caseData.items.map((item, idx) => (
          <div key={idx} className="card" style={{ width: 150 }}>
            <img src={item.image} alt={item.title} style={{ width: '100%', borderRadius: 10 }} />
            <p>{item.title}</p>
          </div>
        ))} */}
      </div>
      <OpenCaseButton caseId={caseData.id} />
    </div>
  );
};
