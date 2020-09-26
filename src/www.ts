import "reflect-metadata";
import bootloader from "@http/bootloader";
import loadContainer, { clearContainer } from "@infras/comtainers/loadContainer";
import { loadEventListeners } from "@infras/event";
import { Permission } from 'role-acl';

// todo 어디다가?
declare global {
    namespace Express {
        export interface Request {
            auth: {role:string};
            readPermission: Permission;
        }
    }
}

(async () => {

    await bootloader.bootstrap();
    loadContainer();
    loadEventListeners();

    const port = process.env.SERVICE_PORT || 3000;
    const server = bootloader.app.listen(port);

    console.info(`Server is UP on ${port}`);
    console.info(`open : http://0.0.0.0:${port}`);

    process.on('SIGINT', () => {
        console.info('SIGINT signal received.');
        console.log('Closing http server.');
        bootloader.down();
        clearContainer();
        console.log('Disconnect db.');
        server.close(() => {
            process.exit();
        });
    });
})();