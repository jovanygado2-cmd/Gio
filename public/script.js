const form = document.getElementById('download-form');
const input = document.getElementById('youtube-url');
const message = document.getElementById('message');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const url = input.value.trim();
  if (!url) {
    message.textContent = 'Please enter a YouTube URL.';
    return;
  }

  message.textContent = 'Preparing your download...';

  const downloadURL = `/download?url=${encodeURIComponent(url)}`;
  window.location.href = downloadURL;

  setTimeout(() => {
    message.textContent = 'If the download did not start, verify the link and try again.';
  }, 1500);
});
