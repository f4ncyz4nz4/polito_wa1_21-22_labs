"use strict";

const dayjs=require("dayjs");

//0)
const arr=["spring", "abcd", "cabina", "cat", "it"];
let new_arr=[];

function trans(arr, new_arr){
    new_arr=arr.map( (element) =>{
        if(element.length<2)
            return "";
        return element.slice(0,2)+element.slice(-2);
    } );
    return new_arr;
}

//console.log(arr);
//console.log(trans(arr,new_arr));

//1) /2)
function Film(id, title, favourites=false, date, rating){
    this.id=id;
    this.title=title;
    this.favourites=favourites;
    this.date=date && dayjs(date);
    this.rating=rating;
}

function FilmLibrary(){
    this.filmLibrary=[];

    this.addNewFilm = (film) => this.filmLibrary.push(film);

    this.print = () => {this.filmLibrary
        .forEach((film) =>{console.log(`Id: ${film.id}, Title: ${film.title}, Favourite: ${film.favourites}, Watch date: ${film.date}, Score: ${film.rating}`)})};

    this.sortByDate = () => {
        const result = this.filmLibrary; 
        return result.sort((a, b) => {
            if(typeof a.date === "undefined")
                return 1;
            if(typeof b.date === "undefined")
                return -1;
            return a.date.isAfter(b)? -1: 1
        });
    };

    this.deleteFilm = (id) =>{
        this.filmLibrary=this.filmLibrary.filter((film)=>film.id!==id)
    };

    this.resetWatchedFilms = () => {
        this.filmLibrary.map((film)=>film.date=undefined);
    };

    this.getRated = () => {
        this.filmLibrary.filter(film => film.rating>0).sort((a, b) => a.rating-a.rating)
            .forEach((film) => console.log(`Id: ${film.id}, Title: ${film.title}, Favourite: ${film.favourites}, Watch date: ${film.date}, Score: ${film.rating}`));
    };
}

//-----------------------------------

const f1=new Film(1,"Pulp Fiction",true,"2021-03-10",5);
const f3=new Film(3,"Star Wars",false);
const f2=new Film(2,"21 Grams",true,"2022-01-21",4);
const f4=new Film(4,"Matrix",true);
const f5=new Film(5,"Shrek",false,"2022-03-17",3);

const flib=new FilmLibrary;
const sort_flib=new FilmLibrary;

flib.addNewFilm(f1);
flib.addNewFilm(f2);
flib.addNewFilm(f3);
flib.addNewFilm(f4);
flib.addNewFilm(f5);

//console.log(f2);

//sort_flib.filmLibrary=flib.sortByDate();
//sort_flib.print();

//flib.deleteFilm(3);

//flib.resetWatchedFilms();

//flib.getRated();

//flib.print();

//debugger;