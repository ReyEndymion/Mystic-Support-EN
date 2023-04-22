let handler = async (m, { conn, participants, groupMetadata }) => {
const { antiArab, antiToxic, antiTraba, antiviewonce, isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, antiLink2, modohorny, autosticker, modoadmin, audios, delete: del } = global.db.data.chats[m.chat]
let text = `*「 𝐆𝐑𝐎𝐔𝐏 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 」*

*𝙰𝚄𝚃𝙾𝙼𝙰𝚃𝙸𝙲 𝙾𝙿𝚃𝙸𝙾𝙽𝚂:*
—◉ 𝚆𝙴𝙻𝙲𝙾𝙼𝙴: ${welcome ? '✅' : '❌'}
—◉ 𝙳𝙴𝚃𝙴𝙲𝚃: ${detect ? '✅' : '❌'} 
—◉ 𝙰𝙽𝚃𝙸𝙻𝙸𝙽𝙺: ${antiLink ? '✅' : '❌'} 
—◉ 𝙰𝙽𝚃𝙸𝙻𝙸𝙽𝙺 𝟸: ${antiLink2 ? '✅' : '❌'} 
—◉ 𝙰𝙽𝚃𝙸𝚃𝚁𝙰𝙱𝙰: ${antiTraba ? '✅' : '❌'} 
—◉ 𝙼𝙾𝙳𝙾𝙰𝙳𝙼𝙸𝙽: ${modoadmin ? '✅' : '❌'} 
—◉ 𝙰𝙽𝚃𝙸𝙰𝚁𝙰𝙱𝚂: ${antiArab ? '✅' : '❌'} 
`.trim()
m.reply(text)}
handler.help = ['infogrup']
handler.tags = ['group']
handler.command = /^(infogrupo|gro?upinfo|info(gro?up|gc))$/i
handler.group = true
export default handler
