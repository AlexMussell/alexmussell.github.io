---
layout: post
title: Logical Operator in Bash
date: 2020-03-26 19:30:00 +0000
categories: Bash Operators
excerpt: Today we will look at how to restructure your bash scripts to use logical operators.
---

Today we will look at how to restructure your bash scripts to use logical operators.


## Logical Operators

The best place to start is by saying that if you are writing an `if` conditional in your bash script, it can probably be replaced with more a more elegant solution using Bash's built in logical operators. Unlike other languages, a small caveat is that when a condition is met, a logical operator returns 0 status code for true, and 1 for false.

Today we will be covering 4 logical operators. The operators we will cover are:

```bash
;
&&
||
&
```

1. __;__: The semi-colon is used in between commands and allows you to string multiple commands together, regardless of status code output.

```bash
cat ~/existingfile.txt ; echo "existingfile opened"
```

Assuming `~/.existingfile.txt` does not exist, will print:

```bash
cat: /home/default/existingfile.txt: No such file or directory
existingfile opened
```

However if it does exist:

```bash
abcdefghijklmnopqrstuvyxwz
existingfile opened
```


2. __&&__: and-and, unlike __;__, will only perform the second command if the first command returns a 0 (True) status code.

```bash
cat ~/existingfile.txt && echo "existingfile opened"
```

Assuming `existingfile.txt` exists, outputs:

```bash
abcdefghijklmnopqrstuvyxwz
existingfile opened
```

If however this file does not exist, the first command returns a non 0 status codes, therefore the output is:

```bash
cat: /home/default/existingfile.txt: No such file or directory
```

3. __||__: As you would expect, pipe-pipe does the inverse of `&&`. If the expression on the left evaluates to a non 0 status code, perform the action on the right.

```bash
cat ~/existingfile.txt || echo "existingfile does not exist"
```

Assuming `~/.existingfile.txt` does not exist, will print:

```bash
cat: /home/default/existingfile.txt: No such file or directory
existingfile does not exist
```

and if it does exist:

```bash
abcdefghijklmnopqrstuvyxwz
```

4. __&__: This operator bares no resemblemces to `&&` even though you would assume it does. `&` still takes 2 expressions, however it executes the right hand side without waiting for the left hand side to complete. For example:

```bash
sleep 5 & echo "Finished first"
```

outputs:

```bash
default:[~/]:$ sleep 5 & echo "Finished first"
[1] 29766
Finished first
```

"Finished first" gets printed immediately and returns its process id.
