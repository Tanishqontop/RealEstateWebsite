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
    card.className = 'winner-card';

    const imageUrl = winner.image_url || 'path/to/fallback-image.jpg';  // Fallback image

    card.innerHTML = `
      <img src="${imageUrl}" alt="${winner.title}" class="winner-image" />
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
