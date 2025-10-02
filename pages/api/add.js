import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Add() {
  const [name, setName] = useState('');
  const [img, setImg] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('img', img);
    await fetch('/api/candidates', { method: 'POST', body: formData });
    router.push('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>添加候选人</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="名字" value={name} onChange={e => setName(e.target.value)} required/>
        <input type="file" accept="image/*" onChange={e => setImg(e.target.files[0])} required/>
        <button type="submit">添加</button>
      </form>
    </div>
  );
}