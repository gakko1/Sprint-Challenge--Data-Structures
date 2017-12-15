/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const { LimitedArray, getIndexBelowMax, LinkedList } = require('./hash-table-helpers');

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }

  resize() {
    this.limit *= 2;
    const oldStorage = this.storage;
    this.storage = new LimitedArray(this.limit);
    const keyVal = [];
    for (let i = 0; i < oldStorage.length; i++) {
      let current = oldStorage.storage[i].head;
      while (current !== null) {
        keyVal.push([current.value[0], current.value[1]]);
        current = current.next;
      }
    }
    for (let j = 0; j < oldStorage.length; j++) {
      this.insert(keyVal[j][0], keyVal[j][1]);
    }
    // oldStorage.each((bucket) => {
    //   if (!bucket) return;
    //   bucket.forEach((pair) => {
    //     this.insert(pair[0], pair[1]);
    //   });
    // });
  }

  capacityIsFull() {
    let fullCells = 0;
    this.storage.each((bucket) => {
      if (bucket !== undefined) fullCells++;
    });
    return fullCells / this.limit >= 0.75;
  }

  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  insert(key, value) {
    if (this.capacityIsFull()) this.resize();
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    if (bucket) {
      let current = bucket.head;
      while (current.next !== null) {
        if (current.value[0] === key) {
          current.value[1] = value;
        }
        current = current.next;
      }
      bucket.addToTail([key, value]);
      // let bucket = this.storage.get(index) || [];

      // bucket = bucket.filter(item => item[0] !== key);
      // bucket.push([key, value]);
      this.storage.set(index, bucket);
    }
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    if (bucket) {
      let previous = bucket.head;
      let current = previous.next;
      // if removing something that is the head of the list
      if (previous[0] === key) {
        bucket.removeHead();
        return;
      }
      // iterate through list to find the value to remove
      while (current !== null) {
        if (current.value[0] === key) {
          previous.next = current.next;
          current.next = null;
          if (bucket.tail === current) {
            bucket.tail = previous;
          }
          return;
        }
        previous = current;
        current = current.next;
      }
      this.storage.set(index, bucket);
    }
    // if (bucket) {
    //   bucket = bucket.filter(item => item[0] !== key);
    // }
   }
  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    if (bucket) {
      let current = bucket.head;
      while (current !== null) {
       if (current.value[0] === key) {
         return current.value[1];
        }
       current = current.next;
      }
      return false;
    // let retrieved;
    // if (bucket) {
    //   retrieved = bucket.filter(item => item[0] === key)[0];
    // }

    // return retrieved ? retrieved[1] : undefined;
  }
}

module.exports = HashTable;
