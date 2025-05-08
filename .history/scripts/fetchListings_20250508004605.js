import { supabase } from './supabaseClient.js';

const propertiesList = document.getElementById('properties-list');

// Fetch property listings from the 'listings' table
async function fetchProperties() {
  const { data, error } = await supabase
    .from('listings')
    .select('id, title, description, price, image_url');

  if (error) {
    console.error('Error fetching properties:', error.message);
    return;
  }

  // Insert property listings into the DOM
  data.forEach(async (property) => {
    const propertyElement = document.createElement('div');
    propertyElement.classList.add('property-item');
    
    // Populate the property details in the DOM
    propertyElement.innerHTML = `
      <img src="${property.image_url}" alt="${property.title}" />
      <h2>${property.title}</h2>
      <p>${property.description}</p>
      <p>Starting Bid: ₹${property.price}</p>
      <button class="bid-now" data-property-id="${property.id}">Bid Now</button>
      <div class="current-bid" id="current-bid-${property.id}">Current Bid: ₹0</div>
    `;

    propertiesList.appendChild(propertyElement);

    // Fetch the current highest bid for the property
    await fetchCurrentBid(property.id);
  });

  // Add event listeners for Bid Now buttons
  const bidButtons = document.querySelectorAll('.bid-now');
  bidButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const propertyId = event.target.getAttribute('data-property-id');
      openBidDialog(propertyId);
    });
  });
}

// Fetch the current highest bid for a property
async function fetchCurrentBid(propertyId) {
  const { data: bids, error } = await supabase
    .from('bids')
    .select('bid_amount')
    .eq('property_id', propertyId)
    .order('bid_amount', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching bid:', error.message);
    return;
  }

  const currentBidAmount = bids ? bids.bid_amount : 0;
  document.getElementById(`current-bid-${propertyId}`).textContent = `Current Bid: ₹${currentBidAmount}`;
}

// Open a modal or dialog to place a bid
function openBidDialog(propertyId) {
  const bidAmount = prompt('Enter your bid amount for this property:');
  if (bidAmount) {
    placeBid(propertyId, parseFloat(bidAmount));
  }
}

// Place a new bid on a property
async function placeBid(propertyId, bidAmount) {
  const user = supabase.auth.user();  // Get the authenticated user

  if (!user) {
    alert('You must be logged in to place a bid!');
    return;
  }

  if (isNaN(bidAmount) || bidAmount <= 0) {
    alert('Please enter a valid bid amount!');
    return;
  }

  // Insert new bid into the 'bids' table
  const { error } = await supabase
    .from('bids')
    .insert([
      {
        property_id: propertyId,
        user_id: user.id,
        bid_amount: bidAmount,
      }
    ]);

  if (error) {
    console.error('Error placing bid:', error.message);
    alert('There was an error placing your bid.');
    return;
  }

  alert('Bid placed successfully!');
  fetchCurrentBid(propertyId);  // Refresh the bid information
}

// Initial fetch of property listings
fetchProperties();
