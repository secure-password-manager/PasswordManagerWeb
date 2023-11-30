function setItem(itemData, setItems) {
  setItems(items => ({
    ...items,
    [itemData.uuid]: itemData
  }))
}

function deleteItem(itemData, setItems) {
  setItems(items => {
    const {[itemData.uuid]: _, ...rest} = items;
    return rest;
  })
}

function createCollection(collectionData, setCollections) {
  setCollections(collections => [
    ...collections,
    collectionData
  ])
}

function updateCollection(collectionData, setCollections) {
  setCollections(collections => collections.map(
    collection => collection.uuid === collectionData.uuid ? collectionData : collection)
  )
}

function deleteCollection(collectionData, setCollections, setItems) {
  setCollections(collections => collections.filter(collection => collection.uuid !== collectionData.uuid));
  setItems((items) => Object.keys(items)
                            .filter(key => items[key]["vault_collection"] !== collectionData.uuid)
                            .reduce( (result, key) => (result[key] = items[key], result), {} )
  );
}

export { setItem, deleteItem, createCollection, updateCollection, deleteCollection }