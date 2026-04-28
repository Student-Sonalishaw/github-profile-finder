async function getUser() {
  const username = document.getElementById("searchInput").value;

  const profileDiv = document.getElementById("profile");
  const reposDiv = document.getElementById("repos");

  profileDiv.innerHTML = "Loading...";
  reposDiv.innerHTML = "";

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    const userData = await userRes.json();

    if (userData.message === "Not Found") {
      profileDiv.innerHTML = "User not found ❌";
      return;
    }

    profileDiv.innerHTML = `
      <div class="card">
        <img src="${userData.avatar_url}">
        <h2>${userData.name || userData.login}</h2>
        <p>${userData.bio || "No bio available"}</p>
        <p>Followers: ${userData.followers}</p>
        <p>Following: ${userData.following}</p>
      </div>
    `;

    const repoRes = await fetch(userData.repos_url);
    const repoData = await repoRes.json();

    reposDiv.innerHTML = "<h2>Repositories</h2>";

    repoData.slice(0, 5).forEach(repo => {
      reposDiv.innerHTML += `
        <div class="repo">
          <h3>${repo.name}</h3>
          <p>⭐ ${repo.stargazers_count}</p>
        </div>
      `;
    });

  } catch (error) {
    profileDiv.innerHTML = "Error fetching data ⚠️";
  }
}