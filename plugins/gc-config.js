let handler = async (m, { conn, args, usedPrefix, command }) => {
let isClose = { // Switch Case Like :v
'open': 'not_announcement',
'close': 'announcement',
'abierto': 'not_announcement',
'cerrado': 'announcement',
'abrir': 'not_announcement',
'cerrar': 'announcement',
}[(args[0] || '')]
if (isClose === undefined)
throw `
*[❗] 𝚆𝚁𝙾𝙽𝙶 𝙵𝙾𝚁𝙼𝙰𝚃!!*

*┏━━━❲ ✨𝙴𝚇𝙰𝙼𝙿𝙻𝙴✨ ❳━━━┓* 
*┠┉↯ ${usedPrefix + command} open*
*┠┉↯ ${usedPrefix + command} close*
`.trim()
await conn.groupSettingUpdate(m.chat, isClose)
{m.reply('*[ ✔ ] 𝙶𝚁𝙾𝚄𝙿 𝙲𝙾𝙽𝙵𝙸𝙶𝚄𝚁𝙴𝙳 𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙻𝚈*')}
}
handler.help = ['group open / close', 'grupo abrir / cerrar']
handler.tags = ['group']
handler.command = /^(group|grupo)$/i
handler.admin = true
handler.botAdmin = true
export default handler
