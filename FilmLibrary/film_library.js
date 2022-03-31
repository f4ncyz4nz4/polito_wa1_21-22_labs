"use strict";

/*const dayjs = require("dayjs");

const dayjs = require("dayjs");
const isToday = require('dayjs/plugin/isToday');
dayjs.extend(isToday);

const sqlite = require("sqlite3");*/

//lab01

function Film(id, title, favorite = false, date, rating) {
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    this.date = date === undefined ? "" : dayjs(date).format('YYYY-MM-DD');
    this.rating = date === undefined ? "" : rating;
}

function FilmLibrary() {
    this.filmLibrary = [];
    /*const db = new sqlite.Database("./films.db", (err) => {
        if (err) {
            throw err;
        }
    });*/

    this.addNewFilm = (film) => this.filmLibrary.push(film);

    this.print = () => {
        this.filmLibrary
            .forEach((film) => {
                console.log(`Id: ${film.id}, Title: ${film.title}, Favourite: ${film.favorite}, Watch date: ${film.date}, Score: ${film.rating}`)
            })
    };

    this.sortByDate = () => {
        const result = this.filmLibrary;
        return result.sort((a, b) => {
            if (typeof a.date === "undefined")
                return 1;
            if (typeof b.date === "undefined")
                return -1;
            return a.date.isAfter(b) ? -1 : 1
        });
    };

    this.deleteFilm = (id) => {
        this.filmLibrary = this.filmLibrary.filter((film) => film.id !== id)
    };

    this.resetWatchedFilms = () => {
        this.filmLibrary.map((film) => film.date = undefined);
    };

    this.getRated = () => {
        this.filmLibrary.filter(film => film.rating > 0).sort((a, b) => a.rating - a.rating)
            .forEach((film) => console.log(`Id: ${film.id}, Title: ${film.title}, Favourite: ${film.favorite}, Watch date: ${film.date}, Score: ${film.rating}`));
    };

    //lab02
}
//lab03

function generateContentofTable(lib, filter) {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    lib.forEach((film) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `<td>${film.title}</td>
        <td>${film.favorite}</td><td>${film.date}</td><td>${film.rating}</td>`;
        tr.innerHTML += `<td><button type="button" class="btn btn-warning">
        <img class="float-end" src="./icons/trash.svg" alt="" width="20" height="24"></img></button></td>`;

        tbody.appendChild(tr);

        const deleteButton = tr.querySelector("button");

        deleteButton.addEventListener("click", (event) => {
            lib = lib.filter((f) => f.id !== film.id);
            generateContentofTable(lib, "All");
        });
    });
    const h2 = document.querySelector("h2");
    h2.innerText = filter;
}

//main
document.addEventListener("DOMContentLoaded", (event) => {
    const f1 = new Film(1, "Pulp Fiction", true, "2021-03-10", 5);
    const f3 = new Film(3, "Star Wars", false);
    const f2 = new Film(2, "21 Grams", true, "2022-01-21", 4);
    const f4 = new Film(4, "Matrix", true);
    const f5 = new Film(5, "Shrek", false, "2022-03-17", 3);
    const f7 = new Film(7, "Life is bad", true, "2022-11-21", 1);

    const flib = new FilmLibrary;

    flib.addNewFilm(f1);
    flib.addNewFilm(f2);
    flib.addNewFilm(f3);
    flib.addNewFilm(f4);
    flib.addNewFilm(f5);

    generateContentofTable(flib.filmLibrary, "All");

    document.getElementById("all").addEventListener("click", (event) => {
        generateContentofTable(flib.filmLibrary, "All");
    });

    document.getElementById("favorite").addEventListener("click", (event) => {
        generateContentofTable(flib.filmLibrary.filter((f) => (f.favorite)), "Favourite");
    });

    document.getElementById("bestRated").addEventListener("click", (event) => {
        generateContentofTable(flib.filmLibrary.filter((f) => (f.rating === 5)), "Best Rated");
    });

    document.getElementById("seenLastM").addEventListener("click", (event) => {
        generateContentofTable(flib.filmLibrary.filter((f) => {
            if (dayjs(f.date).isAfter(dayjs().subtract(30, "day")))
                return true;
            else
                return false;
        }), "Seen Last Month");
    });

});