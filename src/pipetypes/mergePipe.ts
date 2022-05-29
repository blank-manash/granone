/**
 * @file  : mergePipe.ts
 * @author: Manash Baul <mximpaid@gmail.com>
 * Date   : 22.05.2022
 */

import {PipeType} from '../PipeType';
import {PIPETYPES, Vertex} from '../types';

export class MergePipeType extends PipeType {
    private labelSet: Set<string>;

    updateState(): void {
        this.updateStateAndMakeUnqiue();
    }

    provides(v: Vertex): void {
        const label = v.label;
        if (label == undefined || !this.satisfies(label)) return;
        this.list.push(v);
        this.updateState();
    }
    private constructor(...args: string[]) {
        super();
        this.labelSet = new Set<string>();
        args.forEach(x => this.labelSet.add(x));
    }
    static create(...args: string[]) {
        return new MergePipeType(...args);
    }

    satisfies(label: string) {
        return this.labelSet.has(label);
    }

    getPipeType(): PIPETYPES {
        return PIPETYPES.MERGE;
    }
}
