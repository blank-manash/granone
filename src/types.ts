/**
 * @file  : types.ts
 * @author: Manash Baul <mximpaid@gmail.com>
 * Date   : 14.05.2022
 */

export enum STATES {
    PULL,
    RUNNING,
    DONE
};

/*
 * A PipeType is an object, which takes an object (gremlin) and outputs
 * another, now that may be the same gremlin, or something entirely else
 * It can also output states, like `done` or `pull`.
 */

export interface PipeType {
    consume(entry: object | null): number | object;
};

export type Engine = {
    func: PipeType;
    name: string;
    next: number;
    state: number;
};
