let {OpenSql, qCheck, COP} = require('opensql');

let mysqlConnection = new OpenSql('mysql://localhost:3306/foo?user=treegex&password=123');

async function main() {

    // SELECT

    let getAllUsersWithInformation = await mysqlConnection.find({
        from: 'users'
    });

    console.log('Find All Rows From users Table');
    console.log(getAllUsersWithInformation);

    let getAllUsersWhereIdLessThan50 = await mysqlConnection.find({
        from: 'users',
        where: {
            id: qCheck(50, COP.LESS)
        }
    });

    console.log('Find All Rows From users Table Where id less than 50');
    console.log(getAllUsersWhereIdLessThan50);

    // INSERT

    let addOne = await mysqlConnection.addOne({
        from: 'users',
        data: {
            id: 1001,
            first_name: 'Treegex',
            last_name: 'Treegex',
            email: 'treegex@gmail.com',
            ip_address: '127.0.0.1'
        }
    });

    console.log('Add One Row');
    console.log(addOne);


    let addMany = await mysqlConnection.addMany({
        from: 'users',
        get: ['id', 'first_name'],
        data: [
            1002 , 'simple test 1',
            1003 , 'simple test 2',
            1004 , 'simple test 3'
        ]
    });

    console.log('Add Many Rows');
    console.log(addMany);


    // Update

    let update = await mysqlConnection.update({
        from: 'users',
        data: {
            first_name: 'simple test 4'
        },
        where: {
            id: 1004
        }
    });

    console.log('Update Row');
    console.log(update);

    // Remove

    let remove = await mysqlConnection.remove({
        from: 'users',
        where: {
            id: 1004
        }
    });

    console.log('Remove Row');
    console.log(remove);


}

main();