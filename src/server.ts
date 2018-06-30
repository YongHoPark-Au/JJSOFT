import Hapi, {Server} from 'hapi'
import routes from './routes'
import Inert from 'inert'
import Vision from 'vision'
import lowDB from './plugins/low-db'

export async function start() {

    const server: Server = new Hapi.Server({
        port: 3000,
        host: 'localhost',
    })

    try{
      await server.register({plugin: Inert})        
    }catch(error){
      server.log(['error', 'Inert', 'register'], 'server cannot resister')
      throw error
    }

    try{
      await server.register({plugin: Vision})
      server.views({
        engines:{
          html:require('handlebars')
        },
        path: 'dist',
      });
    }catch(error){
      server.log(['error', 'Vision', 'register'], 'server cannot resister')
      throw error
    }

    
    try{
      await server.register({plugin: lowDB})
    }catch(error){
      server.log(['error', 'low-db', 'register'], 'server cannot resister')
      throw error
    }

    const plugins: any = server.plugins

    server.bind({lowDB: plugins.lowDB.db});
    server.route(routes);

    
    try {
        await server.start()
    } catch (error) {
        server.log(['error', 'hapi', 'start'], 'server cannot run')
        throw error
    }


    return server
}



export async function stop(server: Server, options?: {timeout: number}) {
  await server.stop(options)
}
