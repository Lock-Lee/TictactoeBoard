/**
 * Client
 **/

import * as runtime from './runtime/client.js'
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>

/**
 * Model GamePlayer
 *
 */
export type GamePlayer = $Result.DefaultSelection<Prisma.$GamePlayerPayload>
/**
 * Model Game
 *
 */
export type Game = $Result.DefaultSelection<Prisma.$GamePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const GAME_RESULT: {
    WIN: 'WIN'
    LOSS: 'LOSS'
    DRAW: 'DRAW'
  }

  export type GAME_RESULT = (typeof GAME_RESULT)[keyof typeof GAME_RESULT]
}

export type GAME_RESULT = $Enums.GAME_RESULT

export const GAME_RESULT: typeof $Enums.GAME_RESULT

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more GamePlayers
 * const gamePlayers = await prisma.gamePlayer.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more GamePlayers
   * const gamePlayers = await prisma.gamePlayer.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>)
  $on<V extends U>(
    eventType: V,
    callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void
  ): PrismaClient

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel }
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(
    fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  ): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<
    'extends',
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs
      }
    >
  >

  /**
   * `prisma.gamePlayer`: Exposes CRUD operations for the **GamePlayer** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more GamePlayers
   * const gamePlayers = await prisma.gamePlayer.findMany()
   * ```
   */
  get gamePlayer(): Prisma.GamePlayerDelegate<ExtArgs, ClientOptions>

  /**
   * `prisma.game`: Exposes CRUD operations for the **Game** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Games
   * const games = await prisma.game.findMany()
   * ```
   */
  get game(): Prisma.GameDelegate<ExtArgs, ClientOptions>
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */

  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<
    ReturnType<T>
  >

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P]
  }

  export type Enumerable<T> = T | Array<T>

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  }

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } & K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown
    ? _Either<O, K, strict>
    : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (
    k: infer I
  ) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K]
  } & {}

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>
      }
    >
  >

  type Key = string | number | symbol
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never
  type AtStrict<O extends object, K extends Key> = O[K & keyof O]
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>
    0: AtLoose<O, K>
  }[strict]

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K]
      } & {}

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K]
  } & {}

  type _Record<K extends keyof any, T> = {
    [P in K]: T
  }

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0

  export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B

  export const type: unique symbol

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never
      }
    : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>,
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<
    T,
    MaybeTupleToUnion<K>
  >

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>

  export const ModelName: {
    GamePlayer: 'GamePlayer'
    Game: 'Game'
  }

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]

  interface TypeMapCb<ClientOptions = {}>
    extends $Utils.Fn<{ extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<
      this['params']['extArgs'],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: 'gamePlayer' | 'game'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      GamePlayer: {
        payload: Prisma.$GamePlayerPayload<ExtArgs>
        fields: Prisma.GamePlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GamePlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GamePlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          findFirst: {
            args: Prisma.GamePlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GamePlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          findMany: {
            args: Prisma.GamePlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>[]
          }
          create: {
            args: Prisma.GamePlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          createMany: {
            args: Prisma.GamePlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GamePlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>[]
          }
          delete: {
            args: Prisma.GamePlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          update: {
            args: Prisma.GamePlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          deleteMany: {
            args: Prisma.GamePlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GamePlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GamePlayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>[]
          }
          upsert: {
            args: Prisma.GamePlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          aggregate: {
            args: Prisma.GamePlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGamePlayer>
          }
          groupBy: {
            args: Prisma.GamePlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<GamePlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.GamePlayerCountArgs<ExtArgs>
            result: $Utils.Optional<GamePlayerCountAggregateOutputType> | number
          }
        }
      }
      Game: {
        payload: Prisma.$GamePayload<ExtArgs>
        fields: Prisma.GameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findFirst: {
            args: Prisma.GameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findMany: {
            args: Prisma.GameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          create: {
            args: Prisma.GameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          createMany: {
            args: Prisma.GameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          delete: {
            args: Prisma.GameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          update: {
            args: Prisma.GameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          deleteMany: {
            args: Prisma.GameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          upsert: {
            args: Prisma.GameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          aggregate: {
            args: Prisma.GameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGame>
          }
          groupBy: {
            args: Prisma.GameGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCountArgs<ExtArgs>
            result: $Utils.Optional<GameCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]]
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]]
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]]
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]]
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    gamePlayer?: GamePlayerOmit
    game?: GameOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never

  export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>

  export type GetEvents<T extends any[]> =
    T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */

  /**
   * Count Type GamePlayerCountOutputType
   */

  export type GamePlayerCountOutputType = {
    games: number
  }

  export type GamePlayerCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    games?: boolean | GamePlayerCountOutputTypeCountGamesArgs
  }

  // Custom InputTypes
  /**
   * GamePlayerCountOutputType without action
   */
  export type GamePlayerCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the GamePlayerCountOutputType
     */
    select?: GamePlayerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GamePlayerCountOutputType without action
   */
  export type GamePlayerCountOutputTypeCountGamesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: GameWhereInput
  }

  /**
   * Models
   */

  /**
   * Model GamePlayer
   */

  export type AggregateGamePlayer = {
    _count: GamePlayerCountAggregateOutputType | null
    _avg: GamePlayerAvgAggregateOutputType | null
    _sum: GamePlayerSumAggregateOutputType | null
    _min: GamePlayerMinAggregateOutputType | null
    _max: GamePlayerMaxAggregateOutputType | null
  }

  export type GamePlayerAvgAggregateOutputType = {
    score: number | null
    winStreak: number | null
    totalGames: number | null
    totalWins: number | null
    totalLosses: number | null
    totalDraws: number | null
  }

  export type GamePlayerSumAggregateOutputType = {
    score: number | null
    winStreak: number | null
    totalGames: number | null
    totalWins: number | null
    totalLosses: number | null
    totalDraws: number | null
  }

  export type GamePlayerMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
    provider: string | null
    providerId: string | null
    score: number | null
    winStreak: number | null
    totalGames: number | null
    totalWins: number | null
    totalLosses: number | null
    totalDraws: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GamePlayerMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
    provider: string | null
    providerId: string | null
    score: number | null
    winStreak: number | null
    totalGames: number | null
    totalWins: number | null
    totalLosses: number | null
    totalDraws: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GamePlayerCountAggregateOutputType = {
    id: number
    email: number
    name: number
    image: number
    provider: number
    providerId: number
    score: number
    winStreak: number
    totalGames: number
    totalWins: number
    totalLosses: number
    totalDraws: number
    createdAt: number
    updatedAt: number
    _all: number
  }

  export type GamePlayerAvgAggregateInputType = {
    score?: true
    winStreak?: true
    totalGames?: true
    totalWins?: true
    totalLosses?: true
    totalDraws?: true
  }

  export type GamePlayerSumAggregateInputType = {
    score?: true
    winStreak?: true
    totalGames?: true
    totalWins?: true
    totalLosses?: true
    totalDraws?: true
  }

  export type GamePlayerMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    provider?: true
    providerId?: true
    score?: true
    winStreak?: true
    totalGames?: true
    totalWins?: true
    totalLosses?: true
    totalDraws?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GamePlayerMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    provider?: true
    providerId?: true
    score?: true
    winStreak?: true
    totalGames?: true
    totalWins?: true
    totalLosses?: true
    totalDraws?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GamePlayerCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    provider?: true
    providerId?: true
    score?: true
    winStreak?: true
    totalGames?: true
    totalWins?: true
    totalLosses?: true
    totalDraws?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GamePlayerAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which GamePlayer to aggregate.
     */
    where?: GamePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of GamePlayers to fetch.
     */
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: GamePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` GamePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` GamePlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned GamePlayers
     **/
    _count?: true | GamePlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: GamePlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: GamePlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: GamePlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: GamePlayerMaxAggregateInputType
  }

  export type GetGamePlayerAggregateType<T extends GamePlayerAggregateArgs> = {
    [P in keyof T & keyof AggregateGamePlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGamePlayer[P]>
      : GetScalarType<T[P], AggregateGamePlayer[P]>
  }

  export type GamePlayerGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: GamePlayerWhereInput
    orderBy?: GamePlayerOrderByWithAggregationInput | GamePlayerOrderByWithAggregationInput[]
    by: GamePlayerScalarFieldEnum[] | GamePlayerScalarFieldEnum
    having?: GamePlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GamePlayerCountAggregateInputType | true
    _avg?: GamePlayerAvgAggregateInputType
    _sum?: GamePlayerSumAggregateInputType
    _min?: GamePlayerMinAggregateInputType
    _max?: GamePlayerMaxAggregateInputType
  }

  export type GamePlayerGroupByOutputType = {
    id: string
    email: string
    name: string | null
    image: string | null
    provider: string
    providerId: string
    score: number
    winStreak: number
    totalGames: number
    totalWins: number
    totalLosses: number
    totalDraws: number
    createdAt: Date
    updatedAt: Date
    _count: GamePlayerCountAggregateOutputType | null
    _avg: GamePlayerAvgAggregateOutputType | null
    _sum: GamePlayerSumAggregateOutputType | null
    _min: GamePlayerMinAggregateOutputType | null
    _max: GamePlayerMaxAggregateOutputType | null
  }

  type GetGamePlayerGroupByPayload<T extends GamePlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GamePlayerGroupByOutputType, T['by']> & {
        [P in keyof T & keyof GamePlayerGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], GamePlayerGroupByOutputType[P]>
          : GetScalarType<T[P], GamePlayerGroupByOutputType[P]>
      }
    >
  >

  export type GamePlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean
        email?: boolean
        name?: boolean
        image?: boolean
        provider?: boolean
        providerId?: boolean
        score?: boolean
        winStreak?: boolean
        totalGames?: boolean
        totalWins?: boolean
        totalLosses?: boolean
        totalDraws?: boolean
        createdAt?: boolean
        updatedAt?: boolean
        games?: boolean | GamePlayer$gamesArgs<ExtArgs>
        _count?: boolean | GamePlayerCountOutputTypeDefaultArgs<ExtArgs>
      },
      ExtArgs['result']['gamePlayer']
    >

  export type GamePlayerSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean
      email?: boolean
      name?: boolean
      image?: boolean
      provider?: boolean
      providerId?: boolean
      score?: boolean
      winStreak?: boolean
      totalGames?: boolean
      totalWins?: boolean
      totalLosses?: boolean
      totalDraws?: boolean
      createdAt?: boolean
      updatedAt?: boolean
    },
    ExtArgs['result']['gamePlayer']
  >

  export type GamePlayerSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean
      email?: boolean
      name?: boolean
      image?: boolean
      provider?: boolean
      providerId?: boolean
      score?: boolean
      winStreak?: boolean
      totalGames?: boolean
      totalWins?: boolean
      totalLosses?: boolean
      totalDraws?: boolean
      createdAt?: boolean
      updatedAt?: boolean
    },
    ExtArgs['result']['gamePlayer']
  >

  export type GamePlayerSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    provider?: boolean
    providerId?: boolean
    score?: boolean
    winStreak?: boolean
    totalGames?: boolean
    totalWins?: boolean
    totalLosses?: boolean
    totalDraws?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GamePlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      | 'id'
      | 'email'
      | 'name'
      | 'image'
      | 'provider'
      | 'providerId'
      | 'score'
      | 'winStreak'
      | 'totalGames'
      | 'totalWins'
      | 'totalLosses'
      | 'totalDraws'
      | 'createdAt'
      | 'updatedAt',
      ExtArgs['result']['gamePlayer']
    >
  export type GamePlayerInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    games?: boolean | GamePlayer$gamesArgs<ExtArgs>
    _count?: boolean | GamePlayerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GamePlayerIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {}
  export type GamePlayerIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {}

  export type $GamePlayerPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'GamePlayer'
    objects: {
      games: Prisma.$GamePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<
      {
        id: string
        email: string
        name: string | null
        image: string | null
        provider: string
        providerId: string
        score: number
        winStreak: number
        totalGames: number
        totalWins: number
        totalLosses: number
        totalDraws: number
        createdAt: Date
        updatedAt: Date
      },
      ExtArgs['result']['gamePlayer']
    >
    composites: {}
  }

  type GamePlayerGetPayload<S extends boolean | null | undefined | GamePlayerDefaultArgs> =
    $Result.GetResult<Prisma.$GamePlayerPayload, S>

  type GamePlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GamePlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GamePlayerCountAggregateInputType | true
    }

  export interface GamePlayerDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['GamePlayer']
      meta: { name: 'GamePlayer' }
    }
    /**
     * Find zero or one GamePlayer that matches the filter.
     * @param {GamePlayerFindUniqueArgs} args - Arguments to find a GamePlayer
     * @example
     * // Get one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GamePlayerFindUniqueArgs>(
      args: SelectSubset<T, GamePlayerFindUniqueArgs<ExtArgs>>
    ): Prisma__GamePlayerClient<
      $Result.GetResult<
        Prisma.$GamePlayerPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >

    /**
     * Find one GamePlayer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GamePlayerFindUniqueOrThrowArgs} args - Arguments to find a GamePlayer
     * @example
     * // Get one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GamePlayerFindUniqueOrThrowArgs>(
      args: SelectSubset<T, GamePlayerFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__GamePlayerClient<
      $Result.GetResult<
        Prisma.$GamePlayerPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >

    /**
     * Find the first GamePlayer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerFindFirstArgs} args - Arguments to find a GamePlayer
     * @example
     * // Get one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GamePlayerFindFirstArgs>(
      args?: SelectSubset<T, GamePlayerFindFirstArgs<ExtArgs>>
    ): Prisma__GamePlayerClient<
      $Result.GetResult<
        Prisma.$GamePlayerPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >

    /**
     * Find the first GamePlayer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerFindFirstOrThrowArgs} args - Arguments to find a GamePlayer
     * @example
     * // Get one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GamePlayerFindFirstOrThrowArgs>(
      args?: SelectSubset<T, GamePlayerFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__GamePlayerClient<
      $Result.GetResult<
        Prisma.$GamePlayerPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >

    /**
     * Find zero or more GamePlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GamePlayers
     * const gamePlayers = await prisma.gamePlayer.findMany()
     *
     * // Get first 10 GamePlayers
     * const gamePlayers = await prisma.gamePlayer.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const gamePlayerWithIdOnly = await prisma.gamePlayer.findMany({ select: { id: true } })
     *
     */
    findMany<T extends GamePlayerFindManyArgs>(
      args?: SelectSubset<T, GamePlayerFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >

    /**
     * Create a GamePlayer.
     * @param {GamePlayerCreateArgs} args - Arguments to create a GamePlayer.
     * @example
     * // Create one GamePlayer
     * const GamePlayer = await prisma.gamePlayer.create({
     *   data: {
     *     // ... data to create a GamePlayer
     *   }
     * })
     *
     */
    create<T extends GamePlayerCreateArgs>(
      args: SelectSubset<T, GamePlayerCreateArgs<ExtArgs>>
    ): Prisma__GamePlayerClient<
      $Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >

    /**
     * Create many GamePlayers.
     * @param {GamePlayerCreateManyArgs} args - Arguments to create many GamePlayers.
     * @example
     * // Create many GamePlayers
     * const gamePlayer = await prisma.gamePlayer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends GamePlayerCreateManyArgs>(
      args?: SelectSubset<T, GamePlayerCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GamePlayers and returns the data saved in the database.
     * @param {GamePlayerCreateManyAndReturnArgs} args - Arguments to create many GamePlayers.
     * @example
     * // Create many GamePlayers
     * const gamePlayer = await prisma.gamePlayer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many GamePlayers and only return the `id`
     * const gamePlayerWithIdOnly = await prisma.gamePlayer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends GamePlayerCreateManyAndReturnArgs>(
      args?: SelectSubset<T, GamePlayerCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$GamePlayerPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >

    /**
     * Delete a GamePlayer.
     * @param {GamePlayerDeleteArgs} args - Arguments to delete one GamePlayer.
     * @example
     * // Delete one GamePlayer
     * const GamePlayer = await prisma.gamePlayer.delete({
     *   where: {
     *     // ... filter to delete one GamePlayer
     *   }
     * })
     *
     */
    delete<T extends GamePlayerDeleteArgs>(
      args: SelectSubset<T, GamePlayerDeleteArgs<ExtArgs>>
    ): Prisma__GamePlayerClient<
      $Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >

    /**
     * Update one GamePlayer.
     * @param {GamePlayerUpdateArgs} args - Arguments to update one GamePlayer.
     * @example
     * // Update one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends GamePlayerUpdateArgs>(
      args: SelectSubset<T, GamePlayerUpdateArgs<ExtArgs>>
    ): Prisma__GamePlayerClient<
      $Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >

    /**
     * Delete zero or more GamePlayers.
     * @param {GamePlayerDeleteManyArgs} args - Arguments to filter GamePlayers to delete.
     * @example
     * // Delete a few GamePlayers
     * const { count } = await prisma.gamePlayer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends GamePlayerDeleteManyArgs>(
      args?: SelectSubset<T, GamePlayerDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GamePlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GamePlayers
     * const gamePlayer = await prisma.gamePlayer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends GamePlayerUpdateManyArgs>(
      args: SelectSubset<T, GamePlayerUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GamePlayers and returns the data updated in the database.
     * @param {GamePlayerUpdateManyAndReturnArgs} args - Arguments to update many GamePlayers.
     * @example
     * // Update many GamePlayers
     * const gamePlayer = await prisma.gamePlayer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more GamePlayers and only return the `id`
     * const gamePlayerWithIdOnly = await prisma.gamePlayer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends GamePlayerUpdateManyAndReturnArgs>(
      args: SelectSubset<T, GamePlayerUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$GamePlayerPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >

    /**
     * Create or update one GamePlayer.
     * @param {GamePlayerUpsertArgs} args - Arguments to update or create a GamePlayer.
     * @example
     * // Update or create a GamePlayer
     * const gamePlayer = await prisma.gamePlayer.upsert({
     *   create: {
     *     // ... data to create a GamePlayer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GamePlayer we want to update
     *   }
     * })
     */
    upsert<T extends GamePlayerUpsertArgs>(
      args: SelectSubset<T, GamePlayerUpsertArgs<ExtArgs>>
    ): Prisma__GamePlayerClient<
      $Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >

    /**
     * Count the number of GamePlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerCountArgs} args - Arguments to filter GamePlayers to count.
     * @example
     * // Count the number of GamePlayers
     * const count = await prisma.gamePlayer.count({
     *   where: {
     *     // ... the filter for the GamePlayers we want to count
     *   }
     * })
     **/
    count<T extends GamePlayerCountArgs>(
      args?: Subset<T, GamePlayerCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GamePlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GamePlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends GamePlayerAggregateArgs>(
      args: Subset<T, GamePlayerAggregateArgs>
    ): Prisma.PrismaPromise<GetGamePlayerAggregateType<T>>

    /**
     * Group by GamePlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends GamePlayerGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GamePlayerGroupByArgs['orderBy'] }
        : { orderBy?: GamePlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`]
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, GamePlayerGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetGamePlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
    /**
     * Fields of the GamePlayer model
     */
    readonly fields: GamePlayerFieldRefs
  }

  /**
   * The delegate class that acts as a "Promise-like" for GamePlayer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GamePlayerClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise'
    games<T extends GamePlayer$gamesArgs<ExtArgs> = {}>(
      args?: Subset<T, GamePlayer$gamesArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, 'findMany', GlobalOmitOptions> | Null
    >
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }

  /**
   * Fields of the GamePlayer model
   */
  interface GamePlayerFieldRefs {
    readonly id: FieldRef<'GamePlayer', 'String'>
    readonly email: FieldRef<'GamePlayer', 'String'>
    readonly name: FieldRef<'GamePlayer', 'String'>
    readonly image: FieldRef<'GamePlayer', 'String'>
    readonly provider: FieldRef<'GamePlayer', 'String'>
    readonly providerId: FieldRef<'GamePlayer', 'String'>
    readonly score: FieldRef<'GamePlayer', 'Int'>
    readonly winStreak: FieldRef<'GamePlayer', 'Int'>
    readonly totalGames: FieldRef<'GamePlayer', 'Int'>
    readonly totalWins: FieldRef<'GamePlayer', 'Int'>
    readonly totalLosses: FieldRef<'GamePlayer', 'Int'>
    readonly totalDraws: FieldRef<'GamePlayer', 'Int'>
    readonly createdAt: FieldRef<'GamePlayer', 'DateTime'>
    readonly updatedAt: FieldRef<'GamePlayer', 'DateTime'>
  }

  // Custom InputTypes
  /**
   * GamePlayer findUnique
   */
  export type GamePlayerFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayer to fetch.
     */
    where: GamePlayerWhereUniqueInput
  }

  /**
   * GamePlayer findUniqueOrThrow
   */
  export type GamePlayerFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayer to fetch.
     */
    where: GamePlayerWhereUniqueInput
  }

  /**
   * GamePlayer findFirst
   */
  export type GamePlayerFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayer to fetch.
     */
    where?: GamePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of GamePlayers to fetch.
     */
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for GamePlayers.
     */
    cursor?: GamePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` GamePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` GamePlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of GamePlayers.
     */
    distinct?: GamePlayerScalarFieldEnum | GamePlayerScalarFieldEnum[]
  }

  /**
   * GamePlayer findFirstOrThrow
   */
  export type GamePlayerFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayer to fetch.
     */
    where?: GamePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of GamePlayers to fetch.
     */
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for GamePlayers.
     */
    cursor?: GamePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` GamePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` GamePlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of GamePlayers.
     */
    distinct?: GamePlayerScalarFieldEnum | GamePlayerScalarFieldEnum[]
  }

  /**
   * GamePlayer findMany
   */
  export type GamePlayerFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayers to fetch.
     */
    where?: GamePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of GamePlayers to fetch.
     */
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing GamePlayers.
     */
    cursor?: GamePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` GamePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` GamePlayers.
     */
    skip?: number
    distinct?: GamePlayerScalarFieldEnum | GamePlayerScalarFieldEnum[]
  }

  /**
   * GamePlayer create
   */
  export type GamePlayerCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a GamePlayer.
     */
    data: XOR<GamePlayerCreateInput, GamePlayerUncheckedCreateInput>
  }

  /**
   * GamePlayer createMany
   */
  export type GamePlayerCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many GamePlayers.
     */
    data: GamePlayerCreateManyInput | GamePlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GamePlayer createManyAndReturn
   */
  export type GamePlayerCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * The data used to create many GamePlayers.
     */
    data: GamePlayerCreateManyInput | GamePlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GamePlayer update
   */
  export type GamePlayerUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a GamePlayer.
     */
    data: XOR<GamePlayerUpdateInput, GamePlayerUncheckedUpdateInput>
    /**
     * Choose, which GamePlayer to update.
     */
    where: GamePlayerWhereUniqueInput
  }

  /**
   * GamePlayer updateMany
   */
  export type GamePlayerUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update GamePlayers.
     */
    data: XOR<GamePlayerUpdateManyMutationInput, GamePlayerUncheckedUpdateManyInput>
    /**
     * Filter which GamePlayers to update
     */
    where?: GamePlayerWhereInput
    /**
     * Limit how many GamePlayers to update.
     */
    limit?: number
  }

  /**
   * GamePlayer updateManyAndReturn
   */
  export type GamePlayerUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * The data used to update GamePlayers.
     */
    data: XOR<GamePlayerUpdateManyMutationInput, GamePlayerUncheckedUpdateManyInput>
    /**
     * Filter which GamePlayers to update
     */
    where?: GamePlayerWhereInput
    /**
     * Limit how many GamePlayers to update.
     */
    limit?: number
  }

  /**
   * GamePlayer upsert
   */
  export type GamePlayerUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the GamePlayer to update in case it exists.
     */
    where: GamePlayerWhereUniqueInput
    /**
     * In case the GamePlayer found by the `where` argument doesn't exist, create a new GamePlayer with this data.
     */
    create: XOR<GamePlayerCreateInput, GamePlayerUncheckedCreateInput>
    /**
     * In case the GamePlayer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GamePlayerUpdateInput, GamePlayerUncheckedUpdateInput>
  }

  /**
   * GamePlayer delete
   */
  export type GamePlayerDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter which GamePlayer to delete.
     */
    where: GamePlayerWhereUniqueInput
  }

  /**
   * GamePlayer deleteMany
   */
  export type GamePlayerDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which GamePlayers to delete
     */
    where?: GamePlayerWhereInput
    /**
     * Limit how many GamePlayers to delete.
     */
    limit?: number
  }

  /**
   * GamePlayer.games
   */
  export type GamePlayer$gamesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    where?: GameWhereInput
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    cursor?: GameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * GamePlayer without action
   */
  export type GamePlayerDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
  }

  /**
   * Model Game
   */

  export type AggregateGame = {
    _count: GameCountAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  export type GameMinAggregateOutputType = {
    id: string | null
    playerId: string | null
    result: $Enums.GAME_RESULT | null
    createdAt: Date | null
  }

  export type GameMaxAggregateOutputType = {
    id: string | null
    playerId: string | null
    result: $Enums.GAME_RESULT | null
    createdAt: Date | null
  }

  export type GameCountAggregateOutputType = {
    id: number
    playerId: number
    result: number
    moves: number
    createdAt: number
    _all: number
  }

  export type GameMinAggregateInputType = {
    id?: true
    playerId?: true
    result?: true
    createdAt?: true
  }

  export type GameMaxAggregateInputType = {
    id?: true
    playerId?: true
    result?: true
    createdAt?: true
  }

  export type GameCountAggregateInputType = {
    id?: true
    playerId?: true
    result?: true
    moves?: true
    createdAt?: true
    _all?: true
  }

  export type GameAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Game to aggregate.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Games
     **/
    _count?: true | GameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: GameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: GameMaxAggregateInputType
  }

  export type GetGameAggregateType<T extends GameAggregateArgs> = {
    [P in keyof T & keyof AggregateGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGame[P]>
      : GetScalarType<T[P], AggregateGame[P]>
  }

  export type GameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      where?: GameWhereInput
      orderBy?: GameOrderByWithAggregationInput | GameOrderByWithAggregationInput[]
      by: GameScalarFieldEnum[] | GameScalarFieldEnum
      having?: GameScalarWhereWithAggregatesInput
      take?: number
      skip?: number
      _count?: GameCountAggregateInputType | true
      _min?: GameMinAggregateInputType
      _max?: GameMaxAggregateInputType
    }

  export type GameGroupByOutputType = {
    id: string
    playerId: string
    result: $Enums.GAME_RESULT
    moves: JsonValue
    createdAt: Date
    _count: GameCountAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  type GetGameGroupByPayload<T extends GameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameGroupByOutputType, T['by']> & {
        [P in keyof T & keyof GameGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], GameGroupByOutputType[P]>
          : GetScalarType<T[P], GameGroupByOutputType[P]>
      }
    >
  >

  export type GameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean
        playerId?: boolean
        result?: boolean
        moves?: boolean
        createdAt?: boolean
        player?: boolean | GamePlayerDefaultArgs<ExtArgs>
      },
      ExtArgs['result']['game']
    >

  export type GameSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean
      playerId?: boolean
      result?: boolean
      moves?: boolean
      createdAt?: boolean
      player?: boolean | GamePlayerDefaultArgs<ExtArgs>
    },
    ExtArgs['result']['game']
  >

  export type GameSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean
      playerId?: boolean
      result?: boolean
      moves?: boolean
      createdAt?: boolean
      player?: boolean | GamePlayerDefaultArgs<ExtArgs>
    },
    ExtArgs['result']['game']
  >

  export type GameSelectScalar = {
    id?: boolean
    playerId?: boolean
    result?: boolean
    moves?: boolean
    createdAt?: boolean
  }

  export type GameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      'id' | 'playerId' | 'result' | 'moves' | 'createdAt',
      ExtArgs['result']['game']
    >
  export type GameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | GamePlayerDefaultArgs<ExtArgs>
  }
  export type GameIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    player?: boolean | GamePlayerDefaultArgs<ExtArgs>
  }
  export type GameIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    player?: boolean | GamePlayerDefaultArgs<ExtArgs>
  }

  export type $GamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'Game'
    objects: {
      player: Prisma.$GamePlayerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<
      {
        id: string
        playerId: string
        result: $Enums.GAME_RESULT
        moves: Prisma.JsonValue
        createdAt: Date
      },
      ExtArgs['result']['game']
    >
    composites: {}
  }

  type GameGetPayload<S extends boolean | null | undefined | GameDefaultArgs> = $Result.GetResult<
    Prisma.$GamePayload,
    S
  >

  type GameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    GameFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: GameCountAggregateInputType | true
  }

  export interface GameDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Game']; meta: { name: 'Game' } }
    /**
     * Find zero or one Game that matches the filter.
     * @param {GameFindUniqueArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameFindUniqueArgs>(
      args: SelectSubset<T, GameFindUniqueArgs<ExtArgs>>
    ): Prisma__GameClient<
      $Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >

    /**
     * Find one Game that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameFindUniqueOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameFindUniqueOrThrowArgs>(
      args: SelectSubset<T, GameFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__GameClient<
      $Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >

    /**
     * Find the first Game that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameFindFirstArgs>(
      args?: SelectSubset<T, GameFindFirstArgs<ExtArgs>>
    ): Prisma__GameClient<
      $Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >

    /**
     * Find the first Game that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameFindFirstOrThrowArgs>(
      args?: SelectSubset<T, GameFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__GameClient<
      $Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >

    /**
     * Find zero or more Games that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Games
     * const games = await prisma.game.findMany()
     *
     * // Get first 10 Games
     * const games = await prisma.game.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const gameWithIdOnly = await prisma.game.findMany({ select: { id: true } })
     *
     */
    findMany<T extends GameFindManyArgs>(
      args?: SelectSubset<T, GameFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >

    /**
     * Create a Game.
     * @param {GameCreateArgs} args - Arguments to create a Game.
     * @example
     * // Create one Game
     * const Game = await prisma.game.create({
     *   data: {
     *     // ... data to create a Game
     *   }
     * })
     *
     */
    create<T extends GameCreateArgs>(
      args: SelectSubset<T, GameCreateArgs<ExtArgs>>
    ): Prisma__GameClient<
      $Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >

    /**
     * Create many Games.
     * @param {GameCreateManyArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends GameCreateManyArgs>(
      args?: SelectSubset<T, GameCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Games and returns the data saved in the database.
     * @param {GameCreateManyAndReturnArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends GameCreateManyAndReturnArgs>(
      args?: SelectSubset<T, GameCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, 'createManyAndReturn', GlobalOmitOptions>
    >

    /**
     * Delete a Game.
     * @param {GameDeleteArgs} args - Arguments to delete one Game.
     * @example
     * // Delete one Game
     * const Game = await prisma.game.delete({
     *   where: {
     *     // ... filter to delete one Game
     *   }
     * })
     *
     */
    delete<T extends GameDeleteArgs>(
      args: SelectSubset<T, GameDeleteArgs<ExtArgs>>
    ): Prisma__GameClient<
      $Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >

    /**
     * Update one Game.
     * @param {GameUpdateArgs} args - Arguments to update one Game.
     * @example
     * // Update one Game
     * const game = await prisma.game.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends GameUpdateArgs>(
      args: SelectSubset<T, GameUpdateArgs<ExtArgs>>
    ): Prisma__GameClient<
      $Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >

    /**
     * Delete zero or more Games.
     * @param {GameDeleteManyArgs} args - Arguments to filter Games to delete.
     * @example
     * // Delete a few Games
     * const { count } = await prisma.game.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends GameDeleteManyArgs>(
      args?: SelectSubset<T, GameDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends GameUpdateManyArgs>(
      args: SelectSubset<T, GameUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games and returns the data updated in the database.
     * @param {GameUpdateManyAndReturnArgs} args - Arguments to update many Games.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends GameUpdateManyAndReturnArgs>(
      args: SelectSubset<T, GameUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, 'updateManyAndReturn', GlobalOmitOptions>
    >

    /**
     * Create or update one Game.
     * @param {GameUpsertArgs} args - Arguments to update or create a Game.
     * @example
     * // Update or create a Game
     * const game = await prisma.game.upsert({
     *   create: {
     *     // ... data to create a Game
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Game we want to update
     *   }
     * })
     */
    upsert<T extends GameUpsertArgs>(
      args: SelectSubset<T, GameUpsertArgs<ExtArgs>>
    ): Prisma__GameClient<
      $Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >

    /**
     * Count the number of Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCountArgs} args - Arguments to filter Games to count.
     * @example
     * // Count the number of Games
     * const count = await prisma.game.count({
     *   where: {
     *     // ... the filter for the Games we want to count
     *   }
     * })
     **/
    count<T extends GameCountArgs>(
      args?: Subset<T, GameCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends GameAggregateArgs>(
      args: Subset<T, GameAggregateArgs>
    ): Prisma.PrismaPromise<GetGameAggregateType<T>>

    /**
     * Group by Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends GameGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameGroupByArgs['orderBy'] }
        : { orderBy?: GameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`]
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, GameGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
    /**
     * Fields of the Game model
     */
    readonly fields: GameFieldRefs
  }

  /**
   * The delegate class that acts as a "Promise-like" for Game.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise'
    player<T extends GamePlayerDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, GamePlayerDefaultArgs<ExtArgs>>
    ): Prisma__GamePlayerClient<
      | $Result.GetResult<
          Prisma.$GamePlayerPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }

  /**
   * Fields of the Game model
   */
  interface GameFieldRefs {
    readonly id: FieldRef<'Game', 'String'>
    readonly playerId: FieldRef<'Game', 'String'>
    readonly result: FieldRef<'Game', 'GAME_RESULT'>
    readonly moves: FieldRef<'Game', 'Json'>
    readonly createdAt: FieldRef<'Game', 'DateTime'>
  }

  // Custom InputTypes
  /**
   * Game findUnique
   */
  export type GameFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findUniqueOrThrow
   */
  export type GameFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findFirst
   */
  export type GameFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findFirstOrThrow
   */
  export type GameFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findMany
   */
  export type GameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Game
       */
      select?: GameSelect<ExtArgs> | null
      /**
       * Omit specific fields from the Game
       */
      omit?: GameOmit<ExtArgs> | null
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: GameInclude<ExtArgs> | null
      /**
       * Filter, which Games to fetch.
       */
      where?: GameWhereInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Games to fetch.
       */
      orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for listing Games.
       */
      cursor?: GameWhereUniqueInput
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Games from the position of the cursor.
       */
      take?: number
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Games.
       */
      skip?: number
      distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
    }

  /**
   * Game create
   */
  export type GameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to create a Game.
     */
    data: XOR<GameCreateInput, GameUncheckedCreateInput>
  }

  /**
   * Game createMany
   */
  export type GameCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game createManyAndReturn
   */
  export type GameCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Game update
   */
  export type GameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to update a Game.
     */
    data: XOR<GameUpdateInput, GameUncheckedUpdateInput>
    /**
     * Choose, which Game to update.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game updateMany
   */
  export type GameUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
  }

  /**
   * Game updateManyAndReturn
   */
  export type GameUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Game upsert
   */
  export type GameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The filter to search for the Game to update in case it exists.
     */
    where: GameWhereUniqueInput
    /**
     * In case the Game found by the `where` argument doesn't exist, create a new Game with this data.
     */
    create: XOR<GameCreateInput, GameUncheckedCreateInput>
    /**
     * In case the Game was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameUpdateInput, GameUncheckedUpdateInput>
  }

  /**
   * Game delete
   */
  export type GameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter which Game to delete.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game deleteMany
   */
  export type GameDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Games to delete
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to delete.
     */
    limit?: number
  }

  /**
   * Game without action
   */
  export type GameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Game
       */
      select?: GameSelect<ExtArgs> | null
      /**
       * Omit specific fields from the Game
       */
      omit?: GameOmit<ExtArgs> | null
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: GameInclude<ExtArgs> | null
    }

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted'
    ReadCommitted: 'ReadCommitted'
    RepeatableRead: 'RepeatableRead'
    Serializable: 'Serializable'
  }

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]

  export const GamePlayerScalarFieldEnum: {
    id: 'id'
    email: 'email'
    name: 'name'
    image: 'image'
    provider: 'provider'
    providerId: 'providerId'
    score: 'score'
    winStreak: 'winStreak'
    totalGames: 'totalGames'
    totalWins: 'totalWins'
    totalLosses: 'totalLosses'
    totalDraws: 'totalDraws'
    createdAt: 'createdAt'
    updatedAt: 'updatedAt'
  }

  export type GamePlayerScalarFieldEnum =
    (typeof GamePlayerScalarFieldEnum)[keyof typeof GamePlayerScalarFieldEnum]

  export const GameScalarFieldEnum: {
    id: 'id'
    playerId: 'playerId'
    result: 'result'
    moves: 'moves'
    createdAt: 'createdAt'
  }

  export type GameScalarFieldEnum = (typeof GameScalarFieldEnum)[keyof typeof GameScalarFieldEnum]

  export const SortOrder: {
    asc: 'asc'
    desc: 'desc'
  }

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]

  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  }

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]

  export const QueryMode: {
    default: 'default'
    insensitive: 'insensitive'
  }

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]

  export const NullsOrder: {
    first: 'first'
    last: 'last'
  }

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]

  export const JsonNullValueFilter: {
    DbNull: typeof DbNull
    JsonNull: typeof JsonNull
    AnyNull: typeof AnyNull
  }

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >

  /**
   * Reference to a field of type 'GAME_RESULT'
   */
  export type EnumGAME_RESULTFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'GAME_RESULT'
  >

  /**
   * Reference to a field of type 'GAME_RESULT[]'
   */
  export type ListEnumGAME_RESULTFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'GAME_RESULT[]'
  >

  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>

  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'QueryMode'
  >

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>

  /**
   * Deep Input Types
   */

  export type GamePlayerWhereInput = {
    AND?: GamePlayerWhereInput | GamePlayerWhereInput[]
    OR?: GamePlayerWhereInput[]
    NOT?: GamePlayerWhereInput | GamePlayerWhereInput[]
    id?: StringFilter<'GamePlayer'> | string
    email?: StringFilter<'GamePlayer'> | string
    name?: StringNullableFilter<'GamePlayer'> | string | null
    image?: StringNullableFilter<'GamePlayer'> | string | null
    provider?: StringFilter<'GamePlayer'> | string
    providerId?: StringFilter<'GamePlayer'> | string
    score?: IntFilter<'GamePlayer'> | number
    winStreak?: IntFilter<'GamePlayer'> | number
    totalGames?: IntFilter<'GamePlayer'> | number
    totalWins?: IntFilter<'GamePlayer'> | number
    totalLosses?: IntFilter<'GamePlayer'> | number
    totalDraws?: IntFilter<'GamePlayer'> | number
    createdAt?: DateTimeFilter<'GamePlayer'> | Date | string
    updatedAt?: DateTimeFilter<'GamePlayer'> | Date | string
    games?: GameListRelationFilter
  }

  export type GamePlayerOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    score?: SortOrder
    winStreak?: SortOrder
    totalGames?: SortOrder
    totalWins?: SortOrder
    totalLosses?: SortOrder
    totalDraws?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    games?: GameOrderByRelationAggregateInput
  }

  export type GamePlayerWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string
      email?: string
      provider_providerId?: GamePlayerProviderProviderIdCompoundUniqueInput
      AND?: GamePlayerWhereInput | GamePlayerWhereInput[]
      OR?: GamePlayerWhereInput[]
      NOT?: GamePlayerWhereInput | GamePlayerWhereInput[]
      name?: StringNullableFilter<'GamePlayer'> | string | null
      image?: StringNullableFilter<'GamePlayer'> | string | null
      provider?: StringFilter<'GamePlayer'> | string
      providerId?: StringFilter<'GamePlayer'> | string
      score?: IntFilter<'GamePlayer'> | number
      winStreak?: IntFilter<'GamePlayer'> | number
      totalGames?: IntFilter<'GamePlayer'> | number
      totalWins?: IntFilter<'GamePlayer'> | number
      totalLosses?: IntFilter<'GamePlayer'> | number
      totalDraws?: IntFilter<'GamePlayer'> | number
      createdAt?: DateTimeFilter<'GamePlayer'> | Date | string
      updatedAt?: DateTimeFilter<'GamePlayer'> | Date | string
      games?: GameListRelationFilter
    },
    'id' | 'email' | 'provider_providerId'
  >

  export type GamePlayerOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    score?: SortOrder
    winStreak?: SortOrder
    totalGames?: SortOrder
    totalWins?: SortOrder
    totalLosses?: SortOrder
    totalDraws?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GamePlayerCountOrderByAggregateInput
    _avg?: GamePlayerAvgOrderByAggregateInput
    _max?: GamePlayerMaxOrderByAggregateInput
    _min?: GamePlayerMinOrderByAggregateInput
    _sum?: GamePlayerSumOrderByAggregateInput
  }

  export type GamePlayerScalarWhereWithAggregatesInput = {
    AND?: GamePlayerScalarWhereWithAggregatesInput | GamePlayerScalarWhereWithAggregatesInput[]
    OR?: GamePlayerScalarWhereWithAggregatesInput[]
    NOT?: GamePlayerScalarWhereWithAggregatesInput | GamePlayerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<'GamePlayer'> | string
    email?: StringWithAggregatesFilter<'GamePlayer'> | string
    name?: StringNullableWithAggregatesFilter<'GamePlayer'> | string | null
    image?: StringNullableWithAggregatesFilter<'GamePlayer'> | string | null
    provider?: StringWithAggregatesFilter<'GamePlayer'> | string
    providerId?: StringWithAggregatesFilter<'GamePlayer'> | string
    score?: IntWithAggregatesFilter<'GamePlayer'> | number
    winStreak?: IntWithAggregatesFilter<'GamePlayer'> | number
    totalGames?: IntWithAggregatesFilter<'GamePlayer'> | number
    totalWins?: IntWithAggregatesFilter<'GamePlayer'> | number
    totalLosses?: IntWithAggregatesFilter<'GamePlayer'> | number
    totalDraws?: IntWithAggregatesFilter<'GamePlayer'> | number
    createdAt?: DateTimeWithAggregatesFilter<'GamePlayer'> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<'GamePlayer'> | Date | string
  }

  export type GameWhereInput = {
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    id?: StringFilter<'Game'> | string
    playerId?: StringFilter<'Game'> | string
    result?: EnumGAME_RESULTFilter<'Game'> | $Enums.GAME_RESULT
    moves?: JsonFilter<'Game'>
    createdAt?: DateTimeFilter<'Game'> | Date | string
    player?: XOR<GamePlayerScalarRelationFilter, GamePlayerWhereInput>
  }

  export type GameOrderByWithRelationInput = {
    id?: SortOrder
    playerId?: SortOrder
    result?: SortOrder
    moves?: SortOrder
    createdAt?: SortOrder
    player?: GamePlayerOrderByWithRelationInput
  }

  export type GameWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string
      AND?: GameWhereInput | GameWhereInput[]
      OR?: GameWhereInput[]
      NOT?: GameWhereInput | GameWhereInput[]
      playerId?: StringFilter<'Game'> | string
      result?: EnumGAME_RESULTFilter<'Game'> | $Enums.GAME_RESULT
      moves?: JsonFilter<'Game'>
      createdAt?: DateTimeFilter<'Game'> | Date | string
      player?: XOR<GamePlayerScalarRelationFilter, GamePlayerWhereInput>
    },
    'id'
  >

  export type GameOrderByWithAggregationInput = {
    id?: SortOrder
    playerId?: SortOrder
    result?: SortOrder
    moves?: SortOrder
    createdAt?: SortOrder
    _count?: GameCountOrderByAggregateInput
    _max?: GameMaxOrderByAggregateInput
    _min?: GameMinOrderByAggregateInput
  }

  export type GameScalarWhereWithAggregatesInput = {
    AND?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    OR?: GameScalarWhereWithAggregatesInput[]
    NOT?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<'Game'> | string
    playerId?: StringWithAggregatesFilter<'Game'> | string
    result?: EnumGAME_RESULTWithAggregatesFilter<'Game'> | $Enums.GAME_RESULT
    moves?: JsonWithAggregatesFilter<'Game'>
    createdAt?: DateTimeWithAggregatesFilter<'Game'> | Date | string
  }

  export type GamePlayerCreateInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    provider: string
    providerId: string
    score?: number
    winStreak?: number
    totalGames?: number
    totalWins?: number
    totalLosses?: number
    totalDraws?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    games?: GameCreateNestedManyWithoutPlayerInput
  }

  export type GamePlayerUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    provider: string
    providerId: string
    score?: number
    winStreak?: number
    totalGames?: number
    totalWins?: number
    totalLosses?: number
    totalDraws?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    games?: GameUncheckedCreateNestedManyWithoutPlayerInput
  }

  export type GamePlayerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    winStreak?: IntFieldUpdateOperationsInput | number
    totalGames?: IntFieldUpdateOperationsInput | number
    totalWins?: IntFieldUpdateOperationsInput | number
    totalLosses?: IntFieldUpdateOperationsInput | number
    totalDraws?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    games?: GameUpdateManyWithoutPlayerNestedInput
  }

  export type GamePlayerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    winStreak?: IntFieldUpdateOperationsInput | number
    totalGames?: IntFieldUpdateOperationsInput | number
    totalWins?: IntFieldUpdateOperationsInput | number
    totalLosses?: IntFieldUpdateOperationsInput | number
    totalDraws?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    games?: GameUncheckedUpdateManyWithoutPlayerNestedInput
  }

  export type GamePlayerCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    provider: string
    providerId: string
    score?: number
    winStreak?: number
    totalGames?: number
    totalWins?: number
    totalLosses?: number
    totalDraws?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GamePlayerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    winStreak?: IntFieldUpdateOperationsInput | number
    totalGames?: IntFieldUpdateOperationsInput | number
    totalWins?: IntFieldUpdateOperationsInput | number
    totalLosses?: IntFieldUpdateOperationsInput | number
    totalDraws?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GamePlayerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    winStreak?: IntFieldUpdateOperationsInput | number
    totalGames?: IntFieldUpdateOperationsInput | number
    totalWins?: IntFieldUpdateOperationsInput | number
    totalLosses?: IntFieldUpdateOperationsInput | number
    totalDraws?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameCreateInput = {
    id?: string
    result: $Enums.GAME_RESULT
    moves: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    player: GamePlayerCreateNestedOneWithoutGamesInput
  }

  export type GameUncheckedCreateInput = {
    id?: string
    playerId: string
    result: $Enums.GAME_RESULT
    moves: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type GameUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    result?: EnumGAME_RESULTFieldUpdateOperationsInput | $Enums.GAME_RESULT
    moves?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    player?: GamePlayerUpdateOneRequiredWithoutGamesNestedInput
  }

  export type GameUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    result?: EnumGAME_RESULTFieldUpdateOperationsInput | $Enums.GAME_RESULT
    moves?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameCreateManyInput = {
    id?: string
    playerId: string
    result: $Enums.GAME_RESULT
    moves: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type GameUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    result?: EnumGAME_RESULTFieldUpdateOperationsInput | $Enums.GAME_RESULT
    moves?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    result?: EnumGAME_RESULTFieldUpdateOperationsInput | $Enums.GAME_RESULT
    moves?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type GameListRelationFilter = {
    every?: GameWhereInput
    some?: GameWhereInput
    none?: GameWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GameOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GamePlayerProviderProviderIdCompoundUniqueInput = {
    provider: string
    providerId: string
  }

  export type GamePlayerCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    score?: SortOrder
    winStreak?: SortOrder
    totalGames?: SortOrder
    totalWins?: SortOrder
    totalLosses?: SortOrder
    totalDraws?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GamePlayerAvgOrderByAggregateInput = {
    score?: SortOrder
    winStreak?: SortOrder
    totalGames?: SortOrder
    totalWins?: SortOrder
    totalLosses?: SortOrder
    totalDraws?: SortOrder
  }

  export type GamePlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    score?: SortOrder
    winStreak?: SortOrder
    totalGames?: SortOrder
    totalWins?: SortOrder
    totalLosses?: SortOrder
    totalDraws?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GamePlayerMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    score?: SortOrder
    winStreak?: SortOrder
    totalGames?: SortOrder
    totalWins?: SortOrder
    totalLosses?: SortOrder
    totalDraws?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GamePlayerSumOrderByAggregateInput = {
    score?: SortOrder
    winStreak?: SortOrder
    totalGames?: SortOrder
    totalWins?: SortOrder
    totalLosses?: SortOrder
    totalDraws?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumGAME_RESULTFilter<$PrismaModel = never> = {
    equals?: $Enums.GAME_RESULT | EnumGAME_RESULTFieldRefInput<$PrismaModel>
    in?: $Enums.GAME_RESULT[] | ListEnumGAME_RESULTFieldRefInput<$PrismaModel>
    notIn?: $Enums.GAME_RESULT[] | ListEnumGAME_RESULTFieldRefInput<$PrismaModel>
    not?: NestedEnumGAME_RESULTFilter<$PrismaModel> | $Enums.GAME_RESULT
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type GamePlayerScalarRelationFilter = {
    is?: GamePlayerWhereInput
    isNot?: GamePlayerWhereInput
  }

  export type GameCountOrderByAggregateInput = {
    id?: SortOrder
    playerId?: SortOrder
    result?: SortOrder
    moves?: SortOrder
    createdAt?: SortOrder
  }

  export type GameMaxOrderByAggregateInput = {
    id?: SortOrder
    playerId?: SortOrder
    result?: SortOrder
    createdAt?: SortOrder
  }

  export type GameMinOrderByAggregateInput = {
    id?: SortOrder
    playerId?: SortOrder
    result?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumGAME_RESULTWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GAME_RESULT | EnumGAME_RESULTFieldRefInput<$PrismaModel>
    in?: $Enums.GAME_RESULT[] | ListEnumGAME_RESULTFieldRefInput<$PrismaModel>
    notIn?: $Enums.GAME_RESULT[] | ListEnumGAME_RESULTFieldRefInput<$PrismaModel>
    not?: NestedEnumGAME_RESULTWithAggregatesFilter<$PrismaModel> | $Enums.GAME_RESULT
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGAME_RESULTFilter<$PrismaModel>
    _max?: NestedEnumGAME_RESULTFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type GameCreateNestedManyWithoutPlayerInput = {
    create?:
      | XOR<GameCreateWithoutPlayerInput, GameUncheckedCreateWithoutPlayerInput>
      | GameCreateWithoutPlayerInput[]
      | GameUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?:
      | GameCreateOrConnectWithoutPlayerInput
      | GameCreateOrConnectWithoutPlayerInput[]
    createMany?: GameCreateManyPlayerInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type GameUncheckedCreateNestedManyWithoutPlayerInput = {
    create?:
      | XOR<GameCreateWithoutPlayerInput, GameUncheckedCreateWithoutPlayerInput>
      | GameCreateWithoutPlayerInput[]
      | GameUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?:
      | GameCreateOrConnectWithoutPlayerInput
      | GameCreateOrConnectWithoutPlayerInput[]
    createMany?: GameCreateManyPlayerInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GameUpdateManyWithoutPlayerNestedInput = {
    create?:
      | XOR<GameCreateWithoutPlayerInput, GameUncheckedCreateWithoutPlayerInput>
      | GameCreateWithoutPlayerInput[]
      | GameUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?:
      | GameCreateOrConnectWithoutPlayerInput
      | GameCreateOrConnectWithoutPlayerInput[]
    upsert?:
      | GameUpsertWithWhereUniqueWithoutPlayerInput
      | GameUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: GameCreateManyPlayerInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?:
      | GameUpdateWithWhereUniqueWithoutPlayerInput
      | GameUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?:
      | GameUpdateManyWithWhereWithoutPlayerInput
      | GameUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type GameUncheckedUpdateManyWithoutPlayerNestedInput = {
    create?:
      | XOR<GameCreateWithoutPlayerInput, GameUncheckedCreateWithoutPlayerInput>
      | GameCreateWithoutPlayerInput[]
      | GameUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?:
      | GameCreateOrConnectWithoutPlayerInput
      | GameCreateOrConnectWithoutPlayerInput[]
    upsert?:
      | GameUpsertWithWhereUniqueWithoutPlayerInput
      | GameUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: GameCreateManyPlayerInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?:
      | GameUpdateWithWhereUniqueWithoutPlayerInput
      | GameUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?:
      | GameUpdateManyWithWhereWithoutPlayerInput
      | GameUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type GamePlayerCreateNestedOneWithoutGamesInput = {
    create?: XOR<GamePlayerCreateWithoutGamesInput, GamePlayerUncheckedCreateWithoutGamesInput>
    connectOrCreate?: GamePlayerCreateOrConnectWithoutGamesInput
    connect?: GamePlayerWhereUniqueInput
  }

  export type EnumGAME_RESULTFieldUpdateOperationsInput = {
    set?: $Enums.GAME_RESULT
  }

  export type GamePlayerUpdateOneRequiredWithoutGamesNestedInput = {
    create?: XOR<GamePlayerCreateWithoutGamesInput, GamePlayerUncheckedCreateWithoutGamesInput>
    connectOrCreate?: GamePlayerCreateOrConnectWithoutGamesInput
    upsert?: GamePlayerUpsertWithoutGamesInput
    connect?: GamePlayerWhereUniqueInput
    update?: XOR<
      XOR<GamePlayerUpdateToOneWithWhereWithoutGamesInput, GamePlayerUpdateWithoutGamesInput>,
      GamePlayerUncheckedUpdateWithoutGamesInput
    >
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumGAME_RESULTFilter<$PrismaModel = never> = {
    equals?: $Enums.GAME_RESULT | EnumGAME_RESULTFieldRefInput<$PrismaModel>
    in?: $Enums.GAME_RESULT[] | ListEnumGAME_RESULTFieldRefInput<$PrismaModel>
    notIn?: $Enums.GAME_RESULT[] | ListEnumGAME_RESULTFieldRefInput<$PrismaModel>
    not?: NestedEnumGAME_RESULTFilter<$PrismaModel> | $Enums.GAME_RESULT
  }

  export type NestedEnumGAME_RESULTWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GAME_RESULT | EnumGAME_RESULTFieldRefInput<$PrismaModel>
    in?: $Enums.GAME_RESULT[] | ListEnumGAME_RESULTFieldRefInput<$PrismaModel>
    notIn?: $Enums.GAME_RESULT[] | ListEnumGAME_RESULTFieldRefInput<$PrismaModel>
    not?: NestedEnumGAME_RESULTWithAggregatesFilter<$PrismaModel> | $Enums.GAME_RESULT
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGAME_RESULTFilter<$PrismaModel>
    _max?: NestedEnumGAME_RESULTFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type GameCreateWithoutPlayerInput = {
    id?: string
    result: $Enums.GAME_RESULT
    moves: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type GameUncheckedCreateWithoutPlayerInput = {
    id?: string
    result: $Enums.GAME_RESULT
    moves: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type GameCreateOrConnectWithoutPlayerInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutPlayerInput, GameUncheckedCreateWithoutPlayerInput>
  }

  export type GameCreateManyPlayerInputEnvelope = {
    data: GameCreateManyPlayerInput | GameCreateManyPlayerInput[]
    skipDuplicates?: boolean
  }

  export type GameUpsertWithWhereUniqueWithoutPlayerInput = {
    where: GameWhereUniqueInput
    update: XOR<GameUpdateWithoutPlayerInput, GameUncheckedUpdateWithoutPlayerInput>
    create: XOR<GameCreateWithoutPlayerInput, GameUncheckedCreateWithoutPlayerInput>
  }

  export type GameUpdateWithWhereUniqueWithoutPlayerInput = {
    where: GameWhereUniqueInput
    data: XOR<GameUpdateWithoutPlayerInput, GameUncheckedUpdateWithoutPlayerInput>
  }

  export type GameUpdateManyWithWhereWithoutPlayerInput = {
    where: GameScalarWhereInput
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyWithoutPlayerInput>
  }

  export type GameScalarWhereInput = {
    AND?: GameScalarWhereInput | GameScalarWhereInput[]
    OR?: GameScalarWhereInput[]
    NOT?: GameScalarWhereInput | GameScalarWhereInput[]
    id?: StringFilter<'Game'> | string
    playerId?: StringFilter<'Game'> | string
    result?: EnumGAME_RESULTFilter<'Game'> | $Enums.GAME_RESULT
    moves?: JsonFilter<'Game'>
    createdAt?: DateTimeFilter<'Game'> | Date | string
  }

  export type GamePlayerCreateWithoutGamesInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    provider: string
    providerId: string
    score?: number
    winStreak?: number
    totalGames?: number
    totalWins?: number
    totalLosses?: number
    totalDraws?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GamePlayerUncheckedCreateWithoutGamesInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    provider: string
    providerId: string
    score?: number
    winStreak?: number
    totalGames?: number
    totalWins?: number
    totalLosses?: number
    totalDraws?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GamePlayerCreateOrConnectWithoutGamesInput = {
    where: GamePlayerWhereUniqueInput
    create: XOR<GamePlayerCreateWithoutGamesInput, GamePlayerUncheckedCreateWithoutGamesInput>
  }

  export type GamePlayerUpsertWithoutGamesInput = {
    update: XOR<GamePlayerUpdateWithoutGamesInput, GamePlayerUncheckedUpdateWithoutGamesInput>
    create: XOR<GamePlayerCreateWithoutGamesInput, GamePlayerUncheckedCreateWithoutGamesInput>
    where?: GamePlayerWhereInput
  }

  export type GamePlayerUpdateToOneWithWhereWithoutGamesInput = {
    where?: GamePlayerWhereInput
    data: XOR<GamePlayerUpdateWithoutGamesInput, GamePlayerUncheckedUpdateWithoutGamesInput>
  }

  export type GamePlayerUpdateWithoutGamesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    winStreak?: IntFieldUpdateOperationsInput | number
    totalGames?: IntFieldUpdateOperationsInput | number
    totalWins?: IntFieldUpdateOperationsInput | number
    totalLosses?: IntFieldUpdateOperationsInput | number
    totalDraws?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GamePlayerUncheckedUpdateWithoutGamesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    winStreak?: IntFieldUpdateOperationsInput | number
    totalGames?: IntFieldUpdateOperationsInput | number
    totalWins?: IntFieldUpdateOperationsInput | number
    totalLosses?: IntFieldUpdateOperationsInput | number
    totalDraws?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameCreateManyPlayerInput = {
    id?: string
    result: $Enums.GAME_RESULT
    moves: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type GameUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    result?: EnumGAME_RESULTFieldUpdateOperationsInput | $Enums.GAME_RESULT
    moves?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameUncheckedUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    result?: EnumGAME_RESULTFieldUpdateOperationsInput | $Enums.GAME_RESULT
    moves?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameUncheckedUpdateManyWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    result?: EnumGAME_RESULTFieldUpdateOperationsInput | $Enums.GAME_RESULT
    moves?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
