// Search when pressing Enter
document.getElementById("searchInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getUser();
  }
});

async function getUser() {
  const username = document.getElementById("searchInput").value.trim();

  const profileDiv = document.getElementById("profile");
  const reposDiv = document.getElementById("repos");

  // Input check
  if (!username) {
    profileDiv.innerHTML = "⚠️ Please enter a username";
    reposDiv.innerHTML = "";
    return;
  }

  // Show loader
  profileDiv.innerHTML = "<div class='loader'></div>";
  reposDiv.innerHTML = "";

  try {
    // Fetch user data
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    const userData = await userRes.json();

    // Error handling
    if (userData.message === "Not Found") {
      profileDiv.innerHTML = "❌ User not found";
      return;
    }

    // Show profile
    profileDiv.innerHTML = `
      <div class="card">
        <img src="${userData.avatar_url}" alt="Profile Image">
        <h2>${userData.name || userData.login}</h2>
        <p>${userData.bio || "No bio available"}</p>
        <p>📍 ${userData.location || "No location"}</p>
        <p>👥 Followers: ${userData.followers}</p>
        <p>➡️ Following: ${userData.following}</p>
        <p>📦 Public Repos: ${userData.public_repos}</p>
      </div>
    `;

    // Fetch repos
    const repoRes = await fetch(userData.repos_url);
    const repoData = await repoRes.json();

    reposDiv.innerHTML = "<h2>Repositories</h2>";

    repoData.slice(0, 6).forEach(repo => {
      reposDiv.innerHTML += `
        <div class="repo">
          <h3>${repo.name}</h3>
          <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</p>
          <a href="${repo.html_url}" target="_blank">View Repo</a>
        </div>
      `;
    });

  } catch (error) {
    profileDiv.innerHTML = "⚠️ Error fetching data";
  }
}

// Dark/Light mode toggle
function toggleTheme() {
  document.body.classList.toggle("light");
}