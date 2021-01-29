import { loadEventListeners } from '@infras/event';
import newman from 'newman';

import "reflect-metadata";

import bootloader from "@http/bootloader";
import loadContainer, { clearContainer } from "@infras/comtainers/loadContainer";

(async () => {

    await bootloader.bootstrap();
    loadContainer();
    loadEventListeners();
    
    const port = process.env.SERVICE_PORT || 3000;
    const server = bootloader.app.listen(port, () => {
      newman.run({
        collection: require(__dirname+'/collections.json'),
        environment: require(__dirname+'/env.json'),
        reporters: 'cli',
        iterationCount: 4,
      },async (err,summary) => {
        
        clearContainer();
        await bootloader.down();

        server.close(() => {
          if(err || summary.run.failures.length > 0){
            process.exit(1);
          } else {
            process.exit(0);  
          } 
        });
        
      });
    });

})();