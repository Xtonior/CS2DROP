import React, { useState } from 'react';
import axios from 'axios';
import { CaseRoll } from './CaseRoll';
import type { SkinItem } from '../src/types';

interface Props {
  caseId: string;
  allSkins: SkinItem[];
}

export const OpenCaseButton: React.FC<Props> = ({ caseId, allSkins }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SkinItem | null>(null);
  const [opened, setOpened] = useState(false);

  const openCase = async () => {
    if (!allSkins.length) return;
    setLoading(true);
    setOpened(true);
    setResult(null);

    try {
      const res = await axios.post(`/api/opencase?id=${caseId}`);
      const skinId = res.data;
      const skinItem = allSkins.find(s => s.id.toString() === skinId);
      if (skinItem) setResult(skinItem);
    } catch (err) {
      console.error(err);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 20 }}>
      <button
        onClick={openCase}
        disabled={loading}
        style={{
          padding: '12px 24px',
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff',
          background: '#4f46e5',
          border: 'none',
          borderRadius: 8,
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Opening...' : 'Open Case'}
      </button>

      {opened && result && (
        <>
          <CaseRoll
            skins={allSkins}
            resultSkin={result}
            onAnimationEnd={() => console.log('Animation finished')
            }
          />
          { }
          <div hidden={!opened} style={{ marginTop: 20 }}>
            <div style={{
              display: 'inline-block',
              border: '2px solid #4f46e5',
              borderRadius: 10,
              padding: 8,
              width: 180,
              backgroundColor: '#1f2937',
              color: '#fff'
            }}>
              <img src={result.imagePath} alt={result.name} style={{ width: '100%', borderRadius: 10 }} />
              <p style={{ fontWeight: 'bold', marginTop: 8 }}>{result.name}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
