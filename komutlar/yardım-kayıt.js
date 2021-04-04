const Discord = require('discord.js')

exports.run = async(client, message, args) => {

let codare = "https://discord.gg/4qWsjrs"

if(!args[0]) {
    const embed = new Discord.MessageEmbed()
    .setAuthor('Yardım', client.user.avatarURL())
    .setDescription('**Kayıt yardım commands**')
    .addField('Komutlar:', 
    `[.e](${codare})
    [.erkekrol ver](${codare})
    [.k ](${codare})
    [.kadınrol ver](${codare})
    [.isimler](${codare})
    [.kayıtsız](${codare})
    [.kayıt-sıfırla](${codare})
    [.top-teyit](${codare})`)
    .addField('» Fearless', 
    `Fearless server`)
    .setImage('')
    .setThumbnail(client.user.avatarURL())
    .setColor("BLUE")
    .setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.avatarURL())
    message.channel.send(embed)
}
if(args[0] === 'genel' | args[0] === 'eğlence' | args[0] === 'kullanıcı' | args[0] === 'moderasyon' | args[0] === 'moderasyon2' | args[0] === 'yapılandırma' | args[0] === 'sunucu' | args[0] === 'resim' | args[0] === 'nsfw') {
const embed = new Discord.MessageEmbed()
.setAuthor(args[0], client.user.avatarURL())
.setDescription(client.commands.filter(c=>c.conf.kategori === args[0]).map(kmt=>kmt.help.name).join('\:white_small_square: - g!\n ') + '» Linkler\n[Davet Et](https://discord.com) | [Destek Sunucusu](' + codare + ') | [Oy Ver](https://discord.com) | [Web Sitesi](https://discord.com)')
.setThumbnail(client.user.avatarURL())
.setColor("BLUE")
.setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.avatarURL())
message.channel.send(embed)
} else {
}
}

exports.conf = {
    aliases: []
}
exports.help = {
    name: "yardım-kayıt"
}