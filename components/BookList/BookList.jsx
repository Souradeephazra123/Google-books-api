"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import Loader from "../Loader/Loader";
import Image from "next/image";
import Link from "next/link";

const BookList = () => {
  const { books, loading, resultTitle, setSearchTerm } =
    useGlobalContext();
  const [filterPubBooks, setFilterPubBooks] = useState([]);
  const [filterPrice, setFilterPrice] = useState([]);
  const [filterType, setfilterType] = useState("");

  // Function to fetch books with the desired filter type
  // const fetchFilteredBooks = async (filter) => {
  //   setfilterType(filter); // Set the filter type state
  //   setSearchTerm("the lost world"); // Reset search term to fetch new books
  //   setFilterPrice([]); // Clear previous books
  //   await fetchBooks(filter); // Fetch books with the specified filter
  // };

  // useEffect to fetch books initially
  // useEffect(() => {
  //   fetchFilteredBooks(""); // Fetch all books initially
  // }, []);

  // const handleOptionChange = (e) => {
  //   const selectedPrice = e.target.value;
  //   if (selectedPrice === "Free") {
  //     fetchBooks("free"); // Pass filter type as "free"
  //   } else if (selectedPrice === "Paid") {
  //     fetchBooks("paid"); // Pass filter type as "paid"
  //   } else {
  //     fetchBooks(""); // Fetch all books
  //   }
  // };
  // useEffect(() => {
  //   console.log("Filtered Books:", filterPubBooks);
  // }, [filterPubBooks]); // Log whenever filterPubBooks changes

  // useEffect(() => {
  //   console.log(filterPrice);
  // }, []);

  const handlePublication = (e) => {
    let filter = [...books];
    const selected = e.target.value;
    if (selected === "pubLowToHigh") {
      filter = filter.sort((a, b) => b.publishedDate - a.publishedDate);
    } else {
      filter = filter.sort((a, b) => a.publishedDate - b.publishedDate);
    }
    setFilterPubBooks(filter);
  };
  const handleCategory = (e) => {
    let filter = [...books];
    const selectedCat = e.target.value;
    if (selectedCat) {
      filter = filter.filter((book) => {
        // const { categories } = book;
        // return categories && categories.includes(selectedCat);
      });
    }
    setFilterPubBooks(filter);
    console.log("category", filterPubBooks);
  };
  useEffect(() => {
    console.log(
      "this is from pulisication filter in Booklist.js",
      filterPubBooks
    );
  }, [books]);

  const BookWithCovers = books.map((book) => {
    const {
      id,
      title,
      authors,
      thumbnail,
      infoLink,
      publishedDate,
      categories,
      description
    } = book;
    const handleStore = () => {
      // Get the current array of favourite book IDs from localStorage
      const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

      // Add the current book's ID to the array
      favourites.push(id);

      // Store the updated array in localStorage
      localStorage.setItem("favourites", JSON.stringify(favourites));
      // history.push("/store");
    };
    return (
      <div
        key={id}
        className="book w-[260px] h-auto flex flex-col gap-3 mx-auto items-center text-center"
      >
        <Link
          href={{ pathname: `/book/${id}`, query: { search: id } }}
          rel="noreferrer"
        >
          <Image
            src={thumbnail}
            alt={title}
            width={260}
            height={150}
            className=" object-center object-fill  w-[220px] h-[250px]"
          />
          {/* <img src={thumbnail} alt={title} /> */}
        </Link>
        <h2 className="text-xl font-semibold text-center">{title}</h2>
        <div>
          <span className="text-md font-semibold">Author : </span>
          <span>{authors}</span>
        </div>
        <div>
          <span className="text-md font-semibold">FIrst Published Year : </span>
          <span>{publishedDate}</span>
        </div>
        <button
          className="bg-yellow-400 rounded-md px-3 py-2"
          onClick={handleStore}
        >
          Add to Favourite
        </button>
      </div>
    );
  });

  if (loading) {
    return <Loader />;
  } else {
    return (
      <section className="booklist p-5 bg-rose-400">
        <h2>{resultTitle}</h2>
        <h2>Filter Data</h2>
        <div className="flex justify-between w-[100%]">
          <div className="flex flex-col gap-3">
            <label htmlFor="price">Price</label>
            <select id="price" onChange={handleOptionChange} className=" w-fit">
              <option>Select any option</option>
              <option value="Free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="category">Category</label>
            <select id="category" onChange={handleCategory} className=" w-fit">
              <option>Select any option</option>
              <option value="Flower language">Flower language</option>
              <option value="Belgian-French essays">
                Belgian-French essays
              </option>
              <option value="Christian life">Christian life</option>
              <option value="Botany">Botany</option>
              <option value="English poetry">English poetry</option>
            </select>
          </div>

          {/* Publication filter */}
          <div className="flex flex-col gap-3">
            <label htmlFor="publication">Publication</label>
            <select
              id="publication"
              onChange={handlePublication}
              className=" w-fit"
            >
              <option>Select any option</option>
              <option value="pubLowToHigh">Publication - low to High</option>
              <option value="pubHighToLow">Publication - high to low</option>
            </select>
          </div>
        </div>
        <div className="books flex flex-wrap gap-5 justify-center">
          {BookWithCovers}
        </div>
      </section>
    );
  }
};

export default BookList;
