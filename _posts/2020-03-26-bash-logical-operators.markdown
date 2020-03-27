---
layout: post
title: Logical Operators in Bash
date: 2020-03-26 19:30:00 +0000
categories: Bash Operators
excerpt: Today we will look at how to restructure your bash scripts to use logical operators.
---

Today we will look at how to restructure your bash scripts to use logical operators.

The best place to start is by saying that if you are writing an `if` conditional in your bash script, it can probably be replaced with more a more elegant solution using Bash's built in logical operators. Obviously there are times and places in which `if` conditionals are unavoidable, however it is worth nothing that a lot of them can be avoided by understanding logical operators.
Unlike other languages, a small caveat is that when a condition is met, a logical operator returns 0 status code for true, and 1 for false.

<br>

## Logical Operators

Today we will be covering 4 logical operators. The operators we will cover are:

```bash
;
&&
||
&
```

<br>

### __;__

The semi-colon is used in between commands and allows you to string multiple commands together, regardless of status code output.

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
<br>

### __&&__

and-and, unlike __;__, will only perform the second command if the first command returns a 0 (True) status code.

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

<br>

###  __||__

As you would expect, pipe-pipe does the inverse of `&&`. If the expression on the left evaluates to a non 0 status code, perform the action on the right.

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

<br>

### __&__

This operator bares no resemblemces to `&&` even though you would assume it does. `&` still takes 2 expressions, however it executes the right hand side without waiting for the left hand side to complete. For example:

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


## Practical Example

Lets refactor this basic `if` command which is a deploy script to an environment:

```bash
if [ "$env" != "development" ] || \
    [ "$env" != "staging" ] || \
    [ "$env" != "production" ] ; then
    deploy $env
elif
    error_message
```

On the face of it, this example seems to be okay. However, taking what we have learnt (plus a few extra tricks which I will discuss briefly), we can use logical operator to make it a simple, elegant one liner.

```bash
[[ ! $env =~ ^(development|staging|production)$ ]] && deploy $env || error_message
```
Firstly, we can actually remove the `if` declaration as it is actually implicit with the `[]` declaration. Secondly, we added the `if` syntax improvement `[[]]`, which has some nice added features on its predecessor, `[]`. Namely, you can declare variables with the use of quotations, which we have used here. It also allows us to use the `=~` operator, which allows us to use regular expressions (`^` denotes the start and `$` the end). Instead of searching through if something doesn't equal this or something doesnt equal that, we can declare the `!` to start with to negate the following expression.

Now, if our new expression gives us a 0 status code, we can deploy to the environment. If the preceding expression gives us a 1 status code, then our `deploy $env` will have a 0 status code, meaning the program will execute the `error_message` function.
