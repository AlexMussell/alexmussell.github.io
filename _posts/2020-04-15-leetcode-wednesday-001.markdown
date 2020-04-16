---
layout: post
title: Leetcode Wednesday - Part 1/x
date: 2020-04-15 19:30:00 +0000
categories: 1 7 Python Leetcode
excerpt: Today (and hopefully every Wednesday, Sunday), we will go through Leetcode questions.
---

## 1: Two Sum

Given an array of integers, return indices of the two numbers such that they add up to a specific target.
Assume that each input would have exactly one solution, and you may not use the same element twice.

Example input: `[2, 7, 11, 15], target = 9`
Expected answer: `[0, 1]` 

```python
class Solution:
    def twoSum(self, nums, target):
        """(List[int], int) -> List[int] """

        seen = {}
        for position, num in enumerate(nums):
            remaining = target - num
            if remaining in seen:
                return [seen[remaining], position]
            seen[num] = position
        return []
```

Okay so we need a way to track the indexes of the items in the list so those items can be returned. We can do this by enumerating over the list.

    - enumerate(x): Iterate over x and unpack its position ID and the number into position, num

This one pass solution involves, subtracting the first element in the `nums` list, subtracting that from the `target`. If the remainder has been seen before, then we have 2 elements that add up to `target`. So we format the result and return. If the remainder hasn't been seen yet, we add the number we took out of `nums` as a key in `seen` with its `position` as its value.

<br>

## 2: Reverse Integer
Given a 32-bit signed integer, reverse digits of an integer.

Notes: This is easy if you cheat and type convert from `int()` to `str()` then reverse. However, this problem clearly isn't asking for an implementation like this. Also, you in python you aren't limited by length int32. But we will assume we are.

Firstly we need to define our pretend limits. 32 bit max is `2**32 - 1` and min is `-2**31`.

Next, we need to be able to convert `x` to a positive number if it isn't one, and remember if it is negative for later. Luckily Pythons built in `abs()` lets us do this.

Then in our main loop we can take advantage of the builtin `divmod(x, y)` where `x` is the numerator and `y` is the denominator. `divmod(x, y)` returns a tuple `(quotient, remainder)`. We can use this by setting the denominator to 10. Doing this gives us the following.

```python
"""x is 12345"""
while x:
    x, digit = divmod(x, 10)
    print(x, digit)

# 1234 5
# 123 4
# 12 3
# 1 2
# 0 1
# 0
```
So all we have to do is multiply each result by 10 then add the remainder, then multiple by the sign to make it positive or negative. 

```python
while x:
    x, digit = divmod(x, 10)
    result = result * 10 + digit
    print(result)
    
return result * sign

# 5
# 54
# 543
# 5432
# 54321
# 54321
```

Finally, we need to add our bounds as a check to ensure our input is less than 32 bits. So if our result greater than the integer max divided by 10 (to account for minus sign), or the result is equal to that number and has more than 7 digits, return 0. So overall we get the following:

```python
    def reverse(self, x):
        INT32_MAX = 2 ** 31 - 1
        INT32_MIN = -2 ** 31
        INT32_MAX_DIV_10 = INT_MAX / 10
        
        sign = 1 if x >= 0 else -1
        x = abs(x)

        result = 0

        while x:
            x, digit = divmod(x, 10)
            if result > INT32_MAX_DIV_10 or (result == INT32_MAX_DIV_10 and digit > 7):
                return 0
            result = result * 10 + digit
            print(result)

        return result * sign
```
