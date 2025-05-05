// scripts/properties.js

const supabaseUrl = 'https://nolrftoajfuwcqpxkawo.supabase.co';
const supabaseKey = 'YOUR_PUBLIC_ANON_KEY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function loadProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*');

  if (error) {
    console.error('Error fetching properties:', error);
    return;
  }

  const listings = document.getElementById('property-listings');
  data.forEach(prop => {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.innerHTML = `
      <img src="${prop.image_url}" alt="${prop.name}" />
      <h3>${prop.name}</h3>
      <p>${prop.location}</p>
      <p><strong>${prop.price}</strong></p>
    `;
    listings.appendChild(card);
  });
}

loadProperties();
