const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/apply', async (req, res) => {
  try {
    const data = req.body;

    const application = await prisma.internshipApplication.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        desiredRole: data.desiredRole,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        resumeFileName: data.resumeFileName,
        coverLetter: data.coverLetter,
        degree: data.education.degree,
        university: data.education.university,
        graduationYear: data.education.graduationYear,
        skills: data.skills
      }
    });

    res.status(201).json({ message: 'Application submitted successfully!', application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit application.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
