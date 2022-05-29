import {Graph} from "./graph";
import {Query} from "./query";

export default class Grune {
    graph: Graph;

    addVertices(...a: any[]) {
        this.graph.addNodeMany(...a);
    }

    addVertex(a: any) {
        this.graph.addNode(a);
    }

    query() {
        return Query.create(this.graph);
    }

    private constructor(_graph: Graph) {
        this.graph = _graph;
    }

    static create() {
        const _graph = Graph.create();
        return new Grune(_graph);
    }

}
