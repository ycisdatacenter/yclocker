const path = require('path');

const validateFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const maxSize = 10 * 1024 * 1024;
    if (req.file.size > maxSize) {
      return res.status(400).json({ error: 'File size exceeds 10MB limit' });
    }

    const { fileTypeFromFile } = await import('file-type');
    const filePath = path.join(process.env.UPLOADS_DIR, req.user.studentId, req.file.filename);
    const fileType = await fileTypeFromFile(filePath);
    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    if (!fileType || !allowedTypes.includes(fileType.mime)) {
      return res.status(400).json({ error: 'Only PNG, JPEG, and PDF files are allowed' });
    }

    req.fileType = fileType.mime.includes('image') ? 'image' : 'pdf';
    next();
  } catch (error) {
    console.error('File validation error:', error.message);
    res.status(500).json({ error: 'Error validating file', details: error.message });
  }
};

module.exports = validateFile;