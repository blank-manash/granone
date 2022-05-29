# Gracula

Gracula is a in-memory graph database that emphasizes lazy-evaluation and supports complex queries written with the pleasure of TypeScript.

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

## License
[MIT](https://choosealicense.com/licenses/mit/)


