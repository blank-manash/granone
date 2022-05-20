/**
 * @file  : query.ts
 * @author: Manash Baul <mximpaid@gmail.com>
 * Date   : 15.05.2022
 */

import {Graph} from './graph';
import {PipeType} from "./PipeType";
import {ChildPipeType} from './pipetypes/childPipe';
import {ParentPipeType} from './pipetypes/parentPipe';
import {VertexPipeType} from './pipetypes/vertexPipe';
import {Entity, STATES, Vertex} from './types';

export class Query {
    prog: Array<PipeType>;
    prev: Array<number>;
    graph: Graph;

    private constructor(_graph: Graph) {
        this.prog = [];
        this.prev = [];
        this.graph = _graph;
    }

    private addPipeType(pipeType: PipeType) {
        const i = this.prog.length;
        this.prog.push(pipeType);
        this.prev.push(this.prev[i - 1]);
    }

    public v(predicate: number | string | object): Query {
        if (typeof predicate == "number" || typeof predicate == "string") {
            predicate = {id: predicate};
        }
        const vertices = this.graph.findVertices(predicate);
        const pipeType: PipeType = VertexPipeType.create(vertices);
        const i = this.prog.length;
        this.prog.push(pipeType);
        this.prev.push(i);
        return this;
    }

    public parent() {
        const pipeType: PipeType = ParentPipeType.create();
        this.addPipeType(pipeType);
        return this;
    }
    
    public child() {
        const pipeType: PipeType = ChildPipeType.create();
        this.addPipeType(pipeType);
        return this;
    }

    public run(): Array<Entity> {

        const results: Array<Entity> = [];
        if (this.prog.length === 0) return results;

        let index = 0;
        let vertex: Vertex | null = null;

        while (true) {
            const pipeType: PipeType = this.prog.at(index)!;
            const currentIndex = index;
            const isEnd: boolean = index === this.prog.length - 1;
            if (vertex) {
                pipeType.provides(vertex);
                vertex = null;
            }

            // Update Index
            let state = pipeType.getState();
            if (state === STATES.RUNNING) {
                vertex = pipeType.get();
                if (isEnd) {
                    results.push(vertex.entity);
                    vertex = null;
                } else {
                    index = index + 1;
                }
            } else if (state === STATES.PULL) {
                index = this.prev[index];
            } else {
                break;
            }
            state = pipeType.getState();
            // Update Prev
            if (state === STATES.RUNNING) {
                this.prev[currentIndex] = currentIndex;
            } else if (state === STATES.PULL) {
                this.prev[currentIndex] = this.prev[currentIndex - 1];
            }
        }

        return [...new Set(results)];
    }

    public static create(_graph: Graph) {
        const queryEngine: Query = new Query(_graph);
        return queryEngine;
    }
}
