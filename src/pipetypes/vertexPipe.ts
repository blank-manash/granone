import {PipeType, Vertex, STATES} from '../types';

export class VertexPipeType implements PipeType {
    provides(v: Vertex): void {
        throw new Error('Method not implemented.');
    }
    get(): Vertex {
        throw new Error('Method not implemented.');
    }
    getState(): STATES {
        throw new Error('Method not implemented.');
    }
};
