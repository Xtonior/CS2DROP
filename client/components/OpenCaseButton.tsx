import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  caseId: number;
}

export const OpenCaseButton: React.FC<Props> = ({ caseId }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const openCase = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post(`/api/cases/${caseId}/open`);
      setResult(res.data.itemName);
    } catch (err) {
      setResult('Error opening case');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={openCase} disabled={loading}>
        {loading ? 'Opening...' : 'Open Case'}
      </button>
      {result && <p>Result: {result}</p>}
    </div>
  );
};
