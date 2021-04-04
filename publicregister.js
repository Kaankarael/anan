const Discord = require("discord.js");
require("events").EventEmitter.defaultMaxListeners = 30000;
  require("events").defaultMaxListeners = 30000;
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const kanal = ayarlar.kanal;
const fs = require("fs");
require("./util/eventLoader")(client);
const express = require("express");
const app = express();
const http = require("http");
var Jimp = require('jimp');
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = message => {
  console.log(` => { ${message} } `);
  
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`AKTİF: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

////////////////////////

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  return permlvl;
};






client.on("ready", () => {
  client.user.setPresence({
    game: { name: `FearlesSs register`, type: "WATCHING" },
    status: "online"
  });
});



// İSİM YAŞ İSİM DEĞİŞTİRME 

client.on("guildMemberAdd", member => {
  let tag = ayarlar.tag;
  member.setNickname(`${tag} İsim • Yaş`);
});

// İSİM YAŞ İSİM DEĞİŞTİRME SON






//BOT ROLÜ

client.on(`guildMemberAdd`, async member => {
  let botrol = ayarlar.botROL;
if(!member.bot) return;
member.roles.add(botrol)
})

// BOT ROLÜ SON




// kayıtsız rolü

client.on(`guildMemberAdd`, async member => {
  let kayıtsızROL = ayarlar.kayıtsızROL;
if(member.bot) return;
member.roles.add(kayıtsızROL)
})

/// kayıtsız rolü son




// BOT OTOROL

client.on('guildMemberAdd', async member => {
if(member.user.bot) {
  const botROL = ayarlar.botROL
member.roles.add(botROL)
}
})
// GİRİŞ 
  client.on("guildMemberAdd", member => { 
    const moment = require('moment');
  const kanal = ayarlar.giriskanal;
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
    const tarih = new Date().getTime() - user.createdAt.getTime();  
  const embed = new Discord.MessageEmbed()
  let rol = ayarlar.kayıtsızROL
 member.roles.add(rol)

  var kontrol;
if (tarih < 1296000000) kontrol = '<a:uyar:767387118283522119> Bu Kullanıcı **Şüpheli** <a:carpi:798940952902762516>'
if (tarih > 1296000000) kontrol = '<a:tik3:769157187632234527> Bu Kullanıcı **Güvenli** <a:onay:798940883830439996>'
  moment.locale("tr");
  let kanal1 = client.channels.cache.find(x => x.id === kanal);
    let giris = new Discord.MessageEmbed()
    .setDescription(`
 » • <a:zipzip:795912962828926976> Hoşgeldin ${member}
 
 » • <a:hyque:798463386580287510> Seninle birlikte **${member.guild.memberCount}** kişiyiz.
 
 » • <a:okk:769973091308535878>  **${ayarlar.tag}** Tagımızı alarak ekibimize katılabilirsin.
 
 » • <a:tac:784443318426665061> <@&${ayarlar.yetkiliROL}> rolündekiler seninle ilgilenecektir.
 
 » •   ${kontrol} 
 
 » • <a:saat:781178780587786281> Hesabın Oluşturulma Tarihi: \n • \` ${moment(member.user.createdAt).format("YYYY DD MMMM dddd (hh:mm:ss)")} \`
 
 » •  Ses teyit odasında kaydınızı yaptırabilirsiniz. 

`)
    .setImage('https://i.pinimg.com/originals/8c/9a/07/8c9a079986a4ce112882fea6db3ffdee.gif')
    .setTimestamp()
    
      client.channels.cache.find(x => x.id === kanal).send(`<@&${ayarlar.yetkiliROL}>`)
client.channels.cache.find(x => x.id === kanal).send(giris)
    
  });
// GİRİŞ SON

client.login(ayarlar.token);

//BotSeslide

client.on("ready", async function() {
const voiceChannel = "759661343535136818"
client.channels.cache.get(voiceChannel).join()
.catch(err => {
throw err;
})
})
  



client.on("guildMemberAdd", member => {
  const embed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setTitle('Hoşgeldin')
  .setDescription('Merhaba, Sunucumuza geldiğin için sevindik lütfen sunucu da kayıt ol kanalına ad yaş verirmisin verirsen Sohbet ortamına katılar bilirsin.')
  member.send(embed)
  })


  //------------------------ŞÜPHELİ-HESAP-----------------------\\

client.on("guildMemberAdd", member => {
  var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
   var {Permissions} = require('discord.js');
   var x = moment(member.user.createdAt).add(7, 'days').fromNow()
   var user = member.user
   x = x.replace("birkaç saniye önce", " ")
   if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
  const kytsz = member.guild.roles.cache.find(r => r.id === "794211912007024700") 
   var rol = member.guild.roles.cache.get("762690330503413760") // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
   var kayıtsız = member.guild.roles.cache.get(kytsz) // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
   member.roles.add(rol)
   member.roles.remove(kytsz)

member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
setTimeout(() => {

}, 1000)


   }
        else {

        }
    });

//------------------------ŞÜPHELİ-HESAP-----------------------\\


//-----------------------TAG-ROL----------------------\\    

client.on("userUpdate", async (stg, yeni) => {
var sunucu = client.guilds.cache.get('759509721396543518'); // Buraya Sunucu ID
var uye = sunucu.members.cache.get(yeni.id);
var ekipTag = "✵"; // Buraya Ekip Tag
var ekipRolü = "769269442974449734"; // Buraya Ekip Rolünün ID
var logKanali = "761884330972020777"; // Loglanacağı Kanalın ID

if (!sunucu.members.cache.has(yeni.id) || yeni.bot || stg.username === yeni.username) return;

if ((yeni.username).includes(ekipTag) && !uye.roles.cache.has(ekipRolü)) {
  try {
    await uye.roles.add(ekipRolü);
    await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
    await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`));
  } catch (err) { console.error(err) };
};

if (!(yeni.username).includes(ekipTag) && uye.roles.cache.has(ekipRolü)) {
  try {
    await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(ekipRolü).position));
    await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${ekipTag}**`);
    await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('RED').setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
  } catch(err) { console.error(err) };
};
});

//----------------------TAG-KONTROL----------------------\\      

client.on("guildMemberAdd", member => {
let sunucuid = "759509721396543518"; //Buraya sunucunuzun IDsini yazın
let tag = "✵"; //Buraya tagınızı yazın
let rol = "769269442974449734"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
let channel = client.guilds.cache.get(sunucuid).channels.cache.find(x => x.name == 'auto-tag-role'); //tagrol-log yerine kendi log kanalınızın ismini yazabilirsiniz
if(member.user.username.includes(tag)){
member.roles.add(rol)
const tagalma = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`)
    .setTimestamp()
   client.channels.cache.get('761884330972020777').send(tagalma)
}
})

//-----------------------TAG-KONTROL----------------------\\    
