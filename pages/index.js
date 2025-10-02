import { useEffect, useState } from 'react';

export default function Home() {
  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = async () => {
    const res = await fetch('/api/candidates');
    const data = await res.json();
    setCandidates(data);
  };

  const vote = async (id) => {
    await fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchCandidates();
  };

  useEffect(() => { fetchCandidates(); }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>校花校草排行榜</h1>
      <a href="/add">添加候选人</a>
      <ul>
        {candidates.map(c => (
          <li key={c.id}>
            <img src={c.img} width="100" height="100" style={{ borderRadius: '50%' }} />
            <div>{c.name}</div>
            <div>票数: {c.votes}</div>
            <button onClick={() => vote(c.id)}>投票</button>
          </li>
        ))}
      </ul>
    </div>
  );
}