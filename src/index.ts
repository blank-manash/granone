import {Graph} from "./graph";
import {Query} from "./query";

export default class Granone {
    graph: Graph;

    addVertices(...a: any[]) {
        return this.graph.addNodeMany(...a);
    }

    addVertex(a: any) {
        return this.graph.addNode(a);
    }

    addEdge(a: number, b:number) {
        this.graph.addEdge(a, b);
    }

    query() {
        return Query.create(this.graph);
    }

    private constructor(_graph: Graph) {
        this.graph = _graph;
    }

    static create() {
        const _graph = Graph.create();
        return new Granone(_graph);
    }

}
