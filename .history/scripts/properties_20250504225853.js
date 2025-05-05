import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Replace with your actual Supabase project details
const SUPABASE_URL = 'https://nolrftoajfuwcqpxkawo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vbHJmdG9hamZ1d2NxcHhrYXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNDU1ODgsImV4cCI6MjA2MTkyMTU4OH0.FN-dZ3O0CycEHkbj82J6RPczzPCx_rNrqCgTGQKoTtw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
