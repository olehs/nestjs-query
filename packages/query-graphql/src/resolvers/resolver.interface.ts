import { QueryService } from '@nestjs-query/core';
import { DTONamesOpts } from '../common';
import { ResolverMethodOpts, SubscriptionResolverMethodOpts } from '../decorators';
import { GraphQLPubSub } from '../subscription';
import { ArrayConnectionType } from '../types/connection';
import { CursorConnectionType } from '../types/connection/cursor';
import { PagingStrategies } from '../types/query/paging';
import {
  CursorQueryArgsType,
  NoPagingQueryArgsType,
  OffsetQueryArgsType,
  QueryArgsTypeOpts,
} from '../types/query/query-args';
import { RelationsOpts } from './relations';

export interface ResolverOpts extends ResolverMethodOpts, DTONamesOpts {
  /**
   * Options for single record graphql endpoints
   */
  one?: ResolverMethodOpts;
  /**
   * Options for multiple record graphql endpoints
   */
  many?: ResolverMethodOpts;
  /**
   * All relations that should be exposed on this resolver through `@ResolveField` from `@nestjs/graphql`
   */
  relations?: RelationsOpts;
}

export interface SubscriptionResolverOpts extends SubscriptionResolverMethodOpts, DTONamesOpts {
  one?: SubscriptionResolverMethodOpts;
  many?: SubscriptionResolverMethodOpts;
}

/** @internal */
export interface ServiceResolver<DTO> {
  service: QueryService<DTO>;
  readonly pubSub?: GraphQLPubSub;
}

/** @internal */
export interface ResolverClass<DTO, Resolver extends ServiceResolver<DTO>> {
  new (service: QueryService<DTO>): Resolver;
}

/**
 * @internal
 * Base Resolver that takes in a service as a constructor argument.
 */
export class BaseServiceResolver<DTO> {
  constructor(readonly service: QueryService<DTO>) {}
}

export type ExtractPagingStrategy<
  DTO,
  Opts extends QueryArgsTypeOpts<DTO>
> = Opts['pagingStrategy'] extends PagingStrategies ? Opts['pagingStrategy'] : PagingStrategies.CURSOR;

export type QueryArgsFromStrategy<DTO, S extends PagingStrategies> = S extends PagingStrategies.OFFSET
  ? OffsetQueryArgsType<DTO>
  : S extends PagingStrategies.NONE
  ? NoPagingQueryArgsType<DTO>
  : S extends PagingStrategies.CURSOR
  ? CursorQueryArgsType<DTO>
  : never;

export type QueryArgsFromOpts<DTO, Opts extends QueryArgsTypeOpts<DTO>> = QueryArgsFromStrategy<
  DTO,
  ExtractPagingStrategy<DTO, Opts>
>;

export type ConnectionTypeFromStrategy<DTO, S extends PagingStrategies> = S extends
  | PagingStrategies.OFFSET
  | PagingStrategies.NONE
  ? ArrayConnectionType<DTO>
  : S extends PagingStrategies.CURSOR
  ? CursorConnectionType<DTO>
  : never;

export type ConnectionTypeFromOpts<DTO, Opts extends QueryArgsTypeOpts<DTO>> = ConnectionTypeFromStrategy<
  DTO,
  ExtractPagingStrategy<DTO, Opts>
>;

export type MergePagingStrategyOpts<
  DTO,
  Opts extends QueryArgsTypeOpts<DTO>,
  S extends PagingStrategies
> = Opts['pagingStrategy'] extends PagingStrategies
  ? Opts
  : S extends PagingStrategies
  ? Omit<Opts, 'pagingStrategy'> & { pagingStrategy: S }
  : Opts;
