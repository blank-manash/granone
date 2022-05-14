import {VertexPipeType} from "../../pipetypes/vertexPipe";
import {STATES} from "../../types";

describe('Vertex Pipe Should Work', () => {
    function getVertexPipe(vertices: Array<object>): VertexPipeType {
        return VertexPipeType.create(vertices);
    };

    test('Instansiate', () => {
        const vertexPipe = getVertexPipe([]);
        expect(vertexPipe.consume(null)).toBe(STATES.DONE);
    });

    test('Consume Should Return a Value', () => {
        const ar = [{id: 1}, {id: 2}, {id: 3}];
        const vertexPipe = getVertexPipe(ar);
        const expectedValue = ar.at(2);
        expect(vertexPipe.consume({justSomething: "Heya!"})).toEqual(expectedValue);
    })
});
