import { AnnotationEntity } from './entity/AnnotationEntity';
import { AnnotationTagEntity } from './entity/AnnotationTagEntity';
import { ListAnnotationEntity } from './entity/ListAnnotationEntity';
import { ProjectEntity } from './entity/ProjectEntity';
import { TagEntity } from './entity/TagEntity';
export type * from './MixpanelAnnotationsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { MixpanelAnnotationsEntityBase } from './MixpanelAnnotationsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class MixpanelAnnotationsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Annotation(entopts?: Record<string, any>): AnnotationEntity;
    AnnotationTag(entopts?: Record<string, any>): AnnotationTagEntity;
    ListAnnotation(entopts?: Record<string, any>): ListAnnotationEntity;
    Project(entopts?: Record<string, any>): ProjectEntity;
    Tag(entopts?: Record<string, any>): TagEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): MixpanelAnnotationsSDK;
    tester(testopts?: any, sdkopts?: any): MixpanelAnnotationsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof MixpanelAnnotationsSDK;
export { stdutil, config, BaseFeature, MixpanelAnnotationsEntityBase, MixpanelAnnotationsSDK, SDK, };
