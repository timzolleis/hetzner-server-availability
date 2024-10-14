import {PrismaClient} from '@prisma/client';

export const singleton = <Value>(
    name: string,
    valueFactory: () => Value
): Value => {
    const g = global as unknown as {__singletons?: Record<string, Value>};
    g.__singletons ??= {};
    g.__singletons[name] ??= valueFactory();
    return g.__singletons[name];
};
const prisma = singleton('prisma', () => new PrismaClient());

prisma.$connect();
export {prisma};
export * from '@prisma/client';