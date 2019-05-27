const { GraphQLServer } = require( 'graphql-yoga' );
const { prisma } = require( './generated/prisma-client' );

const resolvers = {

    Query: {

        info: () => `This is the API of a Hackernews Clone`,
        feed: ( root, args, context, info ) => context.prisma.links()
    },
    Mutation: {

        post: ( root, args, context ) => {

            return context.prisma.createLink({

                url: args.url,
                description: args.description
            })
        },
        updateLink: ( parent, args ) => { // this is broken now

            let link = links.find( el => el.id == args.id );
            if( args.url ) link.url = args.url;
            if( args.description ) link.description = args.description;
            return link;
        },
        deleteLink: ( parent, args ) => { // this is broken now

            let link = links.find( ( el, i ) => {

                if ( el.id == args.id ){

                    links.splice( i, 1 );
                    return el;
                }
            });
            return link;
        }
    },
    // The Link resolver below is not necessary because the structure is not modified in any way from the data provided.
    // i.e => the data provided matches the schema structure perfectly so there is no need for a resolver
    // Link: {

    //     id          : ( parent ) => parent.id,
    //     description : ( parent ) => parent.description,
    //     url         : ( parent ) => parent.url
    // }
};

const server = new GraphQLServer({

    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma }
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