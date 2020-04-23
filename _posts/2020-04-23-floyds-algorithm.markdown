---
layout: post
title: Floyds Algorithm
date: 2020-04-23 19:30:00 +0000
categories: Algorithms
excerpt: A discussion on Floyds Algorithm to solve "duplicate numbers exist" problem
---

Given an array numbers containing `n + 1` integers where each integer is between 1 and n (inclusive), prove that at least one duplicate number must exist. What is the best possible way to solve this?

Lets start with a correct solution, but not optimal. Most people would start by sorting the array, go through the array and check if the number to the left is equal to the current number. If it is, return.

```python
def findDuplicate(self, nums):
    nums.sort()
    for i in range(1, len(nums)):
        if nums[i] == nums[i-1]:
            return nums[i]
```

There are other ways to solve this (using `set()`), but this is just a brief, basic example.

<br>

## Floyds Algorithm

But how do we make this better? We can actually work this out in place (O(1) space complexity) in O(n) time using Floyds algorithm.

They key part is to understand the problem exactly. All the numbers in the array indexes, are never larger than the size of the array itself. This means that we should look at the value of the index, and move to the array index of the value we just observed. This is what is known as a cycle and usually associated with a linked list.

Floyds algorithm works on the premise of the tortoise and the hare. The tortoise moves one step at a time through the array (`nums[tortoise]`), and the hare 2 (`nums[nums[hare]]`). As the animals go around an array cycle, the hare will eventually catch up with the tortoise, once it does, we have reached the intersection point.

In phase 2, we give the tortoise a chance to catch up. The hares speed now matches the tortoises, the hare starts from the intersection point, and the tortoise starts from back at the original starting position. They will now meet at the entrance of the cycle (our duplicate number).

```python
def findDuplicate(self, nums):
    tortoise = hare = nums[0]
    while True:
        tortoise = nums[tortoise]
        hare = nums[nums[hare]]
        if tortoise == hare:
            break

    tortoise = nums[0]
    while tortoise != hare:
        tortoise = nums[tortoise]
        hare = nums[hare]

    return hare
```