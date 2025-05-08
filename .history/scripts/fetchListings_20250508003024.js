import { supabase } from '../utils/supabaseClient.js';

// Fetch property listings from Supabase
async function fetchListings() {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('auction_status', 'active'); // Only get active listings

  if (error) {
    console.error('Error fetching listings:', error);
    return;
  }

  displayListings(data);
}

// Display listings dynamically
function displayListings(listings) {
  const propertiesList = document.getElementById('properties-list');

  listings.forEach((listing) => {
    const card = document.createElement('div');
    card.classList.add('property-card');

    card.innerHTML = `
      <img src="${listing.image_url}" alt="${listing.title}" />
      <h3>${listing.title}</h3>
      <p>${listing.description}</p>
      <div class="price">₹ ${listing.starting_price.toLocaleString()}</div>
      <div class="auction-end">Auction Ends: ${new Date(listing.auction_end).toLocaleString()}</div>
      <a href="#" class="auction-button">Bid Now</a>
    `;

    propertiesList.appendChild(card);
  });
}

// Call the fetchListings function to display data when the page loads
fetchListings();
