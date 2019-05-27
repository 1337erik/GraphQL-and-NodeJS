const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );
const { APP_SECRET, getUserId } = require( '../utils' );

async function signup( parent, args, context, info ) {

    const password = await bcrypt.hash( args.password, 10 );

    const user = await context.prisma.createUser({ ...args, password });

    const token = jwt.sign({ userId: user.id }, APP_SECRET );

    return {

        token,
        user
    }
}

async function login( parent, args, context, info ) {

    const user = await context.prisma.user({ email: args.email });
    if( !user ) {

        throw new Error( 'No such user found' );
    }

    const valid = await bcrypt.compare( args.password, user.password );
    if( !valid ) {

        throw new Error( 'Invalid password' );
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET );

    return {

        token,
        user
    }
}

async function post( root, args, context ) {

    const userId = getUserId( context );

    return context.prisma.createLink({

        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } }
    });
}

async function updateLink( parent, args ) { // this is broken now

    let link = links.find( el => el.id == args.id );
    if( args.url ) link.url = args.url;
    if( args.description ) link.description = args.description;
    return link;
}

async function deleteLink( parent, args ) { // this is broken now

    let link = links.find( ( el, i ) => {

        if ( el.id == args.id ){

            links.splice( i, 1 );
            return el;
        }
    });
    return link;
}

module.exports = {

    signup,
    login,
    post
}