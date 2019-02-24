const { Module } = require('../')

// Developer
module.exports = class DeveloperModule extends Module {
  constructor (client) {
    super(client)
    this.name = 'developer'
  }

  canLoad () {
    return !!this.client.database
  }

  get _users () {
    return this.client.database.users
  }

  async retrieveBlacklist (_user, reason, blacklister) {
    const user = await this._users.findOne(_user, 'blacklist')
    return user ? user.blacklist : null
  }

  async blacklist (_user, reason, blacklister) {
    await this._users.update(_user, { blacklist: { reason, blacklister } })
  }

  async unblacklist (_user) {
    await this._users.update(_user, { blacklist: null })
  }
}
