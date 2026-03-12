// Initialize Firestore instance
const db = firebase.firestore();

async function searchArtist() {
    const container = document.getElementById("artistList");
    const locInput = document.getElementById("searchLocation").value.trim();
    const catInput = document.getElementById("category").value;

    // 1. Initial State: Display "Searching..."
    container.innerHTML = `
        <div class="status-msg">
            <p>🔍 Searching for the best artists in ${locInput || 'your area'}...</p>
        </div>
    `;

    try {
        // 2. Fetch Data from Firestore
        const snapshot = await db.collection("artists")
            .where("location", "==", locInput)
            .get();

        let results = [];
        snapshot.forEach(doc => {
            let data = doc.data();
            // Apply category filter if one is selected
            if (catInput === "" || data.category === catInput) {
                results.push(data);
            }
        });

        // 3. Conditional Display: Success vs Not Found
        if (results.length > 0) {
            displayArtists(results);
        } else {
            container.innerHTML = `
                <div class="status-msg">
                    <p>❌ No artists found. Try a different city or category.</p>
                </div>
            `;
        }

    } catch (error) {
        console.error("Error:", error);
        container.innerHTML = "<p>⚠️ Something went wrong. Please try again.</p>";
    }
}

function displayArtists(list) {
    let container = document.getElementById("artistList");
    container.innerHTML = ""; // Clear the searching message

    list.forEach(artist => {
        container.innerHTML += `
            <div class="artist-card">
                <span class="category-badge">${artist.category}</span>
                <h3>${artist.name}</h3>
                <p>📍 ${artist.location}</p>
                <button class="contact-btn" onclick="window.location.href='tel:${artist.phone}'">
                    Call: ${artist.phone}
                </button>
            </div>
        `;
    });
}