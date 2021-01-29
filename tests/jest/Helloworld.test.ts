import request from 'supertest';
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


test('get hello-world APIs', async () => {
    const app = request(bootloader.app);
    
    let res = await app.get(`/hello-world`);
    expect(res.status).toEqual(200);

    res = await app.get(`/hello-world/tests/anonymous`);
    expect(res.status).toEqual(200);

    res = await app.get(`/hello-world/tests/anonymous-throw-error-no-mssg`);
    expect(res.status).toEqual(500);

    res = await app.get(`/hello-world/tests/anonymous-throw-error`);
    expect(res.status).toEqual(500);

    res = await app.get(`/hello-world/tests/anonymous-throw-common-error`);
    expect(res.status).toEqual(400);

    res = await app.get(`/hello-world/tests/return-nothing`);
    expect(res.status).toEqual(500);
    expect(res.body.code).toEqual(400001);
    expect(res.body.message).toEqual("Empty result.");
    
});