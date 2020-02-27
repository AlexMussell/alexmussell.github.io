---
layout: post
title: Python Decorators
date: 2020-02-25 19:30:00 +0000
categories: Python Decorators
excerpt: In today's topic we will be discussing the basics Python decorators. They aren't as scary as you think!
---
In today's topic we will be discussing Python decorators. They aren't as scary as you think!

We will go through what they are, how they work, a toy example, and a more practical example.

<br>

## The Theory
If you come from a Javascript background, the easiest way to understand decorators is by comparing them to callbacks! For all those who don't know what a callback is:

    - Callback: When a function is passed to a function in order to maintain and order of operations ie. y cannot execute till x has finished.

In other words, it is a function that is executed AFTER a function has finished executing. This is exactly what a decorator does. It is a callable that takes another function as an argument, and returns it with another function or callable object. Or even simpler: a function which takes in a function, adds some functionality, and then returns it.

    - Callable: Any objects that implement __call__() are considered callable objects


 Lets look at a couple of simple examples. Lets say we want to multiply 2 numbers, buy we want to be able to say to the user that numbers `x` and `y` have had an operation done upon them. We don't want to conflate the message with the core of the function logic. Not only that, maybe at a later date, we wish to extend our code to incorporate other operations! You should always be thinking about making future developers of your applications easier! I'll show you what I mean:

 ```python
def new_operation(func):
    def print_completion_to_user(a, b):
        print(f"You have successfully completed an operation on {a} and {b}")
        return func(a, b)
    return print_completion_to_user

@new_operation
def multiple(a, b):
    return a * b
 ```

    OUTPUT:
    >>>multiple(2, 2)
    ...You have successfully completed an operation on 2 and 2
    ...4

Now obviously this is a trivial example. However it shows the key features of a decorator. Not only that, if a new developer needs to add a new operation, they do not need to worry about writing the printing code. The just need to use the "syntactic sugar" of the decorator.

For clarity, you should write your decorators in separate modules to the functions they are invoked upon. But for the sake of this post, it isn't important.

<br>

## More Realistic Example
For this second example, I will be using the example as described in the great resource [Fluent Python](http://shop.oreilly.com/product/0636920032519.do), as it is a great, semi-practical example!

Lets say we have a shop where people can take make orders and pay. For this we can have 2 classes; an Item class, and and Order class (If you are unsure about classes, I will be doing an OO series at some point).

```python
from collections import namedtuple

Customer = namedtuple('Customer', 'name fidelity')


class LineItem:

    def __init__(self, product, quantity, price):
        self.product = product
        self.quantity = quantity
        self.price = price

    def total(self):
        return self.price * self.quantity


class Order:

    def __init__(self, customer, cart, promotion=None):
        self.customer = customer
        self.cart = list(cart)

    def total(self):
        if not hasattr(self, '__total'):
            self.__total = sum(item.total() for item in self.cart)
        return self.__total

    def __repr__(self):
        fmt = '<Order total: {:.2f}>'
        return fmt.format(self.total(), self.due())
```

For this example, what these are doing aren't important. But quickly, LineItem contains information about an item in the shop, and the Order has a list of attributes specifying a person and how to pay etc.

Now customers have started complaining that there are no promotional offers. How would we implement this? Lets apply the intuition of the toy example above. We want to be able to add and take away promotions as we please, and we want to be able to automatically apply promotions to customer orders. We also need to consider that people will want to automatically have the best promotion applied to the orders without having to ask for it.

So lets break this down: we need a list of promotions, some promotions, and a function that applies the best promotion. Can you tell where a decorator can be implemented?

```python
promos = []

def promotion(promo_func):
    promos.append(promo_func)
    return promo_func

@promotion
def fidelity(order):
    """5% discount for customers with 1000 or more fidelity points"""
    return order.total() * .05 if order.customer.fidelity >= 1000 else 0

@promotion
def bulk_item(order):
    """10% discount for each LineItem with 20 or more units"""
    discount = 0
    for item in order.cart:
        if item.quantity >= 20:
            discount += item.total() * .1
    return discount

@promotion
def large_order(order):
    """7% discount for orders with 10 or more distinct items"""
    distinct_items = {item.product for item in order.cart}
    if len(distinct_items) >= 10:
        return order.total() * .07
    return 0

def best_promo(order):
    """Select best discount available"""
    return max(promo(order) for promo in promos)
```

One issue we would discover late on if we didn't use a decorator is future developers would have to remember to update the promos list which can easily cause bugs. So we created a decorator that adds all new promotions to the list of decorators.

We can now update our Order code to use our promotions!

```python
class Order:  # the Context

    def __init__(self, customer, cart, promotion=None):
        self.customer = customer
        self.cart = list(cart)
        self.promotion = promotion

    def total(self):
        if not hasattr(self, '__total'):
            self.__total = sum(item.total() for item in self.cart)
        return self.__total

    def due(self):
        if self.promotion is None:
            discount = 0
        else:
            discount = self.promotion(self)
        return self.total() - discount

    def __repr__(self):
        fmt = '<Order total: {:.2f} due: {:.2f}>'
        return fmt.format(self.total(), self.due())
```

To test this, create a person, create some carts with some lineItems, then give them the best promo! `Order(alex, cart, best_promo)`.

Now this may seem strange to some, but Python objects are First Order, so functions can be passed and returned like variables without issue. So much so that you can actually chain decorators together! Have a decorator that is passed a function to another decorator!

So there you go! The basics of decorators! And they aren't that difficult. The hardest thing is knowing when to use them. Just always assume your code is going to have to be extended at some point by somebody you have never met. So try to make their life easier!

Thanks!


#### Resources
[Fluent Python](http://shop.oreilly.com/product/0636920032519.do)
