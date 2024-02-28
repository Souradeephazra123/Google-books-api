"use client";
import React, { useState, useEffect, useContext } from "react";
import { debounce } from "lodash"; // Import debounce function from lodash library
import { useCallback } from "react";
const Appcontext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("the lost world");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState("");
  const [index, setIndex] = useState(0);
  const fetchBooks = useCallback(
    async (filterType) => {
      setLoading(true);
      try {
        let filterParam = "";
        if (filterType === "free") {
          filterParam = "&filter=free-ebooks";
        } else if (filterType === "paid") {
          filterParam = "&filter=paid-ebooks";
        }
        const response = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            searchTerm +
            "&projection=lite" +
            "&startIndex=" +
            index +
            "&maxResults=10" +
            filterParam +
            "&key=AIzaSyBABll8mysePCgIKuYlHNB-AAfq3JblrGI"
        );
        const data = await response.json();
        const { items } = data;
        console.log(items);
        if (items) {
          const newBooks = items.map((item) => {
            const {
              id,
              volumeInfo: {
                title,
                authors,
                imageLinks: { thumbnail },
                infoLink,
                publishedDate,
                description,
                maturityRating,
                categories,
              },

              saleInfo: { saleability, retailPrice, buyLink } = {},
            } = item;
            return {
              id,
              title,
              authors,
              thumbnail,
              infoLink,
              publishedDate,
              description,
              maturityRating,
              categories,
              saleability,
              amount: retailPrice?.amount, // Use optional chaining
              currencyCode: retailPrice?.currencyCode, // Use optional chaining
              buyLink,
            };
          });
          // setBooks(newBooks);
          setBooks((prevBooks) => [...prevBooks, ...newBooks]);
          // console.log("These are books",books)
          setResultTitle("Search Results");
        } else {
          setBooks([]);
          setResultTitle("No Books Found");
        }
        // setLoading(false);
      } catch (error) {
        console.log(error);
        // setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, index]
  );

  useEffect(() => {
    if (searchTerm !== "the lost world") {
      fetchBooks();
    }
  }, [searchTerm, fetchBooks, index]);

  // Define the debounced version of the handelInfiniteScroll function
  const debouncedScrollHandler = useCallback(
    debounce(() => {
      if (
        !loading &&
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setIndex((prevIndex) => prevIndex + 10);
        setLoading(false);
      }
    }, 200), // Adjust debounce delay as needed
    [loading]
  );

  // Attach the debounced scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", debouncedScrollHandler);
    return () => window.removeEventListener("scroll", debouncedScrollHandler);
  }, [debouncedScrollHandler]);

  useEffect(() => {
    console.log("These are books", books);
    console.log("startindex", index);
  }, [books, index]);

  return (
    <Appcontext.Provider
      value={{
        setResultTitle,
        setSearchTerm,
        books,
        loading,
        resultTitle,
        
      }}
    >
      {children}
    </Appcontext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Appcontext);
};

export { AppProvider, Appcontext };
