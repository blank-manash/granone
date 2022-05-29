import {Vertex, STATES} from '../types';
import {PipeType} from "../PipeType";

export class VertexPipeType extends PipeType {
    updateState(): void {
        this.makeUnique();
        this.state = this.list.length === 0 ? STATES.DONE : STATES.RUNNING;
    }
    provides(_v: Vertex): void {
        this.updateState();
    }
    private constructor(vertices: Array<Vertex>) {
        super();
        this.list = vertices;
        this.updateState();
    }
    static create(vertices: Array<Vertex>) {
        return new VertexPipeType(vertices);
    }
    
    getPipeType(): PIPETYPES {
        return PIPETYPES.VERTEX;
    }
};
