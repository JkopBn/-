import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data.json');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { id } = req.body;
    const data = JSON.parse(fs.readFileSync(dataFile));
    const candidate = data.find(c => c.id === Number(id));
    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });
    candidate.votes += 1;
    fs.writeFileSync(dataFile, JSON.stringify(data));
    res.status(200).json({ success: true, votes: candidate.votes });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}