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
      <div class="current-bid">Current Bid: ₹ <span id="current-bid-${listing.id}">${listing.starting_price}</span></div>
      <a href="#" class="auction-button" onclick="placeBid(${listing.id}, ${listing.starting_price})">Bid Now</a>
    `;

    propertiesList.appendChild(card);

    // Fetch current highest bid
    fetchHighestBid(listing.id);
  });
}

// Fetch highest bid for a property
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
    currentBidElement.innerText = data[0].amount.toLocaleString();
  }
}

// Place a bid on a property
async function placeBid(propertyId, currentBid) {
  const newBidAmount = currentBid + 1000; // Example: Increase bid by ₹1000

  // Make sure to replace this with actual user's ID (use Supabase auth)
  const userId = 'example-user-id'; // Replace with actual user ID

  const { data, error } = await supabase
    .from('bids')
    .insert([
      { property_id: propertyId, user_id: userId, amount: newBidAmount }
    ]);

  if (error) {
    alert('Error placing bid: ' + error.message);
  } else {
    alert(`Bid placed successfully! New bid: ₹${newBidAmount}`);

    // Update the displayed bid immediately
    const currentBidElement = document.getElementById(`current-bid-${propertyId}`);
    currentBidElement.innerText = newBidAmount.toLocaleString();
  }
}

// Call the fetchListings function to display data when the page loads
fetchListings();
