import {Graph} from "../src/graph";
import {Query} from "../src/query";
import {Entity} from "../src/types";


describe('Query Should Work', () => {
    let graph: Graph;
    let ids: Array<number>;
    let query: Query;
    beforeAll(() => {
        graph = Graph.create();
        ids = graph.addNodeMany(
            {name: "p1"},
            {name: "p2"},
            {name: "p3"},
            {name: "c1"},
            {name: "c2"},
            {name: "c3"},
        );
        for (let i = 0; i < 3; ++i) {
            for (let j = 3; j < 6; ++j) {
                graph.addEdge(i, j);
            }
        }
    });

    beforeEach(() => {
        query = Query.create(graph);
    });

    describe("1. Simple Traversal Queries", () => {
        it("a. Should Find the correct vertices", () => {
            const vertices = query.v({name: "p1"}).run();
            expect(vertices).toHaveLength(1);
            expect(vertices.at(0)).toStrictEqual(graph.findEntityById(0));
        });

        it("b. Should Find all siblings", () => {
            const expected = graph.findEntitiesByIds(3, 4, 5);
            const actual = query.v({name: "c1"}).parent().child().run();
            expect(actual.map(x => x.id).sort()).toStrictEqual(expected.map(x => x.id).sort());
        })

        it("c. Should Find all parents", () => {
            const expected = graph.findEntitiesByIds(0, 1, 2);
            const actual = query.v(3).parent().child().parent().run();
            expect(actual.map(x => x.id).sort()).toStrictEqual(expected.map(x => x.id).sort());

        })
    });

    describe("2. Merge and As Queries", () => {
        it("a. Should Merge the correct vertices", () => {

            const actual = query.
                v({name: "p1"}).
                as('parent').
                child().
                as('children').
                merge('parent', 'children').
                run();

            const expected = graph.findEntitiesByIds(0, 3, 4, 5);
            expect(actual.map(x => x.id).sort()).toStrictEqual(expected.map(x => x.id).sort());
        })
    })
});
