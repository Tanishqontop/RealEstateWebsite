import { supabase } from '../utils/supabaseClient.js';

// Place a bid
async function placeBid(propertyId, currentBidAmount) {
  const newBidAmount = prompt("Enter your bid amount:");

  if (isNaN(newBidAmount) || newBidAmount <= currentBidAmount) {
    alert("Your bid must be higher than the current bid.");
    return;
  }

  const user = supabase.auth.user(); // Get the current authenticated user

  if (!user) {
    alert('Please log in to place a bid.');
    return;
  }

  const { data, error } = await supabase
    .from('bids')
    .insert([
      {
        amount: newBidAmount,
        property_id: propertyId,
        user_id: user.id, // Store the user ID to track the bid
      }
    ]);

  if (error) {
    alert(`Error placing bid: ${error.message}`);
    return;
  }

  alert('Bid placed successfully!');
  fetchHighestBid(propertyId); // Update the highest bid after placing a new one
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

export { placeBid, fetchHighestBid };
