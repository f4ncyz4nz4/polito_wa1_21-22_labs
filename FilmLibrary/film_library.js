"use strict";

const dayjs=require("dayjs");
const isToday = require('dayjs/plugin/isToday');
dayjs.extend(isToday);

const sqlite=require("sqlite3");

//lab01

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

function Film(id, title, favourites=false, date, rating){
    this.id=id;
    this.title=title;
    this.favourites=favourites;
    this.date=date && dayjs(date);
    this.rating=rating;
}

function FilmLibrary(){
    this.filmLibrary=[];
    const db = new sqlite.Database("./films.db", (err) => {
        if(err){
            throw err;
        }
    });

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

//lab02

    this.getAll = () =>{
        return new Promise( (resolve, reject) => {
            const sql = "SELECT * FROM films";
            db.all(sql, (err,rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows.map((f)=>new Film(f.id, f.title, f.favorite, f.watchdate, f. rating)));
                }
            });
        });
    };

    this.getAllFavourite = () => {
        return new Promise( (resolve, reject) => {
            const sql = "SELECT * FROM films";
            db.all(sql, (err, rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows
                        .filter((f)=>(f.favorite))
                        .map((f)=>new Film(f.id, f.title, f.favorite, f.watchdate, f. rating)));
                }
            });
        });
    };

    this.getWatchedToday = () => {
        return new Promise( (resolve, reject) => {
            const sql = "SELECT * FROM films";
            db.all(sql, (err, rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows
                        .filter((f)=>(dayjs(f.watchdate).isToday()))
                        .map((f)=>new Film(f.id, f.title, f.favorite, f.watchdate, f. rating)));
                }
            });
        });
    };

    this.getWatchedEarlier = (date) => {
        return new Promise( (resolve, reject) => {
            const sql = "SELECT * FROM films";
            db.all(sql, (err, rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows
                        .filter((f)=>(dayjs(f.watchdate).isBefore(dayjs(date))))
                        .map((f)=>new Film(f.id, f.title, f.favorite, f.watchdate, f. rating)));
                }
            });
        });
    };

    this.getRatedEqualOrMoreThan = (rate) => {
        return new Promise( (resolve, reject) => {
            const sql = "SELECT * FROM films";
            db.all(sql, (err, rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows
                        .filter((f)=>(f.rating>=rate))
                        .map((f)=>new Film(f.id, f.title, f.favorite, f.watchdate, f. rating)));
                }
            });
        });
    };

    this.getTitle = (title) => {
        return new Promise( (resolve, reject) => {
            const sql = "SELECT * FROM films";
            db.all(sql, (err, rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows
                        .filter((f)=>(f.title===title))
                        .map((f)=>new Film(f.id, f.title, f.favorite, f.watchdate, f.rating)));
                }
            });
        });
    };

    this.storeMovie = (film) => {
        return new Promise( (resolve, reject) => {
            const sql = "INSERT INTO films (id, title, favorite, watchdate, rating) VALUES (?, ?, ?, ?, ?)";
            db.run(sql, [film.id, film.title, film.favourites, film.date, film.rating], (err)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        });
    };

    this.deleteMovie = (id) => {
        return new Promise( (resolve, reject) => {
            const sql = "DELETE FROM films WHERE id=?";
            db.run(sql, [id], (err)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        });
    };

    this.deleteWatchDate = () => {
        return new Promise( (resolve, reject) => {
            const sql = "UPDATE films SET watchdate = NULL";
            db.run(sql, (err)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        });
    };

}

//-----------------------------------

const f1=new Film(1,"Pulp Fiction",true,"2021-03-10",5);
const f3=new Film(3,"Star Wars",false);
const f2=new Film(2,"21 Grams",true,"2022-01-21",4);
const f4=new Film(4,"Matrix",true);
const f5=new Film(5,"Shrek",false,"2022-03-17",3);
const f7=new Film(7,"Life is bad",true,"2022-11-21",1);

const flib=new FilmLibrary;

flib.addNewFilm(f1);
flib.addNewFilm(f2);
flib.addNewFilm(f3);
flib.addNewFilm(f4);
flib.addNewFilm(f5);

flib.getAll().then((list)=>{console.log(list);});
flib.getAllFavourite().then((list)=>{console.log(list);});
flib.getWatchedToday().then((list)=>{console.log(list);});
flib.getWatchedEarlier("2022-03-20").then((list)=>{console.log(list);});
flib.getRatedEqualOrMoreThan(2).then((list)=>{console.log(list);});
flib.getTitle("21 Grams").then((list)=>{console.log(list);});
flib.storeMovie(f7).then(()=>console.log("Succesfully inserted"));
flib.deleteMovie(7).then(()=>console.log("Succesfully deleted"));
flib.deleteWatchDate().then(()=>console.log("Succesfully modify watchdate"));