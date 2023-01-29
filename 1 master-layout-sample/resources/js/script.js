/*
 ********************** Scroll to Top  ********************
 */

const toTopButton = document.getElementById("scroll-to-top");

window.onscroll = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    toTopButton.style.display = "flex";
  } else {
    toTopButton.style.display = "none";
  }
};

const scrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

/*
 ********************** Joke Fetch By Category ********************
 */

const categoryButton = document.getElementById("submit-button");
categoryButton.addEventListener("click", fetchJokeCategory);
const jokeContainer = document.getElementById("joke-container");

async function fetchJokeCategory() {
  const category = document.getElementById("joke-categories").value;
  if (category) {
    const response = await fetch(
      `https://api.chucknorris.io/jokes/random?category=${category}`
    );
    if (!response.ok) {
      console.log(
        "An error occurred while fetching the joke: " + response.statusText
      );
      return;
    }
    const data = await response.json();
    console.log(data);
    jokeContainer.innerHTML = `<p class="joke-display"> ${data.value} </p>`;
    // jokeContainer.style.display = "block";
    // used if joke is not initially displayed
  }
}

/*
 ********************** Joke Fetch By Keyword ********************
 */

const submitButton = document.getElementById("search-button");
const searchKeyword = document.getElementById("search-keyword");
searchKeyword.addEventListener("focus", function () {
  searchKeyword.value = "";
  searchKeyword.placeholder = "";
});
submitButton.addEventListener("click", fetchJoke);

async function fetchJoke() {
  let keyword = searchKeyword.value;
  const jokeContainer = document.getElementById("joke-container");
  if (keyword) {
    const response = await fetch(
      `https://api.chucknorris.io/jokes/search?query=${keyword}`
    );
    if (!response.ok) {
      console.log(
        "An error occurred while fetching the joke: " + response.statusText
      );
      return;
    }
    const data = await response.json();
    if (data.total > 0) {
      jokeContainer.innerHTML = `<p class="joke-display"> ${data.result[0].value} </p>`;
      // jokeContainer.style.display = "block";
      // used if joke is not initially displayed
      searchKeyword.value = "";
    } else {
      // console.log("No jokes found with the keyword: " + keyword);
      jokeContainer.innerHTML = `<p class="joke-display">No jokes were found with the keyword: ${keyword}.</p>`;
    }
  }
  searchKeyword.placeholder = "Enter a keyword";
}
