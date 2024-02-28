"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import Loader from "../Loader/Loader";
import Link from "next/link";

const Favourite = () => {
  // let id=localStorage.getItem('bookId')
  //   if (typeof window !== "undefined") {
  //     const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  //   }
  const [Favourite, setFavourite] = useState([]);

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourite(favourites);
  }, []);
  //   const id = JSON.parse(localStorage.getItem("bookId") || "");
  console.log("favourites", Favourite);

  const { books, loading } = useGlobalContext();
  console.log("books from favourite", books);
  const [arr, setArr] = useState([]);
  useEffect(() => {
    const array = books.filter((book) => {
      return Favourite.includes(book.id);
    });
    setArr(array);
  }, [Favourite, books]);

  console.log("arr", arr);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className=" bg-rose-400 pt-10">
      {arr.map((book) => {
        const {
          id,
          title,
          authors,
          thumbnail,
          infoLink,
          publishedDate,
          description,
          maturityRating,
        } = book;
        return (
          <div className="book w-[260px] h-auto flex flex-col gap-3 mx-auto items-center text-center">
            <Link
              href={{ pathname: `/book/${id}`, query: { search: id } }}
              rel="noreferrer"
            >
              <img
                src={thumbnail}
                alt={title}
                className="w-[220px] h-[250px]"
              />
            </Link>
            <h2 className="text-xl font-semibold text-center">{title}</h2>
            <div>
              <span className="text-md font-semibold">Author : </span>
              <span>{authors}</span>
            </div>
            <div>
              <span className="text-md font-semibold">
                FIrst Published Year :{" "}
              </span>
              <span>{publishedDate}</span>
            </div>
            <div>Description: {description}</div>
            <div>Rating: {maturityRating}</div>
          </div>
        );
      })}
    </div>
  );
};
//   const sbook = books.find((book) => book.id === properties);
//   console.log(sbook);

//   if (loading) {
//     <Loader />;
//   }
//   if (!sbook) {
//     <p>Book no Found</p>;
//   }

//   const {
//     title,
//     authors,
//     thumbnail,
//     infoLink,
//     publishedDate,
//     description,
//     maturityRating,
//   } = sbook;

//   return (
//     <div>
{
  /* {sbook && (
        <div className="book w-[260px] h-auto flex flex-col gap-3 mx-auto items-center text-center">
          <Image
            src={thumbnail}
            alt={title}
            width={260}
            height={150}
            className=" object-center object-fill  w-[220px] h-[250px]"
          />

          <h2 className="text-xl font-semibold text-center">{title}</h2>
          <div>
            <span className="text-md font-semibold">Author : </span>
            <span>{authors}</span>
          </div>
          <div>
            <span className="text-md font-semibold">
              FIrst Published Year :{" "}
            </span>
            <span>{publishedDate}</span>
          </div>
          <div>Description: {description}</div>
          <div>Rating: {maturityRating}</div>
        </div>
      )} */
}
//     </div>
//   );
// };

export default Favourite;
