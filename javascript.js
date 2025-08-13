"use strict";

let watchLater = [];
let temp = load();

if (temp) {
    watchLater = temp;
}

if (watchLater.length > 0) {
    for (let item of watchLater) {
        display(item);
    }
} 

function display(item) {
   let list = document.querySelector("ol");
   list.innerHTML += `<li>${item}</li>`;     
}

function addToList() {
   let enter = document.querySelector("#enter");
   let item = enter.value.trim();
   if (item.length > 0) {
      display(item);
      watchLater.push(item);
      saveList(watchLater);
   }
   enter.value = "";
   enter.focus();
}

function clearList() {
   watchLater = [];
   let list = document.querySelector("ol");
   list.innerHTML = "";
   clear();
}

function load() {
   let storedList = localStorage.getItem("list");
   if (storedList) {
      return storedList.split(",");
   } else {
      return [];
   }
}

function saveList(watchLater) {
   localStorage.setItem("list", watchLater.join(","));
}

function clear() {
   localStorage.removeItem("list");
}

$(function(){
    let movies = $("#movies");
    let img = `https://image.tmdb.org/t/p/w400/`;
    $.ajax({
        url: `https://api.themoviedb.org/3/movie/popular?api_key=0c2eb8e8ab1fd90b8dc4ff425303407d&language=en-US&page=1`,
        dataType: "json",
    }).done(function(data){
        let stuff = "";
        for(let i = 0; i < 8; i++){
            stuff += `<div class="movie"><img src="${img}${data.results[i].poster_path}" alt="${data.results[i].title}"></div>`;
        }
        movies.html(stuff);
    });
});


document.querySelector("#addToList").addEventListener("click", addToList);
document.querySelector("#clearList").addEventListener("click", clearList);