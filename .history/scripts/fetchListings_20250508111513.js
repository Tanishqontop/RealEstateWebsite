import { supabase } from '../utils/supabaseClient.js';

// Inject CSS styles directly into the document
const style = document.createElement('style');
style.textContent = `
  .bid-button {
    background-color: #28a745;
    color: white;
    padding: 10px 16px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px;
    width: 100%;
  }
  .bid-button:hover {
    background-color: #218838;
  }
  .bid-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  .property-card {
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 16px;
    margin: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    max-width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .property-card img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
  }
`;
document.head.appendChild(style);

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
      <h1>${listing.title}</h1>
      <p>${listing.description}</p>
      <div class="price">₹ ${listing.starting_price.toLocaleString()}</div>
      <div class="auction-end">Auction Ends: ${new Date(listing.auction_end).toLocaleString()}</div>
      <div id="current-bid-${listing.id}" class="current-bid">Current Bid: ₹ 0</div>
      ${new Date(listing.auction_end) > new Date() ? 
        `<button onclick="placeBid('${listing.id}', ${listing.starting_price})" class="bid-button">Bid Now</button>` : 
        `<button class="bid-button" disabled>Auction Ended</button>`}`;

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
