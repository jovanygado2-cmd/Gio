const express = require('express');
const path = require('path');
const ytdl = require('ytdl-core');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/download', async (req, res) => {
  const videoURL = req.query.url;

  if (!videoURL || !ytdl.validateURL(videoURL)) {
    return res.status(400).json({ error: 'Please provide a valid YouTube URL.' });
  }

  try {
    const info = await ytdl.getInfo(videoURL);
    const safeTitle = info.videoDetails.title
      .replace(/[<>:"/\\|?*]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    res.header('Content-Disposition', `attachment; filename="${safeTitle}.mp4"`);
    ytdl(videoURL, {
      quality: 'highest',
      filter: 'audioandvideo'
    }).pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to download video. Try another link.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
