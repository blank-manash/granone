import {Graph} from "../src/graph";

describe('1. Graph Functionality', () => {
    let graph: Graph;
    beforeEach(() => {
        graph = Graph.create();
    });

    it("a. Should Add an vertex", () => {
        graph.addNode({name: "Manash"});
        const vertices = graph.findVertices({name: "Manash"});
        expect(vertices.at(0)?.entity).toStrictEqual({id: 0, name: "Manash"});
    })

    it("b. Should add an Edge", () => {
        const nodeA = {
            name: "Manash",
            school: "Make"
        };
        const nodeB = {
            name: "Gamakshi",
            school: "Make"
        };
        const idA = graph.addNode(nodeA);
        const idB = graph.addNode(nodeB);
        graph.addEdge(idA, idB);

        const vertexFirst = graph.findNodeById(idA);
        const vertexSecond = graph.findNodeById(idB);

        expect(vertexFirst?.children).toContain(vertexSecond);
        expect(vertexSecond?.parents).toContain(vertexFirst);
    })

    it("c. Should Not Have False Positives", () => {
        const id = graph.addNode({excuse: "me"});
        const unexpectedVertex = graph.findNodeById(id);

        expect(graph.findVertices({excuse: "Me"})).not.toContain(unexpectedVertex);
    })
});

describe("2. Complex Graph", () => {
    let graph: Graph;
    beforeEach(() => {
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

    it("a. Should Find the correct vertices", () => {
        const vertices = graph.findVertices({id: 2});
        expect(vertices.length).toBe(1);
    });
})
