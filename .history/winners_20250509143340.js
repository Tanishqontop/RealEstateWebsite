import { supabase } from '../utils/supabaseClient.js';

async function fetchWinners() {
  const { data, error } = await supabase
    .from('listings')
    .select(`
      id,
      title,
      image_url,
      auction_end,
      winning_bid,
      users: winner_user_id (full_name)
    `)
    .not('winner_user_id', 'is', null)
    .order('auction_end', { ascending: false });

  if (error) {
    console.error("Error fetching winners:", error);
    return;
  }

  const container = document.getElementById('winners-list');

  if (data.length === 0) {
    container.innerHTML = "<p>No winners announced yet.</p>";
    return;
  }

  data.forEach(listing => {
    const card = document.createElement("div");
    card.className = "property-card";
    card.innerHTML = `
      <img src="${listing.image_url}" alt="${listing.title}">
      <h3>${listing.title}</h3>
      <p><strong>Winner:</strong> ${listing.users?.full_name || "Anonymous"}</p>
      <p><strong>Winning Bid:</strong> ₹ ${listing.winning_bid.toLocaleString()}</p>
      <p class="auction-end">Ended on: ${new Date(listing.auction_end).toLocaleString()}</p>
    `;
    container.appendChild(card);
  });
}

fetchWinners();
