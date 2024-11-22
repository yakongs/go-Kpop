/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       <Sohyeon Kim>
 *      Student ID: <117785220>
 *      Date:       <11-03-2023>
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
//console.log({ artists, songs }, "App Data");
function createSongCard(song) {
  const card = document.createElement("div");
  card.className = "card";

  const songImg = document.createElement("img");
  songImg.src = song.imageUrl;
  songImg.alt = song.title;
  songImg.width = "180";
  songImg.classList.add("card-image");

  const songName = document.createElement("h4");
  songName.textContent = song.title;

  const yearRecorded = document.createElement("time");
  yearRecorded.textContent = song.year;

  const duration = document.createElement("span");
  duration.textContent = `${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(
    2,
    "0"
  )}`;

  card.appendChild(songImg);
  card.appendChild(songName);
  card.appendChild(yearRecorded);
  card.appendChild(duration);

  // Add event listener for opening the song URL in a new tab
  card.addEventListener("click", () => window.open(song.url, "_blank"));

  return card;
}

function listSongs(artistId) {
  let songsByArtist = songs.filter((song) => song.artistId === artistId);

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""; // Clear existing cards

  songsByArtist.forEach((song) => {
    const card = createSongCard(song);
    cardContainer.appendChild(card);
  });
}

function listArtists(artists) {
  console.log("listing artists");
  // buttons
  const menu = document.getElementById("menu");
  const buttonMenu = document.createElement("div");
  buttonMenu.className = "buttonMenu";
  menu.appendChild(buttonMenu);

  // table
  artists.forEach((artist) => {
    const artistButton = document.createElement("button");
    artistButton.className = "button";
    artistButton.textContent = artist.name;
    buttonMenu.appendChild(artistButton);

    artistButton.addEventListener("click", () => {
      const title = document.getElementById("selected-artist");
      title.textContent = artist.name + " (";

      const website = document.createElement("a");
      website.href = artist.urls[0].url;
      website.textContent = "Website, ";
      website.target = "_blank";
      title.appendChild(website);

      const Wikipedia = document.createElement("a");
      Wikipedia.href = artist.urls[1].url;
      Wikipedia.textContent = "Wikipedia, ";
      Wikipedia.target = "_blank";
      title.appendChild(Wikipedia);

      const Instagram = document.createElement("a");
      Instagram.href = artist.urls[2].url;
      Instagram.textContent = "Instagram";
      Instagram.target = "_blank";
      title.appendChild(Instagram);
      title.innerHTML += ")";

      listSongs(artist.artistId);
    });
  });
}

function onLoad() {
  console.log("loaded");
  listArtists(artists);
}

window.addEventListener("load", onLoad);
