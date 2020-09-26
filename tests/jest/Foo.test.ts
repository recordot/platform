import { Authenticate } from '@app/domains/User/Authenticate';
import User from '@app/domains/User/entities/User';
import UserORM from '@impl/orms/UserORM';
import { manager } from '@infras/database/connection';
import bootloader from '../../src/http/bootloader';
import loadContainer, { clearContainer } from '@infras/comtainers/loadContainer'

beforeEach(async () => {
    await bootloader.bootstrap();
    loadContainer();
});

afterEach(async () => {
    await bootloader.down();
    clearContainer();
});


test('foo1', async ()=>{

    const id = 'A';
    const password =  Math.random().toString(36).substring(7);
    
    const dto = new User;
    dto.id = id;
    dto.password = password;
    dto.username = 'ABC';

    await manager().save(UserORM,dto);

    const auth = new Authenticate
    // console.log("1");
    const user = await auth.authenticate({id,password});
    // console.log("2");
    
    
    // expect(user.comparePassword(password)).toBe(true);
    // expect(user.comparePassword(`${password}1`)).toBe(false);
});