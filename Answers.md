## Questions
1. What are the order of insertions/removals for the following data structures?
   - **Stack**
   Last in, first out. Each element is added to the end and elements are also taken from the end in removals. 
   - **Queue**
   First in, first out. Each element is added to the end of the queue and dequeue removes from the beginning of the queue.
2. What is the retreival time complexity for the following data structures?
   - **Linked List**
   If it has to do with the head or the tail values then it would be O(1) as they're readily available, but for any other value the complexity would be O(n) because it's just a linear iterative search through every value in the list.
   - **Hash Table**
   A hash table should be O(1) complexity ideally for retrievals as each value is in a very specific place and does not need much iterating as each key is unique within the bucket as well. Worst case would be O(n) if there are a lot of values within each bucket to iterate over. 
   - **Binary Search Trees**
   O(log n) or O(n) depending how it's implemented. O(log n) being most common because as the height of the tree increases with more leaves and each having two leaves itself, 2^n-1 nodes, but each time a number is checked against a branch it effectively halves the remaining values to search. 

3. What are some advantages to using a Hash Tables over an array in JavaScript?

Hash tables have much lower time complexity on average. They have faster retrieval (and therefore deletion). The only way an array can compete with a hash table is if index numbers are known and don't have to be iterated over, making it constant time. Arrays can quickly get into exponential time complexity when there are multiple nested arrays needing iteration. Hash tables are much tidier, in that each key has a specific place, only needing iteration with many keys in the same bucket when dealing with huge numbers of keys and buckets. 

## Challenge
If you take a look at the hash-table.js file you'll notice that it has solution code in it. You'll also notice that if you run the tests, they all pass. Your job is to refactor this hash table solution to use **linked lists** for buckets instead of arrays. You're welcome to add another class to the helper file, following the pattern used with LimitedArray.