const form = document.querySelector("#searchForm");
const resultsDiv = document.querySelector("#results");
const loadingDiv = document.querySelector("#loading");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  resultsDiv.innerHTML = "";
  loadingDiv.style.display = "block";

  const searchTerm = form.elements.query.value;
  const config = { params: { q: searchTerm } };
  try {
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    displayResults(res.data);
  } catch (error) {
    resultsDiv.innerHTML = "<p>Something went wrong. Please try again.</p>";
  } finally {
    loadingDiv.style.display = "none";
  }

  form.elements.query.value = ""; // Clear input
});

const displayResults = (shows) => {
  if (shows.length === 0) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
  } else {
    for (let result of shows) {
      if (result.show.image) {
        const img = document.createElement("img");
        img.src = result.show.image.medium;
        resultsDiv.append(img);
      }
    }
  }
};
