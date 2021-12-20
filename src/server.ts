require('dotenv').config()
import app, { attemptDBConnect } from './app'

const PORT = process.env['PORT'] || 8000

/**
 * Start Express server.
 */
const server = app.listen(PORT, () => {
  attemptDBConnect()
  console.log(
    '⚡️[server]: Server is running at https://localhost:%d in %s mode',
    PORT,
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})

if (process.env.USE_SOCKETS) {
  const io = require('socket.io')(server)
  app.set('socketio', io)
}

export default server
