import {Graph} from "../src/graph";
import {Query} from "../src/query";


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
        for(let i = 0; i < 3; ++i) {
            graph.addEdge(ids.at(i)!, ids.at(i + 3)!);
        }
    });

    beforeEach(() => {
        query = Query.create(graph);
    });

    describe("1. Simple Traversal Queries", () => {
        it("a. Should Find the correct vertices", () => {
            const vertices = query.v({ name: "p1" }).run();
            expect(vertices).toHaveLength(1);
            expect(vertices.at(0)).toStrictEqual(graph.getNodeById(0));
        });
    });
});
