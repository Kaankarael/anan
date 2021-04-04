//READY CODE
const Moment = require('moment')
const discord = require('discord.js')
var prefix = '.'
module.exports = client => {
  
  const aktiviteListesi = [
    `FearlesSs Register`
    
  ]

  client.user.setStatus('idle')
  
  setInterval(() => {
    const Aktivite = Math.floor(Math.random() * (aktiviteListesi.length - 1))
    client.user.setActivity(aktiviteListesi[Aktivite])
  }, 5000)
}


