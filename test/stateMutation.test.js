import { beforeEach, describe, expect, it } from 'vitest'
import { collections, items } from "@/config/data/splitSampleData.js";
import {
  existingItemData,
  newItemData,
  updatedItemData,
  newCollectionData,
  updatedCollectionData,
  existingCollectionData
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
    expect(Object.keys(items).length).toEqual(9);
    setItem(newItemData, setMockItems);
    expect(Object.keys(newItems).length).toEqual(10);
    expect(newItemData.uuid in newItems).toBe(true);
  })

  it('setItem should update an item in the state', () => {
    expect(Object.keys(items).length).toEqual(9);
    setItem(updatedItemData, setMockItems);
    expect(Object.keys(newItems).length).toEqual(9);
    expect(newItems[updatedItemData.uuid].data.password).toEqual(updatedItemData.data.password);
  })

  it('deleteItem should delete an item from the state', () => {
    expect(Object.keys(items).length).toEqual(9);
    deleteItem(existingItemData, setMockItems);
    expect(Object.keys(newItems).length).toEqual(8);
    expect(existingItemData.uuid in newItems).toBe(false);
  })
});

describe('collection mutators', () => {
  it('createCollection should add a new collection to the state', () => {
    expect(collections.length).toEqual(3);
    createCollection(newCollectionData, setMockCollections);
    expect(newCollections.length).toEqual(4);
    expect(newCollections.filter(collection => collection.uuid === newCollectionData.uuid).length).toEqual(1);
  })

  it('updateCollection should update a collection in the state', () => {
    expect(collections.length).toEqual(3);
    updateCollection(updatedCollectionData, setMockCollections);
    expect(newCollections.length).toEqual(3);
    expect(newCollections.filter(collection => collection.uuid === updatedCollectionData.uuid)[0].name)
      .toEqual(updatedCollectionData.name);
  })

  it('deleteCollection should delete a collection and all associated items from the state', () => {
    expect(collections.length).toEqual(3);
    expect(Object.keys(items).length).toEqual(9);
    deleteCollection(existingCollectionData, setMockCollections, setMockItems);
    expect(newCollections.length).toEqual(2);
    expect(Object.keys(newItems).length).toEqual(6); // 3 items were associated with deleted collection
  })
});
