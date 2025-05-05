const SUPABASE_URL = 'https://nolrftoajfuwcqpxkawo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vbHJmdG9hamZ1d2NxcHhrYXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNDU1ODgsImV4cCI6MjA2MTkyMTU4OH0.FN-dZ3O0CycEHkbj82J6RPczzPCx_rNrqCgTGQKoTtw'; // Replace with your real key

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const urlParams = new URLSearchParams(window.location.search);
const propertyId = urlParams.get("id");

let map;
let geocoder;

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

  document.getElementById("title").textContent = property.name;
  document.getElementById("location").textContent = property.location;
  document.getElementById("price").textContent = property.price;
  document.getElementById("description").textContent = property.description;

  const imageContainer = document.getElementById("image-swiper");
  const imageUrls = property.image_urls?.length
    ? property.image_urls
    : [property.image_url || "https://via.placeholder.com/800x400"];

  imageContainer.innerHTML = imageUrls
    .map(
      (url) => `
        <div class="swiper-slide">
          <img src="${url}" alt="${property.name}" />
        </div>`
    )
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

  // Initialize Google Maps after property data is fetched
  initMap();
}

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });
  }
  

function geocodeAddress(address) {
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      const mapOptions = {
        zoom: 14,
        center: results[0].geometry.location,
      };

      map = new google.maps.Map(document.getElementById("map"), mapOptions);

      const marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: map,
        title: address,
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

document.addEventListener("DOMContentLoaded", fetchPropertyDetails);
