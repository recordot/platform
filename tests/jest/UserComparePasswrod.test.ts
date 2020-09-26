import User from '@app/domains/User/entities/User';

test('password compare', ()=>{

    const password =  Math.random().toString(36).substring(7);
    const user = new User;
    user.password = password;

    expect(user.comparePassword(password)).toBe(true);
    expect(user.comparePassword(`${password}1`)).toBe(false);
});