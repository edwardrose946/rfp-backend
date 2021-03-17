// Generic asyncFilter
export const asyncFilter = async (arr: Array<any>, predicate: any): Promise<Array<any>> => {
    const results = await Promise.all(
        arr.map(
            predicate
        )
    );
    return arr.filter((_v: any, index: any) => results[index]);
};