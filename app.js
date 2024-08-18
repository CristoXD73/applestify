document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM fully loaded and parsed');

    const spotifyButton = document.getElementById('login-spotify');
    const appleButton = document.getElementById('login-apple');

    if (spotifyButton) {
        console.log('Spotify login button found');

        spotifyButton.addEventListener('click', function() { 
            console.log('Spotify login button clicked');

            const clientId = 'a1ea34c9507e427ab999847c1ecab5a4';
            const redirectUri = 'http://localhost:3000/';
            const scopes = 'user-read-private user-read-email';  // Example scopes

            const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

            console.log('Redirecting to Spotify auth URL:', authUrl);
            window.location.href = authUrl;
        });
    } else {
        console.log('Spotify login button not found');
    }

    if (appleButton) {
        appleButton.style.borderRadius = '20px';
    }

    // Extract access token from the URL fragment
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');

    if (accessToken) {
        console.log('Spotify Access Token:', accessToken);
        
        // Fetch user profile data from Spotify
        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });

            const userData = await response.json();
            console.log('Spotify User Data:', userData);

            // Display user data (display name and profile picture)
            const userProfile = document.getElementById('user-profile');
            if (userProfile) {
                userProfile.innerHTML = `
                    <h3>Welcome, ${userData.display_name}!</h3>
                    <img src="${userData.images[0]?.url}" alt="Profile Picture" style="border-radius: 50%; max-width: 200px; height: auto;">
                `;
            }
        } catch (error) {
            console.error('Error fetching Spotify user data:', error);
        }
    } else {
        console.log('No access token found in URL');
    }
});
