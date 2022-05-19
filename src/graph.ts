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
import {Vertex, Entity} from "./types";

export class Graph {
    private autoId: number;
    private nodeSet: Map<number, Vertex>;

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
        const node: Vertex = {entity: <Entity>a, parents: [], children: []};
        this.nodeSet.set(id, node);
    }

    public findVertices(values: object): Array<Vertex> {
        return Array.from(this.nodeSet.values())
            .filter((node) => {
                const nodeValue = node.entity;
                for (const [key, value] of Object.entries(values)) {
                    if (nodeValue[key] && nodeValue[key] != value)
                        return false;
                }
                return true;
            });
    }

    public static create() {
        return new Graph();
    }

    private constructor() {
        this.nodeSet = new Map<number, Vertex>();
        this.autoId = 0;
    }

}
