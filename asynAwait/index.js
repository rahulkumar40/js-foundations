async function fetchData() {
    try {
        // Pauses here until the fetch promise resolves
        const response = await fetch('https://api.example.com/data');
        
        // Pauses again until the JSON is parsed
        const data = await response.json();
        
        console.log(data);
    } catch (error) {
        // Standard try/catch for error handling
        console.error("Fetch failed:", error);
    }
}
fetchData();
