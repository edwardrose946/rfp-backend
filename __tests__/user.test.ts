import {graphQLClient} from "../test-client/client";
import {ALL_USERS} from "../graphQL/queries/queries";

test('example', () => {
    expect(2).toBe(2);
});

test('there is one user', async () => {


    const {data: {allUsers}} = await graphQLClient.query({
        query: ALL_USERS
    });
    expect(allUsers).toHaveLength(1);
});
