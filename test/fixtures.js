


var fixtures = module.exports = {

    database_fields: [
        'foo',
        'bar',
        'baz'
    ],

    database_data: {
        foo: 'My name is foo.',
        bar: true,
        baz: [1, 2, 3],
        bah: 'I should never be seen.'
    },

    user_data: {
        name: 'Will',
        email: 'will@kvp.io',
        password: 'mypass',
        description: 'An account',
        bad: 'this should never been seen'
    },

    task_data: {
        name: 'Write unit tests',
        status: 'open',
        priority: 10,
        visibility: 'public',
        description: 'write unit tests for kvp.io falcon api endpoints',
        bad: 'this should never been seen'
    }

};
