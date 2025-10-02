import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

const dataFile = path.join(process.cwd(), 'data.json');

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : [];
    res.status(200).json(data.sort((a,b)=>b.votes-a.votes));
  } else if (req.method === 'POST') {
    const form = formidable({ multiples: false, uploadDir: './public/uploads', keepExtensions: true });
    form.parse(req, (err, fields, files) => {
      if (err) return res.status(500).json({ error: err.message });

      const data = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : [];
      const newCandidate = {
        id: Date.now(),
        name: fields.name,
        votes: 0,
        img: files.img.newFilename ? `/uploads/${files.img.newFilename}` : ''
      };
      data.push(newCandidate);
      fs.writeFileSync(dataFile, JSON.stringify(data));
      res.status(200).json(newCandidate);
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}