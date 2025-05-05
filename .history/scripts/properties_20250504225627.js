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
      // Simulated fetch – replace this with actual API call if needed
      const properties = await getMockProperties();
  
      propertyListingsElement.innerHTML = properties.map(property => `
        <div class="property-card">
          <h3>${property.title}</h3>
          <p><strong>Price:</strong> ${property.price}</p>
          <p><strong>Location:</strong> ${property.location}</p>
        </div>
      `).join('');
    } catch (error) {
      console.error('Failed to fetch properties:', error);
      propertyListingsElement.innerHTML = '<p>Error loading properties.</p>';
    }
  }
  
  // Simulated property data
  function getMockProperties() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            title: "Modern Apartment",
            price: "$1,200/month",
            location: "Downtown"
          },
          {
            title: "Cozy House",
            price: "$250,000",
            location: "Suburbs"
          },
          {
            title: "Luxury Villa",
            price: "$2,500,000",
            location: "Beachfront"
          }
        ]);
      }, 1000); // Simulate network delay
    });
  }
  