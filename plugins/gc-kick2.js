let handler = async (m, { conn, participants, usedPrefix, command }) => {
if (!global.db.data.settings[conn.user.jid].restrict) throw '*[ ⚠️ ] 𝚃𝙷𝙴 𝙾𝚆𝙽𝙴𝚁 𝙷𝙰𝚂 𝚁𝙴𝚂𝚃𝚁𝙸𝙲𝚃𝙴𝙳 (𝚎𝚗𝚊𝚋𝚕𝚎 𝚛𝚎𝚜𝚝𝚛𝚒𝚌𝚝 / 𝚍𝚒𝚜𝚊𝚋𝚕𝚎 𝚛𝚎𝚜𝚝𝚛𝚒𝚌𝚝) 𝚃𝙷𝙴 𝚄𝚂𝙴 𝙾𝙵 𝚃𝙷𝙸𝚂 𝙲𝙾𝙼𝙼𝙰𝙽𝙳*'
let kicktext = `*[❗] 𝚃𝙰𝙶 𝙰 𝙿𝙴𝚁𝚂𝙾𝙽 𝙾𝚁 𝚁𝙴𝙿𝙻𝚈 𝚃𝙾 𝙰 𝙶𝚁𝙾𝚄𝙿 𝙼𝙴𝚂𝚂𝙰𝙶𝙴 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝚄𝚂𝙴𝚁*\n\n*—◉ 𝙴𝚇𝙰𝙼𝙿𝙻𝙴:*\n*${usedPrefix + command} @${global.suittag}*`
if (!m.mentionedJid[0] && !m.quoted) return m.reply(kicktext, m.chat, { mentions: conn.parseMention(kicktext)}) 
let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
let owr = m.chat.split`-`[0]
await conn.groupParticipantsUpdate(m.chat, [user], 'remove')}
handler.command = /^(kick2|echar2|hechar2|sacar2)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler
