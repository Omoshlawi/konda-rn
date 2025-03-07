// function getPaths<T extends object>(obj: T, prefix = ""): string[] {
//     return Object.keys(obj).flatMap((key) => {
//       const path = prefix ? `${prefix}.${key}` : key;
//       return obj[key] && typeof obj[key] === "object"
//         ? [path, ...getPaths(obj[key], path)]
//         : [path];
//     });
//   }

// TODO Move to core utils
// Type utilities for deep path access
export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

// Check if it is a tuple array
type IsTuple<T extends ReadonlyArray<any>> = number extends T["length"]
  ? false
  : true;
// Tuple and normal array key
type TupleKey<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;
type ArrayKey = number;

type PathImpl<K extends string | number, V> = V extends Primitive
  ? `${K}`
  : `${K}` | `${K}.${Path<V>}`;

// const ```; Fixes Syntax highlighting, above syntax breaks it (atom and github)

export type Path<T> = T extends ReadonlyArray<infer V>
  ? IsTuple<T> extends true
    ? {
        [K in TupleKey<T>]-?: PathImpl<K & string, T[K]>;
      }[TupleKey<T>]
    : PathImpl<ArrayKey, V>
  : {
      [K in keyof T]-?: PathImpl<K & string, T[K]>;
    }[keyof T];

export type FieldPath<TFieldValues extends Record<string, any>> =
  Path<TFieldValues>;

//   Sample usage
// 1.
type User = {
  name: string;
  id: number;
  email: string;
  address: {
    city: string;
    zip: number;
  };
};

type UserPaths = Path<User>;
// 2.
type TupleExample = [string, number, { nested: boolean }];

type TuplePaths = Path<TupleExample>;

// 3.
type ArrayExample = { users: { name: string }[] };

type ArrayPaths = Path<ArrayExample>;
