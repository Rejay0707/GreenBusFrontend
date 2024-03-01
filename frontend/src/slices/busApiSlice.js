// busApiService.js

export async function fetchTrips(from, to, date) {
    try {
        const response = await fetch(`YOUR_API_BASE_URL/findBus?from=${from}&to=${to}&date=${date}`);
        const data = await response.json();
        return data; // Return the data so it can be used in the component
    } catch (error) {
        console.error('Error fetching trips:', error);
        throw error; // Rethrow the error so it can be caught in the component
    }
}
