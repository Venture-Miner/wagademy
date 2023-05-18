import {
  ApolloClient,
  InMemoryCache,
  gql,
  HttpLink,
} from '@apollo/client/core';
import { Injectable } from '@nestjs/common';
import fetch from 'cross-fetch';

@Injectable()
export class GraphQLService {
  async verify(accessToken: string): Promise<string> {
    const client = new ApolloClient({
      link: new HttpLink({ uri: 'https://api-mumbai.lens.dev', fetch }),
      cache: new InMemoryCache(),
    });

    const query = gql`
      query verify($request: VerifyRequest!) {
        verify(request: $request)
      }
    `;

    const { data } = await client.query({
      query,
      variables: {
        request: {
          accessToken,
        },
      },
    });

    return data.verify;
  }
}
