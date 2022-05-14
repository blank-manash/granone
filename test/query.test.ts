import {Query} from '../query'
import {Graph, GraphImpl} from '../graph'


describe('Query Should Work', () => {

    function getGraph(): Graph {
        const graph = new GraphImpl();
        jest.spyOn(graph, 'findVertices').
            mockImplementation((pred: object) => [ {id: 1}, {id: 2}, {id: 3} ]);
        return graph;
        
    }

    function getQuery(): Query {
        const graph = getGraph();
        const query = Query.create(graph);
        return query;
    }
    test('Graph is mocked', () => {
        const graph = getGraph();
        expect(graph.findVertices({t : 1}).length).toBeGreaterThan(0);
    });

    test('v() with a number', () => {
        const q = getQuery();
        q.v(1);
        expect(q.prog.length).toBeGreaterThan(0);
    });
        
    test('v() with a object', () => {
        const q = getQuery();
        q.v({ id: 31 });
        expect(q.prog.length).toBeGreaterThan(0);
    });

});
