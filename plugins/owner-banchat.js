let handler = async (m) => {
global.db.data.chats[m.chat].isBanned = true
m.reply('*[❗𝐈𝐍𝐅𝐎❗] 𝚃𝙷𝙸𝚂 𝙲𝙷𝙰𝚃 𝚆𝙰𝚂 𝚂𝙸𝙻𝙴𝙽𝙲𝙴𝙳 𝚆𝙸𝚃𝙷 𝚂𝚄𝙲𝙲𝙴𝚂𝚂*\n\n*—◉ 𝚃𝙷𝙴 𝙱𝙾𝚃 𝙳𝙸𝙳 𝙽𝙾𝚃 𝚁𝙴𝙰𝙲𝚃 𝚃𝙾 𝙰𝙽𝚈 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝚄𝙽𝚃𝙸𝙻 𝚆𝙴 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝚂𝙸𝙻𝙴𝙽𝙲𝙴 𝙸𝙽 𝚃𝙷𝙸𝚂 𝙲𝙷𝙰𝚃*')
}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^banchat$/i
handler.rowner = true
export default handler
