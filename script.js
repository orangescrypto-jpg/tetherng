// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get the search button and input field
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    // Add click event to search button
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                alert(`🔍 Searching for "${searchTerm}"\n\nProperty listings coming soon! We'll show you verified properties in ${searchTerm}.`);
            } else {
                alert('Please enter a location to search (e.g., Lekki, Ikeja, Abuja)');
            }
        });
    }
    
    // Also allow Enter key to search
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    console.log('Tetherng website loaded successfully!');
});
