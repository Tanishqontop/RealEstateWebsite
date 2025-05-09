// Initialize Supabase
import { supabase } from './utils/supabaseClient.js';

async function fetchWinners() {
  const container = document.getElementById('winners-list');
  container.innerHTML = '<p>Loading...</p>';  // Show loading message

  try {
    const { data, error } = await supabase
  .from('listings')
  .select('id, title, image_url, auction_end, winning_bid, winner_user_id')
  .not('winner_user_id', 'is', null)
  .order('auction_end', { ascending: false });


    if (error) {
      console.error('Error fetching winners:', error);
      container.innerHTML = '<p>Error fetching winners. Please try again later.</p>';
      return;
    }

    console.log("Winners:", data);
    renderWinners(data);
  } catch (err) {
    console.error('Unexpected error fetching winners:', err);
    container.innerHTML = '<p>Error fetching winners. Please try again later.</p>';
  }
}

function renderWinners(winners) {
  const container = document.getElementById('winners-list');
  container.innerHTML = ''; // Clear loading message

  winners.forEach(winner => {
    const card = document.createElement('div');
    card.className = 'property-card'; // Updated class to match CSS

    // Handle multiple images
    const imageUrls = winner.image_url.length > 0 ? winner.image_url : ['https://via.placeholder.com/300x200?text=No+Image'];

    // Create a container for images
    const imageGallery = document.createElement('div');
    imageGallery.className = 'image-gallery';
    imageUrls.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      img.alt = winner.title;
      img.className = 'winner-image';
      imageGallery.appendChild(img);
    });

    card.innerHTML = `
      <div class="winner-images">${imageGallery.outerHTML}</div>
      <div class="winner-details">
        <h3>${winner.title}</h3>
        <p><strong>Winning Bid:</strong> ₹${winner.winning_bid}</p>
        <p><strong>Auction Ended:</strong> ${new Date(winner.auction_end).toLocaleString()}</p>
        <p><strong>Winner Email:</strong> ${winner.auth_users?.email || 'Unknown'}</p>
      </div>
    `;

    container.appendChild(card);
  });
}


// Call the function when the page loads
fetchWinners();
