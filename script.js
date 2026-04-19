// ========== WAIT FOR PAGE TO LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== CITIES DATA ==========
    const cities = [
        'Lagos', 'Abuja (FCT)', 'Port Harcourt', 'Ibadan', 'Kano',
        'Enugu', 'Benin City', 'Abeokuta', 'Warri', 'Jos',
        'Kaduna', 'Maiduguri', 'Calabar', 'Uyo', 'Owerri',
        'Akure', 'Asaba', 'Sokoto', 'Bauchi', 'Yola',
        'Lokoja', 'Minna', 'Makurdi', 'Katsina', 'Zaria'
    ];
    
    // Display cities
    const cityGrid = document.getElementById('cityGrid');
    if (cityGrid) {
        cities.forEach(city => {
            const badge = document.createElement('span');
            badge.className = 'city-badge';
            badge.textContent = city;
            badge.onclick = () => {
                document.getElementById('searchInput').value = city;
                alert(`🔍 Showing properties in ${city}\n\n(Full property listings coming soon! Agents are joining daily.)`);
            };
            cityGrid.appendChild(badge);
        });
    }
    
    // ========== SAMPLE PROPERTIES DATA ==========
    const properties = [
        {
            id: 1,
            image: '🏠',
            price: '₦1.5M/year',
            title: 'Modern 3-Bedroom Apartment',
            location: 'Lekki Phase 1, Lagos',
            beds: 3,
            baths: 2,
            size: '150m²'
        },
        {
            id: 2,
            image: '🏢',
            price: '₦800K/year',
            title: 'Cozy 2-Bedroom Flat',
            location: 'GRA, Ikeja, Lagos',
            beds: 2,
            baths: 2,
            size: '100m²'
        },
        {
            id: 3,
            image: '🏘️',
            price: '₦2.5M/year',
            title: 'Luxury 4-Bedroom Duplex',
            location: 'Wuse 2, Abuja',
            beds: 4,
            baths: 4,
            size: '250m²'
        },
        {
            id: 4,
            image: '🏡',
            price: '₦600K/year',
            title: 'Self-Contained Mini Flat',
            location: 'Trans Amadi, Port Harcourt',
            beds: 1,
            baths: 1,
            size: '45m²'
        },
        {
            id: 5,
            image: '🏚️',
            price: '₦1.2M/year',
            title: '3-Bedroom Bungalow',
            location: 'Bodija, Ibadan',
            beds: 3,
            baths: 2,
            size: '180m²'
        },
        {
            id: 6,
            image: '🏢',
            price: '₦1.8M/year',
            title: 'Executive 3-Bedroom Flat',
            location: 'GRA, Enugu',
            beds: 3,
            baths: 3,
            size: '160m²'
        }
    ];
    
    // Display properties
    const propertyGrid = document.getElementById('propertyGrid');
    if (propertyGrid) {
        properties.forEach(property => {
            const card = document.createElement('div');
            card.className = 'property-card';
            card.onclick = () => {
                alert(`📞 Interested in: ${property.title}\n\nLocation: ${property.location}\nPrice: ${property.price}\n\nContact us at 0800-TETHERNG to view this property.\n\n(Full booking system coming soon!)`);
            };
            
            card.innerHTML = `
                <div class="property-image">${property.image}</div>
                <div class="property-info">
                    <div class="property-price">${property.price}</div>
                    <div class="property-title">${property.title}</div>
                    <div class="property-location">📍 ${property.location}</div>
                    <div class="property-details">
                        <span>🛏️ ${property.beds} Beds</span>
                        <span>🛁 ${property.baths} Baths</span>
                        <span>📐 ${property.size}</span>
                    </div>
                </div>
            `;
            
            propertyGrid.appendChild(card);
        });
    }
    
    // ========== SEARCH FUNCTIONALITY ==========
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
            // Find properties that match the search
            const matchingProperties = properties.filter(property => 
                property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            if (matchingProperties.length > 0) {
                alert(`🔍 Found ${matchingProperties.length} property/properties in "${searchTerm}"\n\nClick on any property card to see details!\n\n(More properties coming soon from verified agents.)`);
            } else {
                alert(`🔍 No properties found in "${searchTerm}" yet.\n\nBut we're growing daily! Click "List Property" if you're an agent, or check back soon.\n\nTry: Lagos, Abuja, Port Harcourt, Ibadan, or click any city badge above.`);
            }
        } else {
            alert('📍 Please enter a city name (e.g., Lagos, Abuja, Port Harcourt) or click on any city badge above.');
        }
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // ========== CONSOLE CONFIRMATION ==========
    console.log('✅ Tetherng website loaded successfully!');
    console.log('📍 Cities loaded:', cities.length);
    console.log('🏠 Sample properties loaded:', properties.length);
    console.log('📄 Agent sign up page: agent-signup.html');
});
