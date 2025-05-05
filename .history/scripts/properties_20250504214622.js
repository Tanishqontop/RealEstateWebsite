import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// ✅ Initialize Supabase FIRST
const supabaseUrl = 'https://nolrftoajfuwcqpxkawo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vbHJmdG9hamZ1d2NxcHhrYXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNDU1ODgsImV4cCI6MjA2MTkyMTU4OH0.FN-dZ3O0CycEHkbj82J6RPczzPCx_rNrqCgTGQKoTtw';
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
