import {Vertex, STATES} from '../types';
import {PipeType} from "../PipeType";

export class VertexPipeType extends PipeType {
    updateState(): void {
        this.state = this.list.length === 0 ? STATES.RUNNING : STATES.DONE;
    }
    provides(_v: Vertex): void {
        this.updateState();
    }
    private constructor(vertices: Array<Vertex>) {
        super();
        this.list = vertices;
    }
    static create(vertices: Array<Vertex>) {
        return new VertexPipeType(vertices);
    }
};
