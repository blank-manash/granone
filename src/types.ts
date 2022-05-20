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

export interface Vertex {
    entity: Entity;
    parents: Array<Vertex>;
    children: Array<Vertex>;
}

export interface Entity extends Record<string, any> {
    id: number
}
