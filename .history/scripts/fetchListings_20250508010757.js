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
      <div id="current-bid-${listing.id}" class="current-bid">Current Bid: ₹ 0</div>
      <button onclick="placeBid('${listing.id}', ${listing.starting_price})" class="bid-button">Bid Now</button>
    `;

    propertiesList.appendChild(card);
    fetchHighestBid(listing.id); // Fetch the highest bid for this property
  });
}

// Fetch the highest bid for a specific property
async function fetchHighestBid(propertyId) {
  const { data, error } = await supabase
    .from('bids')
    .select('amount')
    .eq('property_id', propertyId)
    .order('amount', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error fetching highest bid:', error);
    return;
  }

  const currentBidElement = document.getElementById(`current-bid-${propertyId}`);
  if (data && data.length > 0) {
    currentBidElement.innerText = `Current Bid: ₹ ${data[0].amount.toLocaleString()}`;
  }
}

// Call the fetchListings function to display data when the page loads
fetchListings();
