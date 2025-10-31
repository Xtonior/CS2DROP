import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OpenCaseButton } from '../components/OpenCaseButton';
import type { CaseItem, SkinItem } from '../src/types';

export const CasePage: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [allSkins, setAllSkins] = useState<SkinItem[]>([]);
  const [caseData, setCaseData] = useState<CaseItem>({
    id: 0,
    name: '',
    price: 0,
    imagePath: '',
    skinIds: []
  })

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
    fetch('/api/getskins')
      .then(r => r.json())
      .then(setAllSkins)
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!caseData) return <div>Case not found</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{caseData.name}</h1>
      <div style={{ display: 'flex', gap: '1rem', margin: '2rem' }}>
        {caseData.skinIds?.map((id, idx) => {
          const skin = allSkins.find(s => s.id.toString() === id);
          if (!skin) return null;
          return (
            <div key={idx} className="card" style={{ width: 150 }}>
              <img src={skin.imagePath} alt={skin.name} style={{ width: '100%', borderRadius: 10 }} />
              <p>{skin.name}</p>
            </div>
          );
        })}
      </div>
      <OpenCaseButton caseId={caseData.id.toString()} allSkins={allSkins}/>
    </div>
  );
};
