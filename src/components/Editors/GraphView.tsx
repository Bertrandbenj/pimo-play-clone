import { useEffect, useState } from 'react';
import Graphviz from 'graphviz-react';

export function GraphView() {
  const [dot, setDot] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDot = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/schema');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        setDot(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDot();
  }, []);

  if (loading) return <div className="p-4">Loading graph...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading graph: {error}</div>;

  return (
    <div className="w-full h-full overflow-auto">
      <Graphviz dot={dot} options={{ width: '100%', height: '100%', fit: true }} />
    </div>
  );
}
