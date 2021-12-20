import app from '../src/app'

describe('Basic test to see if app does what it should do', () => {
  it('should run', () => {
    app.listen(app.get('port'), () => {
      expect(app.get('port')).toBe(3000)
    })
  })
})
