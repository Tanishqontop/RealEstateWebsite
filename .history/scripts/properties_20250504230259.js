const SUPABASE_URL = 'https://nolrftoajfuwcqpxkawo.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-public-api-key';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
  fetchProperties();
});

async function fetchProperties() {
  const propertyListingsElement = document.getElementById('property-listings');
  if (!propertyListingsElement) {
    console.error('Element with ID "property-listings" not found.');
    return;
  }

  try {
    const { data: properties, error } = await supabase
      .from('properties')
      .select('*');

    if (error) throw error;

    propertyListingsElement.innerHTML = properties.map(property => `
      <div class="property-card">
        <h3>${property.title}</h3>
        <p><strong>Price:</strong> ${property.price}</p>
        <p><strong>Location:</strong> ${property.location}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error fetching properties from Supabase:', error);
    propertyListingsElement.innerHTML = '<p>Failed to load properties.</p>';
  }
}
