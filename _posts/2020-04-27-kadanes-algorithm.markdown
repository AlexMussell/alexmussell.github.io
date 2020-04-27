---
layout: post
title: Kadane's Algorithm
date: 2020-04-27 19:30:00 +0000
categories: Algorithms Dynamic
excerpt: A discussion on Kadane's Algorithm to solve "maximum subarray sum" problem
---

Given an array, the algorithm to find the maximum subarray sum in O(1) space is called Kadane’s Algorithm.


```python
class Solution:
    def maxSubArray(self, nums):
        for i in range(1, len(nums)):
            if nums[i-1] > 0:
                nums[i] += nums[i-1]
        return max(nums)
```

Replace the value of the index before `i` with the sum of `i -1` plus `i` and iterate through. Then take the max. Easy.
