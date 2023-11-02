import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import sampleData from "../config/data/sampleData";

function CollectionsPage() {
  const { collectionsId } = useParams();
  const collectionArr = sampleData.filter((data) => {
    return collectionsId === data.uuid;
  });
  // Assume unique collection name
  const collection = collectionArr[0];
  return (
    <>
      <h1>Collection Page</h1>
      {collection.vault_items ? (
        <ul>
          {collection.vault_items.map((item) => {
            return (
              <li key={item.uuid}>
                <Link to={`vaultItem/${item.uuid}`}>
                  {item.encrypted_data}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
      <Outlet></Outlet>
    </>
  );
}

export default CollectionsPage;
