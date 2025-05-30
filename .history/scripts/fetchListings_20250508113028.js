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
    align-items: center;       /* Center-align content */
    text-align: center;        /* Center-align text */
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
    const link = document.createElement('a');
    link.href = `property.html?id=${listing.id}`;
    link.classList.add('property-card');
    link.style.textDecoration = 'none';
    link.style.color = 'inherit';


    link.innerHTML = `
  <img src="${listing.image_url}" alt="${listing.title}" />
  <h3>${listing.title}</h3>
  <p>${listing.description}</p>
  <div class="price">₹ ${listing.starting_price.toLocaleString()}</div>
  <div class="auction-end">Auction Ends: ${new Date(listing.auction_end).toLocaleString()}</div>
  <div id="current-bid-${listing.id}" class="current-bid">Current Bid: ₹ 0</div>
`;

if (new Date(listing.auction_end) > new Date()) {
  const button = document.createElement('button');
  button.textContent = 'Bid Now';
  button.className = 'bid-button';
  button.onclick = (e) => {
    e.preventDefault(); // Prevent navigation when bidding
    placeBid(listing.id, listing.starting_price);
  };
  link.appendChild(button);
} else {
  link.innerHTML += `<button class="bid-button" disabled>Auction Ended</button>`;
}

propertiesList.appendChild(link);
fetchHighestBid(listing.id);

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
