/**
 * @file  : query.ts
 * @author: Manash Baul <mximpaid@gmail.com>
 * Date   : 15.05.2022
 */

import {Graph} from './graph';
import {PipeType} from "./PipeType";
import {AsPipeType} from './pipetypes/asPipe';
import {ChildPipeType} from './pipetypes/childPipe';
import {MergePipeType} from './pipetypes/mergePipe';
import {ParentPipeType} from './pipetypes/parentPipe';
import {VertexPipeType} from './pipetypes/vertexPipe';
import {QueryRunner} from './QueryRunner';
import {Entity, PIPETYPES, Vertex} from './types';

export class Query {
    prog: Array<PipeType>;
    graph: Graph;
    adj: Array<Array<number>>;

    private constructor(_graph: Graph) {
        this.prog = [];
        this.adj = new Array<Array<number>>();
        this.graph = _graph;
    }

    private addEdge(i: number, j: number) {
        this.adj[i].push(j);
    }

    private addPipeType(pipeType: PipeType) {
        const i = this.prog.length;
        this.prog.push(pipeType);
        this.adj.push([]);
        this.addEdge(i - 1, i);
    }
    
    private addMergePipeType(pipeType: MergePipeType) {
        const ci = this.prog.length;
        this.adj.push([]);
        for (let i = this.prog.length - 1; i > 0; i--) {

            const pipe = this.prog.at(i)!;
            if (pipe.getPipeType() === PIPETYPES.MERGE) break;
            if (pipe.getPipeType() !== PIPETYPES.AS) continue;

            const label = (<AsPipeType>pipe).getLabel();

            if (!pipeType.satisfies(label)) continue;

            this.addEdge(i, ci);
        }
        this.prog.push(pipeType);

    }

    v(predicate: number | string | object): Query {
        if (typeof predicate == "number" || typeof predicate == "string") {
            predicate = {id: predicate};
        }
        const vertices = this.graph.findVertices(predicate);
        const pipeType: PipeType = VertexPipeType.create(vertices);
        const i = this.prog.length;
        this.prog.push(pipeType);
        this.adj.push([]);
        return this;
    }

    parent() {
        const pipeType: PipeType = ParentPipeType.create();
        this.addPipeType(pipeType);
        return this;
    }

    child() {
        const pipeType: PipeType = ChildPipeType.create();
        this.addPipeType(pipeType);
        return this;
    }

    as(name: string) {
        const pipeType: PipeType = AsPipeType.create(name);
        this.addPipeType(pipeType);
        return this;
    }

    merge(...args: string[]) {
        const pipeType: MergePipeType = MergePipeType.create(...args);
        this.addMergePipeType(pipeType);
        return this;
    }

    run(): Array<Entity> {
        return QueryRunner.create(this.prog, this.adj).run();
    }

    static create(_graph: Graph) {
        const queryEngine: Query = new Query(_graph);
        return queryEngine;
    }
}
