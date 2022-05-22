/**
 * @file  : types.ts
 * @author: Manash Baul <mximpaid@gmail.com>
 * Date   : 14.05.2022
 */

import {PipeType} from "./PipeType";




export enum STATES {
    PULL,
    RUNNING,
    DONE
};

export type Engine = {
    func: PipeType;
    name: string;
    next: number;
    state: number;
};

/* @interface
 * This is the object that the graph consists of, and also the object traversed by our engine.
 * The label Map (label, vertex) , Stores all last vertex it found and it's traversal with the label.
 */
export interface Vertex {
    entity: Entity;
    parents: Array<Vertex>;
    children: Array<Vertex>;
    label?: Map<string, Vertex>;
}

export interface Entity extends Record<string, any> {
    id: number
}
