/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Logo from '../assets/images/logo.png';

function Nav() {
  return (
    <nav className=" my-container grid grid-cols-[1fr_3fr] grid-rows-2">
      <a href="#" className="lg: row-span-2">
        <img src={Logo} alt="2tsook logo" />
      </a>
      <Categories />
      <div className="search">
        <input type="text" />
        <button></button>
      </div>
    </nav>
  );
}

function Categories() {
  const categoriedIDs = [1, 2, 3, 4, 79];
  const [categories, setCategories] = useState([]);
  type categoriesType = {
    id: number;
    parentId: number;
    name: string;
  };

  useEffect(() => {
    fetch('http://mohagado-001-site1.itempurl.com/Category/GetAllCategories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(
          data.filter(
            (cat: categoriesType) =>
              categoriedIDs.indexOf(cat.id) >= 0 ||
              categoriedIDs.indexOf(cat.parentId) >= 0
          )
        );
      });
  }, []);
  return (
    <ul className="flex gap-14">
      <a href="#">Home</a>
      {categories.map((cat: categoriesType) => {
        if (cat.parentId === 0) {
          return <li key={`cat-${cat.id}`}>{cat.name}</li>;
        }
      })}
    </ul>
  );
}

export default Nav;
