---
layout: post
title: Merge Sort
date: 2020-03-03 19:30:00 +0000
categories: Python Algorithms
excerpt: Today we will be discussing merge sort and implementing it in Python.
---
Sorting is an important topic within computing, and sorting algorithms need to be understood thoroughly if you are expected to bag yourself a coding interview. Today we will be discussing merge sort and implementing it in Python. 

<br>

#### Merge Sort
Merge sort is fairly simple to understand. It is considered a standard recursive algorithm.

    - Recursive: Relating to or involving a program or routine of which a part requires the application of the whole, so that its explicit interpretation requires in general many successive executions.

It is important to know that this search algorithm consumes `O(n)` auxillary space. This is due to the fact we need to split our array into 2 part for the recursive part of our function. If we take a search algorithm like insertion sort, this can be achieved in `O(1)` (or constant) auxillary space as the algorithm is performed in-place.

    - In-place: The data input to the algorithm is overwritten by the output, taking up no memory/disk resource.

For all you big-brains out there, yes I know there is in-place merge sort, but we aren't going to cover that this post.

<br>

##### Method

    1. Take an array of length A.
    2. Split A into 2 parts, creating L, R (Left, Right).
    3. Recursively call merge sort for the first half, L'.
    4. Do this until you reach single integers.
    5. Compare L' and R'
    6. Switch R' > L'
    7. Then start to merge arrays back together.

<br>

#### Implementation
```python
def mergeSort(array):
    if len(array) > 1:
        middle = len(array)//2
        L = array[0:middle]
        R = array[middle:]

        mergeSort(L)
        mergeSort(R)

        i = j = k = 0

        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                array[k] = L[i]
                i += 1
            else:
                array[k] = R[j]
                j += 1
            k += 1

        while i < len(L): 
            array[k] = L[i] 
            i+=1
            k+=1
          
        while j < len(R): 
            array[k] = R[j] 
            j+=1
            k+=1

if __name__ == "__main__":
    array = [12, 11, 13, 5, 6, 7] 
    mergeSort(array)
```

So we call `mergeSort()` on list `A`, and if we haven't gotten down to 1 element yet, we divide the array in 2. `L` is the left hand array from 0 up to an not including middle, `R` is from middle to the end of the array argument, we then do `mergeSort()` on the `L` array and repeat the process. When we have 1 element left in `L`, we then recursively call `mergeSort()` on `R`. Once we are down to individual nodes, we then initialise 2 pointers (not an object that stores a memory address, but a number that correlates to a position), one that follows `L'` and one that follows `R'`. We also initialise a variable `k`, which is used to keep track of the position in the temporary array where we insert any elements that are left. 

If `L' =< R'`, we add `L'` to the array and increment `i` and then `k`. Now the left hand side of the while fails, so we skip to check if there are any elements left (as if we have an odd number, there will be a node with only 1 node in), we find out that `j` is less than `len(R)` as we have 1 item in `R`, so we add `R` to the temporary array, and increment `k`. This then gets returned up to the caller as an organised `L'` list. This same technique is then done for `R`. Once this is complete, the 2 lists are combined and returns to the original caller as one organised list `A`.