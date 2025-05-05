import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// ✅ Initialize Supabase FIRST
const supabaseUrl = 'https://YOUR_PROJECT.supabase.co';
const supabaseKey = 'YOUR_PUBLIC_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ Now you can use it
async function fetchProperties() {
  const { data, error } = await supabase.from('properties').select('*');

  if (error) {
    console.error('Fetch error:', error);
    return;
  }

  const listingsContainer = document.getElementById('listings');
  listingsContainer.innerHTML = '';

  data.forEach((property) => {
    listingsContainer.innerHTML += `
      <div class="property-card">
        <img src="${property.image_url}" alt="${property.name}" />
        <h3>${property.name}</h3>
        <p>${property.location}</p>
        <p>₹ ${property.price}</p>
      </div>
    `;
  });
}

fetchProperties();
