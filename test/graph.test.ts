import {Graph} from "../src/graph";

describe('1. Graph Functionality', () => {
    let graph: Graph;
    beforeEach(() => {
        graph = Graph.create();
    });

    it("a. Should Add an vertex", () => {
        graph.addNode({ name : "Manash" });
        const vertices = graph.findVertices({ name: "Manash" });
        expect(vertices.at(0)?.entity).toStrictEqual({ id: 0, name: "Manash" });
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

        const vertexFirst = graph.getNodeById(idA);
        const vertexSecond = graph.getNodeById(idB);

        expect(vertexFirst?.children).toContain(vertexSecond);
        expect(vertexSecond?.parents).toContain(vertexFirst);
    })

    it("c. Should Not Have False Positives", () => {
        const id = graph.addNode({ excuse: "me" });
        const unexpectedVertex = graph.getNodeById(id);

        expect(graph.findVertices({excuse: "Me" })).not.toContain(unexpectedVertex);
    })
});
