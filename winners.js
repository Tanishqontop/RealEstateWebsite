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
    card.className = 'property-card';

    // Handle multiple images
    const imageUrls = winner.image_url.length > 0 ? winner.image_url : ['https://via.placeholder.com/300x200?text=No+Image'];

    const imageGallery = document.createElement('div');
    imageGallery.className = 'swiper-container';
    imageGallery.innerHTML = `
      <div class="swiper-wrapper">
        ${imageUrls.map(url => `
          <div class="swiper-slide">
            <img src="${url}" alt="${winner.title}" />
          </div>
        `).join('')}
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    `;

    card.innerHTML = `
      <div class="winner-images">${imageGallery.outerHTML}</div>
      <div class="winner-details">
        <h3>${winner.title}</h3>
        <p><strong>Winning Bid:</strong> ₹${winner.winning_bid}</p>
        <p><strong>Auction Ended:</strong> ${new Date(winner.auction_end).toLocaleString()}</p>
        <p><strong>Winner User Id:</strong> ${winner.winner_user_id || 'Unknown'}</p>
      </div>
    `;
    container.appendChild(card);

    // Initialize Swiper for each card
    new Swiper(card.querySelector('.swiper-container'), {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: card.querySelector('.swiper-pagination'),
        clickable: true,
      },
      navigation: {
        nextEl: card.querySelector('.swiper-button-next'),
        prevEl: card.querySelector('.swiper-button-prev'),
      },
    });
  });
}

// Call the function when the page loads
fetchWinners();
