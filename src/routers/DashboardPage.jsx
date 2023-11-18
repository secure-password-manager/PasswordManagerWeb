import React from "react";
import { Outlet, Link } from "react-router-dom";
import sampleData from "../config/data/sampleData";
import NewItemForm from "../components/NewItemForm";

function DashboardPage() {
  const collections = sampleData;
  return (
    <>
      <h1>Dashboard Page</h1>
      <ul>
        <li>
          <NewItemForm />
        </li>
        {collections.map((collection) => {
          return (
            <li key={collection.uuid}>
              <Link to={`collections/${collection.uuid}`}>
                {collection.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <Outlet />
    </>
  );
}

export default DashboardPage;
