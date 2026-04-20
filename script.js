// ========== WAIT FOR PAGE TO LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== CITIES DATA ==========
    const cities = [
        'Lagos', 'Abuja (FCT)', 'Port Harcourt', 'Ibadan', 'Kano',
        'Enugu', 'Benin City', 'Abeokuta', 'Warri', 'Jos',
        'Kaduna', 'Maiduguri', 'Calabar', 'Uyo', 'Owerri',
        'Akure', 'Asaba', 'Sokoto', 'Bauchi', 'Yola',
        'Lokoja', 'Minna', 'Makurdi', 'Katsina', 'Zaria', 'Osun'
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
                performSearch();
            };
            cityGrid.appendChild(badge);
        });
    }
    
    // ========== GET ALL PROPERTIES FROM LOCALSTORAGE ==========
    function getAllProperties() {
        let allProperties = [];
        
        // Sample properties (fallback)
        const sampleProperties = [
            {
                id: 1001,
                image: '🏠',
                price: '₦1,500,000/year',
                priceValue: 1500000,
                title: 'Modern 3-Bedroom Apartment',
                location: 'Lekki Phase 1, Lagos',
                status: 'available',
                bedrooms: 3,
                bathrooms: 2,
                size: '150m²',
                propertyType: 'apartment',
                description: 'Beautiful modern apartment with excellent finishes. Located in the heart of Lekki Phase 1.'
            },
            {
                id: 1002,
                image: '🏢',
                price: '₦800,000/year',
                priceValue: 800000,
                title: 'Cozy 2-Bedroom Flat',
                location: 'GRA, Ikeja, Lagos',
                status: 'available',
                bedrooms: 2,
                bathrooms: 2,
                size: '100m²',
                propertyType: 'apartment',
                description: 'Comfortable 2-bedroom flat in a secure estate.'
            },
            {
                id: 1003,
                image: '🏘️',
                price: '₦2,500,000/year',
                priceValue: 2500000,
                title: 'Luxury 4-Bedroom Duplex',
                location: 'Wuse 2, Abuja',
                status: 'available',
                bedrooms: 4,
                bathrooms: 4,
                size: '250m²',
                propertyType: 'duplex',
                description: 'Luxury duplex with premium finishes.'
            },
            {
                id: 1004,
                image: '🏡',
                price: '₦600,000/year',
                priceValue: 600000,
                title: 'Self-Contained Mini Flat',
                location: 'Trans Amadi, Port Harcourt',
                status: 'available',
                bedrooms: 1,
                bathrooms: 1,
                size: '45m²',
                propertyType: 'self-contained',
                description: 'Perfect for singles or couples.'
            },
            {
                id: 1005,
                image: '🏚️',
                price: '₦1,200,000/year',
                priceValue: 1200000,
                title: '3-Bedroom Bungalow',
                location: 'Bodija, Ibadan',
                status: 'available',
                bedrooms: 3,
                bathrooms: 2,
                size: '180m²',
                propertyType: 'bungalow',
                description: 'Spacious bungalow in a quiet neighborhood.'
            },
            {
                id: 1006,
                image: '🏢',
                price: '₦1,800,000/year',
                priceValue: 1800000,
                title: 'Executive 3-Bedroom Flat',
                location: 'GRA, Enugu',
                status: 'available',
                bedrooms: 3,
                bathrooms: 3,
                size: '160m²',
                propertyType: 'apartment',
                description: 'Executive apartment with modern amenities.'
            }
        ];
        
        // Get properties from localStorage (agents' properties)
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('tetherng_properties_')) {
                const agentProperties = JSON.parse(localStorage.getItem(key));
                if (Array.isArray(agentProperties) && agentProperties.length > 0) {
                    allProperties = allProperties.concat(agentProperties);
                }
            }
        }
        
        // If no properties in localStorage, use sample properties
        if (allProperties.length === 0) {
            allProperties = sampleProperties;
        }
        
        return allProperties;
    }
    
    // ========== DISPLAY PROPERTIES ==========
    function displayProperties(propertiesToShow) {
        const propertyGrid = document.getElementById('propertyGrid');
        if (!propertyGrid) return;
        
        propertyGrid.innerHTML = '';
        
        if (propertiesToShow.length === 0) {
            propertyGrid.innerHTML = `
                <div style="text-align: center; padding: 3rem; grid-column: 1/-1;">
                    <p>🔍 No properties found matching your search.</p>
                    <p style="margin-top: 0.5rem;">Try a different location or check back later!</p>
                </div>
            `;
            return;
        }
        
        propertiesToShow.forEach(property => {
            const card = document.createElement('div');
            card.className = 'property-card';
            card.onclick = () => {
                window.location.href = `property-detail.html?id=${property.id}`;
            };
            
            card.innerHTML = `
                <div class="property-image">${property.image || '🏠'}</div>
                <div class="property-info">
                    <div class="property-price">${property.price || '₦0/year'}</div>
                    <div class="property-title">${property.title}</div>
                    <div class="property-location">📍 ${property.location}</div>
                    <div class="property-details">
                        <span>🛏️ ${property.bedrooms || 0} Beds</span>
                        <span>🛁 ${property.bathrooms || 0} Baths</span>
                        <span>📐 ${property.size || 'N/A'}</span>
                    </div>
                    ${property.status === 'rented' ? '<span style="display: inline-block; margin-top: 0.5rem; padding: 0.25rem 0.5rem; background: #fee2e2; color: #991b1b; border-radius: 0.25rem; font-size: 0.7rem;">Rented</span>' : ''}
                </div>
            `;
            
            propertyGrid.appendChild(card);
        });
    }
    
    // ========== SEARCH FUNCTIONALITY ==========
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const allProperties = getAllProperties();
        
        if (searchTerm) {
            // Find properties that match the search
            const matchingProperties = allProperties.filter(property => 
                property.location.toLowerCase().includes(searchTerm) ||
                property.title.toLowerCase().includes(searchTerm)
            );
            
            displayProperties(matchingProperties);
            
            if (matchingProperties.length === 0) {
                // No results message is handled by displayProperties
                console.log(`No properties found for "${searchTerm}"`);
            }
        } else {
            // Show all properties if search is empty
            displayProperties(allProperties);
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
    
    // ========== LOAD ALL PROPERTIES ON PAGE LOAD ==========
    const allProperties = getAllProperties();
    displayProperties(allProperties);
    
    // ========== CONSOLE CONFIRMATION ==========
    console.log('✅ Tetherng website loaded successfully!');
    console.log('📍 Cities loaded:', cities.length);
    console.log('🏠 Properties loaded:', allProperties.length);
    console.log('📄 Pages: agent-signup.html | signin.html | about.html');
    console.log('🔗 Property cards now link to property-detail.html');
});
