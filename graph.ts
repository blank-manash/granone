/**
 * @file  : graph.ts
 * @author: Manash Baul <mximpaid@gmail.com>
 * Date   : 15.05.2022
 */


/*
 * Supports all the functionality of a graph.
 * Primary of which are { findParents, findChildren };
 * Support for edges { Adding a edge };
 */

interface Node {
    entity: Entity;
    parents: Array<Node>;
    children: Array<Node>;
}

interface Entity extends Record<string, any> {
    id: number
}

export class Graph {
    private autoId: number;
    private nodeSet: Map<number, Node>;

    private getId(a: any) {
        if (a.hasOwnProperty("id") && this.nodeSet.has(a.id))
            throw Error("ID already Exists");
        return a.id || this.autoId++;
    }

    public addEdge(a: number, b: number) {
       const validate = (num: number) => {
           if (!this.nodeSet.has(num))
               throw Error(`${num} is not present in database`);
       };
       validate(a);
       validate(b);

       const nodeA = this.nodeSet.get(a);
       const nodeB = this.nodeSet.get(b);

       nodeA!.children.push(nodeB!);
       nodeB!.parents.push(nodeA!);
    };

    public addNode(a: any): void {
        const id: number = this.getId(a);
        a.id = id;
        const node: Node = { entity: <Entity> a, parents: [], children: [] };
        this.nodeSet.set(id, node);
    }

    private constructor() {
        this.nodeSet = new Map<number, Node>();
        this.autoId = 0;
    }

}
