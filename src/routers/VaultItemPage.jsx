import React from "react";
import { useParams } from "react-router-dom";
import sampleData from "../config/data/sampleData";

function VaultItemPage() {
  const { collectionsId, vaultId } = useParams();
  const collection = sampleData.filter(
    (collection) => collection.name === collectionsId
  )[0];
  const vault = collection.vault_items.filter(
    (item) => item.encrypted_data === vaultId
  )[0];

  console.log(vault);
  return (
    <>
      <h1>VaultPage</h1>
      <ul>
        <li>{vault.encrypted_data}</li>
        <li>{vault.uuid}</li>
        <li>{vault.created_at}</li>
        <li>{vault.modified_at}</li>
      </ul>
    </>
  );
}

export default VaultItemPage;
