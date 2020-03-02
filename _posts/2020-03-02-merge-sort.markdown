---
layout: post
title: Merge Sort
date: 2020-03-01 19:30:00 +0000
categories: Python Algorithms
excerpt: Today we will be discussing merge sort and implementing it in Python.
---
Sorting is an important topic within computing, and sorting algorithms need to be understood thoroughly if you are expected to bag an coding interview. Today we will be discussing merge sort and implementing it in Python. 

<br>

#### Merge Sort
Merge sort is fairly simple to understand. It is considered a standard recursive algorithm.

    - Recursive: Relating to or involving a program or routine of which a part requires the application of the whole, so that its explicit interpretation requires in general many successive executions.

##### Method

    1. Take an array of length A
    2. Split A into 2 parts, creating L, R (Left, Right)
    3. Recursivley do this, creating L', R', until we reach single integers
    4. When you have 2 integers, compare and switch
    5. When you have sorted L' and sorted R', combine.


#### Implementation
```python
def mergesort(array):
    if len(array) > 1:
        middle = len(array)//2
        L = array[0:middle]
        R = array[middle:]

        mergesort(L)  # when None, goes back to caller then progresses
        mergesort(R)  # when None, goes up the chaining back to caller and progresses

        i = j = k = 0

        # Copy data to temporary arrays
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                array[k] = L[i]
                i += 1
            else:
                array[k] = R[j]
                j += 1
            k += 1

        # Checking if any element was left 
        while i < len(L): 
            arr[k] = L[i] 
            i+=1
            k+=1
          
        while j < len(R): 
            arr[k] = R[j] 
            j+=1
            k+=1

if __name__ == "__main__":
    array = [12, 11, 13, 5, 6, 7] 
    mergesort(array)
```
