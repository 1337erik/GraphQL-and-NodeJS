const { GraphQLServer } = require( 'graphql-yoga' );
const { prisma } = require( './generated/prisma-client' );
const Query = require( './resolvers/Query' );
const Mutation = require( './resolvers/Mutation' );
const User = require( './resolvers/User' );
const Link = require( './resolvers/Link' );

const resolvers = {

    Query,
    Mutation,
    User,
    Link
};

const server = new GraphQLServer({

    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {

        return {

            ...request,
            prisma
        }
    }
});

/**
 * default port is 4000, thats why the tutorial hard coded it.
 * To change, see example below taken from https://github.com/prisma/graphql-yoga

    const options = {

        port: 8000,
        endpoint: '/graphql',
        subscriptions: '/subscriptions',
        playground: '/playground',
    }

    server.start( options, ( { port } ) =>

        console.log( `Server started, listening on port ${port} for incoming requests.` ),
    )
 **/
server.start( () => console.log( 'Server is up and running on http://localhost:4000' ) );