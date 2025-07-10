const grid = document.getElementById('thumbnail-grid');
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalText = document.getElementById('modal-text');

Papa.parse("data.csv", {
  download: true,
  header: true,
  complete: function(results) {
    const data = results.data;
    displayThumbnails(data);
  }
});

function displayThumbnails(data) {
  data.forEach(item => {
    const thumbnail = document.createElement('div'); // Changed to div
    thumbnail.style.backgroundImage = `url(${item.thumb || 'placeholder.jpg'})`; // Set background image
    thumbnail.classList.add('thumbnail');
    thumbnail.addEventListener('click', () => {
      showModal(item);
    });
    grid.appendChild(thumbnail);
  });
}


function showModal(item) {
  modalTitle.textContent = item.title;
  modalText.textContent = item.text;
  modalImage.innerHTML = ''; // Clear previous content

  if (item.video) {
    // Check if it's a YouTube link (you might need a more robust check)
    if (item.video.includes("youtube.com/watch?v=")) {
      const videoId = item.video.split("v=")[1].split("&")[0]; // Extract video ID
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.title = item.title;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      modalImage.appendChild(iframe);
    } else { // Assume it's a regular video file
      const video = document.createElement('video');
      video.src = item.video;
      video.controls = true;
      modalImage.appendChild(video);
    }
  } else if (item.image) {
    const img = document.createElement('img');
    img.src = item.image;
    modalImage.appendChild(img);
  }

  modal.style.display = 'flex';
}

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});