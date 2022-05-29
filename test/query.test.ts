import {Graph} from "../src/graph";
import {Query} from "../src/query";
import {Entity} from "../src/types";

/*
 * Graph for Testing: n = 15, m = 13
 * https://ibb.co/dPpqKLn
9 2 
13 1 
11 15 
11 0 
14 10 
8 2 
13 11 
9 0 
3 11 
12 0 
13 0 
9 4 
10 2
 */

describe('Query Should Work', () => {
    let graph: Graph;
    let query: Query;
    beforeAll(() => {
        graph = Graph.create();
        graph.addNodeMany(
            {name: 0},
            {name: 1},
            {name: 2},
            {name: 3},
            {name: 4},
            {name: 5},
            {name: 6},
            {name: 7},
            {name: 8},
            {name: 9},
            {name: 10},
            {name: 11},
            {name: 12},
            {name: 13},
            {name: 14},
            {name: 15}
        );
        graph.addEdge(9, 2);
        graph.addEdge(13, 1);
        graph.addEdge(11, 15);
        graph.addEdge(11, 0);
        graph.addEdge(14, 10);
        graph.addEdge(8, 2);
        graph.addEdge(13, 11);
        graph.addEdge(9, 0);
        graph.addEdge(3, 11);
        graph.addEdge(12, 0);
        graph.addEdge(13, 0);
        graph.addEdge(9, 4);
        graph.addEdge(10, 2);
    });

    beforeEach(() => {
        query = Query.create(graph);
    });

    describe("1. Simple Traversal Queries", () => {
        it("a. Should Find the correct vertices", () => {
            const vertices = query.v({name: 0}).run();
            expect(vertices).toHaveLength(1);
            expect(vertices.at(0)).toStrictEqual(graph.findEntityById(0));
        });

        it("b. Should Find all siblings", () => {
            const actual = query.v(0).parent().child().run();
            const expected = graph.findEntitiesByIds(0, 1, 2, 4, 11, 15);
            expect(actual.map(x => x.id).sort()).toStrictEqual(expected.map(x => x.id).sort());
        })

        it("c. Should Find correct Parent", () => {
            const actual = query.v(2).parent().run();
            const expected = graph.findEntitiesByIds(8, 9, 10);
            expect(actual.map(x => x.id).sort()).toStrictEqual(expected.map(x => x.id).sort());
        });

    });

    describe("2. Merge and As Queries", () => {
        it("a. Should Merge the correct vertices", () => {
            const actual = query.v(2).as('me').parent().as('parent').parent().as('grand-parent').merge('parent', 'grand-parent').run();
            const expected = graph.findEntitiesByIds(8, 9, 10, 14);
            expect(actual.map(x => x.id).sort()).toStrictEqual(expected.map(x => x.id).sort());
        });
    })
});
