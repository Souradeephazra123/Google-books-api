"use client";
import React from "react";
import Link from "next/link";
import { useGlobalContext } from "../context";
import { useSearchParams } from "next/navigation";
import Loader from "../Loader/Loader";
import Image from "next/image";
const Book = () => {
  const searchParams = useSearchParams();
  const properties = searchParams.get("search");
  console.log("This is properties", properties);
  const { books, loading } = useGlobalContext();

  const sbook = books.find((book) => book.id === properties);
  console.log(sbook);

  if (loading) {
    <Loader />;
  }
  if (!sbook) {
    <p>Book no Found</p>;
  }

  const {
    title,
    authors,
    thumbnail,
    infoLink,
    publishedDate,
    description,
    maturityRating,
  } = sbook;

  return (
    <div>
      {sbook && (
        <div className="flex flex-col gap-3 mx-auto items-center text-center">
          {" "}
          <div className="book w-[260px] h-auto ">
            <Image
              src={thumbnail}
              alt={title}
              width={260}
              height={150}
              className=" object-center object-fill  w-[220px] h-[250px]"
            />
          </div>
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
          <div>
            {" "}
            <span className="text-md font-semibold">Description : </span>
            <span>{description}</span>
          </div>
          <div>Rating: {maturityRating}</div>
        </div>
      )}
    </div>
  );
};

export default Book;
