document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("getIpBtn").addEventListener("click", function () {
        const apiKey = "6241d5d1ee678ab4991c32af395739ea";
        
        fetch("https://api64.ipify.org?format=json")
            .then(response => response.json())
            .then(data => {
                const userIp = data.ip;
                
                return fetch(`https://api.ipstack.com/${userIp}?access_key=${apiKey}`);
            })
            .then(response => response.json())
            .then(ipData => {
                document.getElementById("ipInfo").style.display = "block";
                document.getElementById("ipInfo").innerHTML = `
                    <p><strong>IP Address:</strong> ${ipData.ip}</p>
                    <p><strong>City:</strong> ${ipData.city}</p>
                    <p><strong>Region:</strong> ${ipData.region_name}</p>
                    <p><strong>Country:</strong> ${ipData.country_name}</p>
                    <p><strong>Latitude:</strong> ${ipData.latitude}</p>
                    <p><strong>Longitude:</strong> ${ipData.longitude}</p>
                `;
            })
            .catch(error => {
                console.error("Error fetching IP info:", error);
                document.getElementById("ipInfo").innerHTML = "<p>Error fetching location data.</p>";
            });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const profileImage = document.querySelector("img");

    profileImage.addEventListener("mousemove", (event) => {
        const rect = profileImage.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        const rotateY = (x / rect.width) * 30; // Max rotation ±15° on Y-axis
        const rotateX = (-y / rect.height) * 30; // Max rotation ±15° on X-axis

        profileImage.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });

    // Reset rotation when the mouse leaves the image
    profileImage.addEventListener("mouseleave", () => {
        profileImage.style.transform = "rotateY(0deg) rotateX(0deg)";
    });
});
