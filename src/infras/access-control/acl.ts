const adminList = [
    {
        role: 'admin',
        resource: 'services',
        action: ['create'],
        attributes: ['code','name','desc']
    },
    {
        role: 'admin',
        resource: 'services',
        action: ['read'],
        attributes: ['id','code','name','desc']
    }
    // { 
    //     role: 'admin',
    //     resource: '*' ,
    //     action: ['create','read','reads'],
    //     attributes: ['*'],
    // },
    // { 
    //     role: 'admin',
    //     resource: '*',
    //     action: ['update','patch'],
    //     attributes: ['*','!id'],
    // }
];

const onwer_condition = { 
    Fn: "EQUALS",
    args: { 
        "requestor_id": "$.owner_id" 
    }
};

// const p = ['update','patch'];

const requestor = [
    // 근거
    {  role: 'requestor', resource: 'evidence',  action: 'create', attributes: ['*'] },
    {  role: 'requestor', resource: 'evidence',  action: 'delete', attributes: ['*'], condition: onwer_condition },
    
    // 신분 정보
    {  role: 'requestor', resource: 'certification',  action: 'create', attributes: ['*'] },
    {  role: 'requestor', resource: 'certification',  action: 'read', attributes: ['id','code','state','type','evidences',],condition: onwer_condition},
    {  role: 'requestor', resource: 'certification',  action: ['patch'], attributes: ['type','code'],condition: onwer_condition},

    // 요청자
    {  role: 'requestor', resource: 'requestor', action: ['read'], attributes: ['id','name'],condition: onwer_condition},
    // {  role: 'requestor', resource: 'requestor', action: 'rup',      attributes: ['name'], condition: onwer_condition }
]

export default [
    ... adminList,
    ... requestor
];