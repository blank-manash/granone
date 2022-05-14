/**
 * @file  : query.ts
 * @author: Manash Baul <mximpaid@gmail.com>
 * Date   : 15.05.2022
 */

import {Graph} from './graph';
import {VertexPipeType} from './pipetypes/vertexPipe';
import {Engine, STATES} from './types';


export class Query {
    prog: Array<Engine>;
    state: Array<Engine>;
    graph: Graph;

    private constructor(_graph: Graph) {
        this.prog = [];
        this.state = [];
        this.graph = _graph;
    }

    public v(predicate: number | string | object): Query {
        if (typeof predicate == "number" || typeof predicate == "string") {
            predicate = {id: predicate};
        }
        const vertices = this.graph.findVertices(predicate);
        const engine: Engine = {
            func: VertexPipeType.create(vertices),
            name: 'vertex',
            next: this.prog.length,
            state: vertices.length ? STATES.RUNNING : STATES.DONE
        }
        this.prog.push(engine);
        return this;
    }
    public static create(_graph: Graph) {
        const queryEngine: Query = new Query(_graph);
        return queryEngine;
    }
}
