import {Request, ServerRoute} from 'hapi'

const routers: ServerRoute[]  = [
  {
    method: 'GET',
    path: '/',
    handler: function(request: Request, reply ) {
      return reply.view('index'); 
    }
  },
  {
    method: 'GET', 
    path: '/static/css/{file*}',
    handler: {
      directory: {
         path: "dist/static/css",
      }
    }
  },
  {
    method: 'GET', 
    path: '/static/js/{file*}',
    handler: {
      directory: {
         path: "dist/static/js",
      }
    }
  },
  {
    method: 'GET',
    path: '/docs',
    handler: function(request: Request) {
      // eslint-disable-next-line no-magic-numbers
      const {offset = 0, take = 20} = request.params as any
      const docs = this.lowDB.get('docs').value()
      return {
        data: [...docs].splice(offset, take)
      }
    }
  },
  {
    method: 'POST',
    path: '/docs',
    handler: async function(request: Request) {
      // eslint-disable-next-line no-magic-numbers
      const {id, title, description, ok = false} = request.payload as any
      console.log(request.payload)
      if(!title || !description){
        return {status: 'error'}
      }
      await this.lowDB.get('docs').push({id, title, description, ok}).write()
      return {
        status: 'ok'
      }
    }
  },
  {
    method: 'put',
    path: '/docs',
    handler: async function(request: Request) {
      // eslint-disable-next-line no-magic-numbers
      const {index, title, description, ok} = request.payload as any
      console.log(request.payload)
      let status = 'error'
      if(!index || !title || !description){
        return {status}
      }
      await this.lowDB.update('docs', (docs: any[]) => {
        if(!docs[index]){
          return docs
        }
        docs[index] = {
          title, description, ok: ok ? ok : docs[index].ok,
        }
        status = 'ok'
        return docs
      }).write()
      return {
        status
      }
    }
  },
  {
    method: 'patch',
    path: '/docs',
    handler: async function(request: Request) {
      // eslint-disable-next-line no-magic-numbers
      const {index, ok} = request.payload as any
      let status = 'error'
      if(!index || !ok){
        return {status}
      }
      const _ok = ok === 'false' ? false : Boolean(ok)
      await this.lowDB.update('docs', (docs: any[]) => {
        if(!docs[index]){
          return docs
        }
        docs[index].ok = _ok
        status = 'ok'
        return docs
      }).write()
      return {
        status
      }
    }
  },
  {
    method: 'delete',
    path: '/docs',
    handler: async function(request: Request) {
      // eslint-disable-next-line no-magic-numbers
      const {index} = request.payload as any
      console.log(request.payload)
      let status = 'error'
      if(!index){
        return {status}
      }

      await this.lowDB.update('docs', (docs: any[]) => {
        if(!docs[index]){
          return docs
        }
        docs.splice(index, 1)
        status = 'ok'
        return docs
      }).write()
      return {
        status
      }
    }
  },
]


export default routers