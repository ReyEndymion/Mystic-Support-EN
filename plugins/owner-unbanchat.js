let handler = async (m) => {
global.db.data.chats[m.chat].isBanned = false
m.reply('*[❗𝐈𝐍𝐅𝐎❗] 𝚃𝙷𝙸𝚂 𝙲𝙷𝙰𝚃 𝙷𝙰𝚂 𝙱𝙴𝙴𝙽 𝚃𝙰𝙺𝙴𝙽 𝙰𝚆𝙰𝚈 𝙵𝚁𝙾𝙼 𝚀𝚄𝙸𝙴𝚃*')
}
handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = /^unbanchat$/i
handler.rowner = true
export default handler
