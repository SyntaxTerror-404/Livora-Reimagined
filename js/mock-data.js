/**
 * Livora Reimagined - Curated Property Data
 * Real locations in Kidapawan City & Davao City with fresh modern photography
 */

const LIVORA_DATA = {
  cities: ["All Locations", "Kidapawan City", "Davao City"],
  propertyTypes: ["All Types", "Bedspace", "Solo Studio", "Dormitory", "Apartment"],
  priceRanges: ["Any Budget", "Under ₱2,000", "₱2,000 - ₱3,000", "₱3,000+"],
  
  featuredListing: {
    id: "fp-1",
    title: "Executive Bedspace & Study Studio",
    location: "Matina-Aplaya, Davao City",
    city: "Davao City",
    neighborhood: "Near Ateneo de Davao & S&R",
    price: 2400,
    period: "month",
    rating: 4.92,
    reviewCount: 38,
    type: "Bedspace",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
    badge: "⭐ Top Rated for Students",
    verified: true,
    instantBook: true,
    gender: "Coed / Separate Wings",
    specs: {
      beds: "Single bunk with privacy curtain",
      bath: "Ensuite hot/cold shower",
      wifi: "Fiber 150 Mbps"
    },
    landlord: {
      name: "Engr. Roberto Dela Cruz",
      role: "Verified Superhost",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      joined: "Verified 2 years",
      responseTime: "Under 15 mins"
    }
  },

  properties: [
    {
      id: "kd-1",
      title: "Cozy Modern Bedspace in Poblacion",
      location: "Poblacion, Kidapawan City",
      city: "Kidapawan City",
      price: 2000,
      period: "month",
      rating: 4.9,
      reviews: 42,
      type: "Bedspace",
      tag: "Popular",
      gender: "Female Only",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      amenities: ["High-speed WiFi", "Aircon", "Study Desk", "CCTV 24/7", "Water Dispenser"],
      distance: "3 mins to Gaisano Grand Kidapawan"
    },
    {
      id: "kd-2",
      title: "Spacious Student Room in Sudapin",
      location: "Sudapin, Kidapawan City",
      city: "Kidapawan City",
      price: 2200,
      period: "month",
      rating: 4.6,
      reviews: 19,
      type: "Solo Studio",
      tag: "Quiet Zone",
      gender: "Male / Female",
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      amenities: ["Private Bathroom", "Electric Sub-meter", "Bicycle Parking"],
      distance: "Near Kidapawan City National HS"
    },
    {
      id: "kd-3",
      title: "Budget-Friendly Singao Haven",
      location: "Singao, Kidapawan City",
      city: "Kidapawan City",
      price: 1800,
      period: "month",
      rating: 4.5,
      reviews: 26,
      type: "Bedspace",
      tag: "Best Value",
      gender: "Female Only",
      image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      amenities: ["Inclusive Water & Light", "Common Kitchen", "Laundry Area"],
      distance: "5 mins to Central Market"
    },
    {
      id: "kd-4",
      title: "Eco-Friendly Dormitory in Manongol",
      location: "Manongol, Kidapawan City",
      city: "Kidapawan City",
      price: 1200,
      period: "month",
      rating: 4.7,
      reviews: 15,
      type: "Dormitory",
      tag: "Budget Choice",
      gender: "Male Only",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      amenities: ["Ventilated Rooms", "Shared Lounge", "Gated Compound"],
      distance: "Peaceful scenic neighborhood"
    },
    {
      id: "dv-1",
      title: "Premier Student Dorm in Matina-Aplaya",
      location: "Matina-Aplaya, Davao City",
      city: "Davao City",
      price: 2400,
      period: "month",
      rating: 4.95,
      reviews: 58,
      type: "Bedspace",
      tag: "Verified Superhost",
      gender: "Coed Wings",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      amenities: ["Fiber Internet", "Aircon", "Individual Lockers", "Keycard Entry"],
      distance: "Walking distance to UM Matina"
    },
    {
      id: "dv-2",
      title: "Urban Loft Bedspace in Bolton Street",
      location: "Bolton, Davao City",
      city: "Davao City",
      price: 2200,
      period: "month",
      rating: 4.4,
      reviews: 31,
      type: "Bedspace",
      tag: "Downtown Hub",
      gender: "Male / Female",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      amenities: ["City View", "Near Transportation Hubs", "24hr Convenience Store"],
      distance: "Heart of Downtown Davao"
    },
    {
      id: "dv-3",
      title: "Modern Minimalist Studio in Bajada",
      location: "Bajada, Davao City",
      city: "Davao City",
      price: 3200,
      period: "month",
      rating: 4.8,
      reviews: 44,
      type: "Solo Studio",
      tag: "Premium",
      gender: "Open to All",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      amenities: ["Private Balcony", "Aircon", "Induction Cooker", "Fiber WiFi"],
      distance: "Beside Abreeza Mall & SPMC"
    },
    {
      id: "dv-4",
      title: "Tranquil Oasis Room in Buhangin",
      location: "Buhangin, Davao City",
      city: "Davao City",
      price: 2800,
      period: "month",
      rating: 4.75,
      reviews: 29,
      type: "Apartment",
      tag: "Airport Access",
      gender: "Open to All",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
      amenities: ["Quiet Subd", "Parking Available", "High Ceiling", "Hot Shower"],
      distance: "10 mins to Davao Airport & Gaisano Mall"
    }
  ],

  testimonials: [
    {
      name: "Kirsten A.",
      role: "Nursing Student, Davao City",
      quote: "Livora made finding a safe bedspace near my clinical hospital rotation so painless. The verified badge gave my parents complete peace of mind.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      name: "Mark J.",
      role: "Boarding House Landlord, Kidapawan",
      quote: "Managing my listings and communicating with prospective students has never been this effortless. Zero vacancy in just 2 weeks!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5
    }
  ]
};

