import {PipeType, STATES} from '../types';

export class VertexPipeType implements PipeType {
    vertices: Array<object>;

    private constructor(_vertices: Array<object>) {
        this.vertices = _vertices;
    }

    public consume(entry: object | null): number | object {
        if (this.vertices.length === 0)
            return STATES.DONE;

        return <object> this.vertices.pop();
    }
    public static create(_vertices: Array<object>) {
        const vertexPipe: VertexPipeType = new VertexPipeType(_vertices);
        return vertexPipe;
    }
};
