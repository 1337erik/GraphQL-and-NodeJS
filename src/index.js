const { GraphQLServer } = require( 'graphql-yoga' );

let links = [

    {
        id          : 'link-0',
        url         : 'www.howtographql.com',
        description : 'Fullstack tutorial for GraphQL'
    }
];
let idCount = links.length;

const resolvers = {

    Query: {

        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links
    },
    Mutation: {

        post: ( parent, args ) => {

            const link = {

                id          : `link-${idCount++}`,
                description : args.description,
                url         : args.url
            };

            links.push( link );
            return link;
        },
        updateLink: ( parent, args ) => {

            let link = links.find( el => el.id == args.id );
            if( args.url ) link.url = args.url;
            if( args.description ) link.description = args.description;
            return link;
        },
        deleteLink: ( parent, args ) => {

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
    resolvers
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