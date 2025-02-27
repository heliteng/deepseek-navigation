const { XataClient } = require('@xata.io/client');

exports.handler = async (event, context) => {
    const xata = new XataClient();

    try {
        const posts = await xata.db.posts
            .select(['id', 'title', 'createdAt'])
            .getAll();

        return {
            statusCode: 200,
            body: JSON.stringify(posts),
        };
    } catch (error) {
        return { statusCode: 500, body: error.message };
    }
};