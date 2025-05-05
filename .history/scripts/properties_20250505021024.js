const SUPABASE_URL = 'https://nolrftoajfuwcqpxkawo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vbHJmdG9hamZ1d2NxcHhrYXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNDU1ODgsImV4cCI6MjA2MTkyMTU4OH0.FN-dZ3O0CycEHkbj82J6RPczzPCx_rNrqCgTGQKoTtw';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
  fetchProperties();
});

async function fetchProperties() {
  const container = document.getElementById('property-listings');
  console.log('Fetching properties...');

  try {
    const { data: properties, error } = await supabase
      .from('properties')
      .select('*');

    if (error) throw error;
    console.log('Properties:', properties);

    if (!properties || properties.length === 0) {
      container.innerHTML = '<p>No properties found.</p>';
      return;
    }

    container.innerHTML = properties.map(property => `
      <div class="property-card">
        <img src="${property.image_url || 'https://via.placeholder.com/300x160'}" alt="${property.name}">
        <div class="content">
          <h3>${property.name}</h3>
          <p>${property.description}</p>
          <p><strong>Price:$ </strong> ${property.price}</p>
          <p><strong>Location:</strong> ${property.location}</p>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('Error loading properties:', err);
    container.innerHTML = '<p>Failed to load properties.</p>';
  }
}
