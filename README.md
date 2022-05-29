# Granone

Granone is a in-memory graph database that emphasizes lazy-evaluation and supports complex queries written with the pleasure of TypeScript.

## Installation
```
npm install granone
```

## Usage

### Basic Usage

```typescript
import Granone from 'granone'

const db = Granone.create();

const helloID = db.addVertex({name: "Hello" });
const WorldID = db.addVertex({name: "World" });

// Adds a Edge helloID -> WorldId 
db.addEdge(helloID, WorldID);

let vertices = db.query().v(helloID).child().run();
// Will Return { name: "World", id: 0 };
console.log(vertices);

vertices = db.query().v(childID).parent().run();
console.log(vertices); // { name: "Hello", id: 1 };
```

### Complex Queries

But that is probably, not what you expect to be all. So let's start with some cool stuff.
![Graph](./docs/graph.png?raw=true)

Let's build this graph first
```typescript
db.addVertices({ name: "Aria" }, {name: "Bubble"}, {name: "Caddle"}, {name: "Dutch"}, {name: "Eagle" }, {name: "Furious"});

const edges = [0,2,0,4,0,5,1,4,1,5,2,3,2,4,4,5];

for (let i = 0; i + 1 < edges.length; ++i) {
    db.addEdge(edges[i], edges[i + 1]);
}

const q = db.query(); // Our Query Object
```
Here is the query

```typescript
const vertices = q.v(5).parent().as('me').parent().as('parent').merge('me', 'parent').run();
console.log(vertices);
```
You can label vertices using `as` and then further retrieve them using `merge`.

It will find everything

```typescript
// Or you can start with a filter
const vertices = q.v({name: "Bubble" }).child().as("first").parent().as("second").child().as("Oh My Caddle").run();
console.log(vertices)
```

Ran a very complex query, but got lost? Get yourself `back`.

```typescript
const vertices = q.v({name: "Bubble"}).  child().as("first").  parent().as("second").  child().as("Where am I").  back("first").  run();
console.log(vertices); // [ { name: 'Furious', id: 5 }, {name: 'Eagle', id: 4} ]
``` 
What good is a database without pagination?

```typescript
let q = db.query();

q = q.v(4).parent().take(1);

q.run(); // [ { name: 'Caddle', id: 2 } ]
q.run(); // [ { name: 'Bubble', id: 1 } ]
q.run(); // [ { name: 'Aria', id: 0 } ]
q.run(); // []
```

You can find more complex usage in the testcases, if you find any bugs or want more features, please create a issue.

## License
[MIT](https://choosealicense.com/licenses/mit/)


