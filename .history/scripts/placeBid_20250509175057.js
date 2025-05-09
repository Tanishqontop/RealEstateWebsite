import { supabase } from '../utils/supabaseClient.js';

// Place a bid
async function placeBid(propertyId, currentBidAmount) {
  const newBidAmount = prompt("Enter your bid amount:");

  if (isNaN(newBidAmount) || Number(newBidAmount) <= currentBidAmount) {
    alert("Your bid must be higher than the current bid.");
    return;
  }

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    alert('Please log in to place a bid.');
    return;
  }

  // Insert new bid into 'bids' table
  const { error: bidError } = await supabase
    .from('bids')
    .insert([
      {
        amount: Number(newBidAmount),
        property_id: propertyId,
        user_id: user.id,
      }
    ]);

  if (bidError) {
    alert(`Error placing bid: ${bidError.message}`);
    return;
  }

  // Update the listing with the new highest bid and winning user
  const { error: updateError } = await supabase
    .from('listings')
    .update({
      winning_bid: Number(newBidAmount),
      winner_user_id: user.id
    })
    .eq('id', propertyId);

  if (updateError) {
    console.error('Error updating listing:', updateError);
    alert('Bid placed, but failed to update the listing.');
    return;
  }

  alert('Bid placed successfully!');
  fetchHighestBid(propertyId);
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
  if (data && data.length > 0 && currentBidElement) {
    currentBidElement.innerText = `Current Bid: ₹ ${data[0].amount.toLocaleString()}`;
  }
}

// Make functions globally accessible
window.placeBid = placeBid;
window.fetchHighestBid = fetchHighestBid;
