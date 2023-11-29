import { beforeEach, describe, expect, it } from 'vitest'
import { collections, items } from "@/config/data/splitSampleData.js";
import {
  existingItemData,
  newItemData,
  updatedItemData,
  newCollectionData,
  updatedCollectionData, existingCollectionData
} from "./mutationData.js";

import { setItem, deleteItem, createCollection, updateCollection, deleteCollection } from "@/common/stateMutation.jsx";

let newCollections;
let newItems;

function setMockCollections(mutator) {
  newCollections = mutator(collections);
}

function setMockItems(mutator) {
  newItems = mutator(items);
}

beforeEach(() => {
  newItems = {};
  newCollections = [];
});

describe('item mutators', () => {
  it('setItem should add a new item to the state', () => {
    setItem(newItemData, setMockItems);
    expect(Object.keys(newItems).length).toEqual(10);
    expect(newItemData.uuid in newItems).toBe(true);
  })

  it('setItem should update an item in the state', () => {
    setItem(updatedItemData, setMockItems);
    expect(Object.keys(newItems).length).toEqual(9);
    expect(newItems[updatedItemData.uuid].data.password).toEqual(updatedItemData.data.password);
  })

  it('deleteItem should delete an item from the state', () => {
    deleteItem(existingItemData, setMockItems);
    expect(Object.keys(newItems).length).toEqual(8);
    expect(existingItemData.uuid in newItems).toBe(false);
  })
});

describe('collection mutators', () => {
  it('createCollection should add a new collection to the state', () => {
    createCollection(newCollectionData, setMockCollections);
    expect(newCollections.length).toEqual(4);
    expect(newCollections.filter(collection => collection.uuid === newCollectionData.uuid).length).toEqual(1);
  })

  it('updateCollection should update a collection in the state', () => {
    updateCollection(updatedCollectionData, setMockCollections);
    expect(newCollections.length).toEqual(3);
    expect(newCollections.filter(collection => collection.uuid === updatedCollectionData.uuid)[0].name)
      .toEqual(updatedCollectionData.name);
  })

  it('deleteCollection should delete a collection and all associated items from the state', () => {
    deleteCollection(existingCollectionData, setMockCollections, setMockItems);
    expect(newCollections.length).toEqual(2);
    expect(Object.keys(newItems).length).toEqual(6);
  })
});
