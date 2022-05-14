## Problem Definition and requirements.

The main challenge in this graph is the query language and it's evaluation. If we structure carefully, we can observe that the output is a vertex, as that's the entity we are storing.

Any type of query, can be represented as

```
results = g.X() || results.X()
```

Where `X` is function that is either `relation: findIns / findOuts` or a filter `predicate(params)`. The interesting thing is both of them, 
_take an array_ and _return an array_. 

## Structures used.

### Vertices

A vertex represents a entity, hence might have many properties. We will define a object as an vertex for the graph. The atmost required properties are

* `id`
* `_in`
* `_out`

Where `_in` and `_out` are adjacent vertices. 

### Edges.

`A => B`

We know that the basic requirements of an edge is to store the vertices at both of it's ends. But the edges themselves might have some attributes (friend, cousin). Hence we need functions, `findIns(pred)` and `findOuts(pred)` to specify the set of filters of edges that we wish to compute.

## Query Evaluation.

A normal query evaluation strategy seems easy to implement. But the challenge in this project is to implement **lazy evaluation**. The idea of this is to have a storage system. Initially, let us represent this as a list.

```
prgn : [p1(), p2(), p3() ... pn()]
```

Every program in this list is like a map. It takes a input, and creates a many outputs that are meant to be passed to the next function. Along with that, every function has a state, the following are some example states

* `Pull`
* `Running`
* `Done`

A niche things in our implementation, is that it's a list. That helps us in many ways. Any functions, thus can be represented through an index. If a function `f[i]` is in a running state, it means it has inputs that can be processed. If it runs out of inputs, it gets into a `pull` state, inferring that it needs more inputs. The `done` state is a special state that indicates that the query has been processed and we should return the results now. (Mostly used by `v()` and `take()`).

The `done` and the `running` state are easy to manage, the `pull` state however, has the following requirements. If a function at `i` is at a `pull` state, we need to find the max `j` such that `j < i and state[j] = RUNNING`.

This is a fairly simple problem, and can be solved using a `next[]` array. For any index `i`, `next[i] = j` where `j` is defined above. If `i` is already `RUNNING` then `next[i] = i`. Whenever we change a state of a function, we also need to update `next`. Notice that the function `v()` is never in the pull state, as once it's output is over, the query is completed.
