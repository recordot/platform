const acl = [
    {
        role: 'foo',
        resource: 'bar',
        action: ['create'],
        attributes: ['code', 'name', 'desc'],
    },
];

export default [...acl];