---
layout: post
title: 1D and 2D Peak Finding Algorithms
date: 2020-02-25 19:30:00 +0000
categories: Python Algorithms
excerpt: Today we will be discussing the novel peak finding algorithms and implementing them in Python.
---
Today we will be discussing the novel peak finding algorithms and implementing them in Python.


## One-dimensional Peak Finding:
A one-dimensional peak finder runs over an array:

    | a | b | c | d | e | f | g | h | i |

`a-i` are integers and we want to find A (singular) peak.
- Peak: Position `b` of the array is a peak if and only if `b >= a` and `b >= c`.
Position 9 is a peak if `i >= h`.

There are a couple of ways we can solve this problem.

Firstly we have a straight forward linear search, which in the worst case you have to look at all elements in `O(n)` time (as we start from the left, and in the worst case senario, we have to go all the way through the array in linear time). However, we can improve on this dramatically by implementing a recursive divide-and-conquer technique. The psuedo code would be like the following:


    - If a[n/2] < a[n/2-1] then only look at left half to look for peak.
    - Else look at right (If a[n/2] < a[n/2+1] then ... n/2+1..n) for peak.
    - Else, n/2 is peak.

The complexity of this algorithm is worst `O(log2 n)`, best case is `O(1)`!. 

<br>

## Two-Dimensional Peak Finding:
Let step if up a bit and find A singular peak within a 2D array.

    |   	|   	|   	|   	|
    |   	| b 	|   	|   	|
    | d 	| a 	| e 	|   	|
    |   	| c 	|   	|   	|

a is a peak in the 2D array iff (if and only if) `a >= b `, `a >= d `, `a >= e `, `a >= c `.

Like before, there are 2 ways we will discuss in solving this problem. Firstly we will use the Greedy Ascent algorithm. In this we pick place to start, look in direction, if that number is greater than ours, then we move.

    |    	|    	|    	|    	|
    | 1   	| 2   	| 3   	| 4   	|
    | 14 	| 13 	| 12 	| 11 	|
    | 15 	| 9  	| 10 	| 8  	|
    | 16 	| 17 	| 18 	| 19 	|

Say we pick 12 and want to look left: 12, 13, 14, hit an edge so we look down, 15, hit edge so we look right, 17, 18, 19.

The worst case anaylsis for the Greedy Ascent algorithm is `O(nm)` where you have to traverse all nodes in the domain, and if `m=n O(n^2)`.

Much like the one-dimensional problem, we can also drastically improve the performance by performing a divide-and-conquer technique. The psuedo code for this algorithm is:

    - Pick middle column j = y/2
    - Find global maximum on col j at (i, j)
    - Compare (i, j-1), (i, j), (i, j+1)
        - Pick left or right depending if it is > (i, j)
        - If it isn't, (i, j) is 2D peak.
    - Solve new problem with half number of columns in that direction.
    - When you have single col, find global maximum and done <- base case

This has a complexity of `O(n log2 m)`!


Now lets try and implement these algorithms in Python:

```python
def one_dimensional_peak(array):
    """Return a peak in array."""
    start, stop = 0, len(array)
    while True:
        mid = (start + stop) // 2
        if mid > 0 and array[mid] < array[mid-1]:
            stop = mid
        elif mid < len(array) - 1 and array[mid] < array[mid+1]:
            start = mid
        else:
            return array[mid]
```

Remember me saying that we can solve this recursivley? We can! But, as Python does not implement [*tail recursion*](https://stackoverflow.com/questions/33923/what-is-tail-recursion), it is actually computationally faster to implement it as shown.


Now lets implement a 2D Peak Finder, and lets assume that the 2D array is non-jagged.
- Jagged array: When not all elements in a 2D array are the same size. eg: `[[1,2],[1, 2, 3],[1, 2]]`

<br>

```python
from math import ceil

example = [ [ 1, 2, 3, 4, 5, 6, 7, 8 ], 
            [ 14, 21, 12, 11, 21, 24, 11, 2 ], 
            [ 15, 9, 10, 8, 10, 10, 10, 10 ], 
            [ 16, 17, 18, 1, 1, 2, 3, 4 ] ] 

def two_dimensional_peak_wrapper(array):
    x = len(array)
    y = len(array[0])

    start_mid_point = y // 2

    return two_dimensional_peak(array, x, y, start_mid_point)


def two_dimensional_peak(array, x, y, start_mid_point):
    max = 0
    max, max_index = findMax(array, x, start_mid_point, max)

    if (start_mid_point == 0 or start_mid_point == y - 1):
        return max

    if (max >= array[max_index][start_mid_point - 1] and
        max >= array[max_index][start_mid_point + 1]):
            return max

    if (max < array[max_index][start_mid_point - 1]):
        return two_dimensional_peak(array, x, y, start_mid_point - ceil(start_mid_point // 2))

    return two_dimensional_peak(array, x, y, start_mid_point + ceil(start_mid_point // 2))


def findMax(array, x, start_mid_point, max):
    max_index = 0

    for i in range(x):
        if (max < array[i][start_mid_point]):
            max = array[i][start_mid_point]
            max_index = i
    return max, max_index
```

Remember, this version only finds A peak. Not all peaks. This will be covered at a later date.

Thanks for reading!


#### Resources:
[MIT Course](https://www.youtube.com/watch?v=HtSuA80QTyo&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb)
