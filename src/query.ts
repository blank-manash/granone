/**
 * @file  : query.ts
 * @author: Manash Baul <mximpaid@gmail.com>
 * Date   : 15.05.2022
 */

import {Graph} from './graph';
import {PipeType} from "./PipeType";
import {AsPipeType} from './pipetypes/asPipe';
import {BackPipeType} from './pipetypes/backPipe';
import {ChildPipeType} from './pipetypes/childPipe';
import {ExceptPipeType} from './pipetypes/exceptPipe';
import {MergePipeType} from './pipetypes/mergePipe';
import {ParentPipeType} from './pipetypes/parentPipe';
import {TakePipeType} from './pipetypes/takePipeType';
import {VertexPipeType} from './pipetypes/vertexPipe';
import {QueryRunner} from './QueryRunner';
import {Entity, PIPETYPES} from './types';

export class Query {
    prog: Array<PipeType>;
    graph: Graph;
    adj: Array<Array<number>>;
    runner: QueryRunner | undefined;

    private constructor(_graph: Graph) {
        this.prog = [];
        this.adj = new Array<Array<number>>();
        this.graph = _graph;
        this.runner = undefined;
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
        const addedLabels = new Set<string>();
        this.adj.push([]);
        for (let i = this.prog.length - 1; i > 0; i--) {

            const pipe = this.prog.at(i)!;
            if (pipe.getPipeType() === PIPETYPES.MERGE) break;
            if (pipe.getPipeType() !== PIPETYPES.AS) continue;

            const label = (<AsPipeType>pipe).getLabel();

            if (!pipeType.satisfies(label) || addedLabels.has(label)) continue;
            addedLabels.add(label);
            this.addEdge(i, ci);
        }

        if (addedLabels.size === 0) {
            console.log("WARNING: No matching labels to pull from (MERGE), using default label");
            this.addEdge(ci - 1, ci);
        }

        this.prog.push(pipeType);
    }

    private addBackPipeType(pipeType: BackPipeType) {
        const ci = this.prog.length;
        this.adj.push([]);
        let hasLabel = false;

        for (let i = ci - 1; i > 0; --i) {

            const pipe = this.prog.at(i)!;
            if (pipe.getPipeType() !== PIPETYPES.AS) continue;

            const label = (<AsPipeType> pipe).getLabel();

            if (pipeType.satisfies(label)) {
                this.addEdge(i, ci);
                hasLabel = true;
                break;
            }
        }

        if (!hasLabel) {
            console.log("WARNING: No matching labels to pull from (BACK), using default label");
            this.addEdge(ci - 1, ci);
        }
        this.prog.push(pipeType);
    }

    v(predicate: number | string | object): Query {
        if (typeof predicate == "number" || typeof predicate == "string") {
            predicate = {id: predicate};
        }
        const vertices = this.graph.findVertices(predicate);
        const pipeType: PipeType = VertexPipeType.create(vertices);
        this.prog.push(pipeType);
        this.adj.push([]);
        return this;
    }

    except(name: string) {
        const pipeType: PipeType = ExceptPipeType.create(name);
        this.addPipeType(pipeType);
        return this;
    }

    take(limit: number) {
        const pipeType: PipeType = TakePipeType.create(limit);
        this.addPipeType(pipeType);
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

    back(name: string) {
        const pipeType: BackPipeType = BackPipeType.create(name);
        this.addBackPipeType(pipeType);
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
        if (this.runner == undefined) {
            this.runner = QueryRunner.create(this.prog, this.adj);
        }
        return this.runner.run();
    }

    static create(_graph: Graph) {
        const queryEngine: Query = new Query(_graph);
        return queryEngine;
    }
}
