"use strict";

function search() {
  let query = document.getElementById("searchField").value;
  if (!query) {
    display("Please enter a query.");
  } else {
    query = query.replace(' ', '+');
    let request = new XMLHttpRequest();
    request.responseType = 'json';
    request.open('GET', 'https://www.googleapis.com/books/v1/volumes?q=' + query, true);
    request.send();
    request.onload = () => display(request.response);
  }
}

function display(response) {
  console.log(response);
  if (!response) {
    document.getElementById("results").innerHTML = 'No results found.';
  } else if (typeof response == "object" && response.totalItems == 0) {
    document.getElementById("results").innerHTML = 'No results found.';
  } else if (typeof response == "string") {
    document.getElementById("results").innerHTML = response;
  } else if (typeof response == "object") {
    document.getElementById("results").innerHTML = '';
    for (let i = 0; i < response.items.length; i++) {
      let item = response.items[i];
      document.getElementById("results").innerHTML += constructItemBox(item);
    }
  }
}

/// authors, title, company, picture, link 
function constructItemBox(item) {
  let authors = item.volumeInfo.authors || ["no author"];
  let publisher = item.volumeInfo.publisher || "no publisher";
  let result = `<div class="bookItemBox">
    <img class="bookThumbnail" src="${ item.volumeInfo.imageLinks.thumbnail }" alt=" ${ item.volumeInfo.title }">
    <div class="bookDescription">
      <h1 class="bookTitle"> ${ item.volumeInfo.title } </h1>
      <h2 class="bookAuthor"> ${ authors.join(', ') || "No author" } </h2>
      <p class="bookCompany"> ${ publisher } </p>
      <a class="detailLink" href="${ item.volumeInfo.canonicalVolumeLink }"> See this book </a>
    </div>
    </div>`;
  return result; 
}
