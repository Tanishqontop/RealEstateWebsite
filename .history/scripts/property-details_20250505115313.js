const SUPABASE_URL = 'https://nolrftoajfuwcqpxkawo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vbHJmdG9hamZ1d2NxcHhrYXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNDU1ODgsImV4cCI6MjA2MTkyMTU4OH0.FN-dZ3O0CycEHkbj82J6RPczzPCx_rNrqCgTGQKoTtw';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const urlParams = new URLSearchParams(window.location.search);
const propertyId = urlParams.get("id");

let map;
let geocoder;

// Main fetch function
async function fetchPropertyDetails() {
  if (!propertyId) return;

  const { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", propertyId)
    .single();

  if (error || !property) {
    document.getElementById("title").textContent = "Property not found";
    return;
  }

  // Populate HTML with data
  document.getElementById("title").textContent = property.name;
  document.getElementById("location").textContent = property.location || "Location not provided";
  document.getElementById("price").textContent = property.price;
  document.getElementById("description").textContent = property.description;
  document.getElementById('host-name').textContent = property.agent;
  document.getElementById('host-photo').src = property.agent_photo_url;
  document.getElementById('host-bio').textContent = property.agent_bio;

  // Load images
  const imageContainer = document.getElementById("image-swiper");
  const imageUrls = property.image_urls?.length
    ? property.image_urls
    : [property.image_url || "https://via.placeholder.com/800x400"];

  imageContainer.innerHTML = imageUrls
    .map(url => `
      <div class="swiper-slide">
        <img src="${url}" alt="${property.name}" />
      </div>
    `)
    .join("");

  new Swiper(".swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    spaceBetween: 10,
  });

  // Initialize map after data is ready
  initMap(property.location);
}

// Initialize map and geocoder
function initMap(address) {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 20.5937, lng: 78.9629 }, // Center of India
    zoom: 5,
  });

  // Try to place marker
  geocodeAddress(address);
}

// Convert address to coordinates and place marker
function geocodeAddress(address) {
  if (!address || typeof address !== "string" || address.trim() === "") {
    console.warn("No valid address provided, using fallback.");
    const fallback = { lat: 28.6139, lng: 77.2090 }; // New Delhi fallback

    map.setCenter(fallback);
    map.setZoom(5);
    new google.maps.Marker({
      position: fallback,
      map,
      title: "Default Location",
    });
    return;
  }

  geocoder.geocode({ address }, (results, status) => {
    if (status === "OK") {
      const location = results[0].geometry.location;
      map.setCenter(location);
      map.setZoom(14);
      new google.maps.Marker({
        position: location,
        map,
        title: address,
      });
    } else {
      console.error("Geocoding failed: " + status);
      const fallback = { lat: 28.6139, lng: 77.2090 };
      map.setCenter(fallback);
      map.setZoom(5);
      new google.maps.Marker({
        position: fallback,
        map,
        title: "Fallback Location",
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", fetchPropertyDetails);
