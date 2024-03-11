import React from "react";

const Sidebar = ({ isOpen }) => {
  const cats = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    { id: 3, name: "Category 3" },
  ];
  return (
    <div className={`bg-white w-64 h-auto ${isOpen ? "fixed" : "hidden"}`} style={{ height: "calc(100vh - 64px)", top: "64px" }}>
      <div className="p-4 h-auto">
        <p className="border-b-2 text-xl font-bold">Categories</p>
        <ul className="mt-4">
          {cats.map((cat) => (
            <li key={cat.id} className="py-2">
              <button className="text-gray-700 hover:font-semibold">{cat.name}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
