let linkRegex = /https:/i
export async function before(m, { conn, isAdmin, isBotAdmin, text }) {
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
let delet = m.key.participant
let bang = m.key.id
let bot = global.db.data.settings[this.user.jid] || {}
const isGroupLink = linkRegex.exec(m.text)
if (chat.antiLink2 && isGroupLink && !isAdmin) {
if (isBotAdmin) {
const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
const linkThisGroup2 = `https://www.youtube.com/`
const linkThisGroup3 = `https://youtu.be/`
if (m.text.includes(linkThisGroup)) return !0
if (m.text.includes(linkThisGroup2)) return !0
if (m.text.includes(linkThisGroup3)) return !0 }    
if (isBotAdmin && bot.restrict) {
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return
} else if (!bot.restrict) return m.reply('*[❗𝐈𝐍𝐅𝐎❗] 𝚃𝙷𝙴 𝙾𝚆𝙽𝙴𝚁 𝙾𝙵 𝚃𝙷𝙴 𝙱𝙾𝚃 𝙳𝙾𝙴𝚂 𝙽𝙾𝚃 𝙷𝙰𝚅𝙴 𝚁𝙴𝚂𝚃𝚁𝙸𝙲𝚃𝙸𝙾𝙽𝚂 𝙴𝙽𝙰𝙱𝙻𝙴𝙳 (#𝚎𝚗𝚊𝚋𝚕𝚎 𝚛𝚎𝚜𝚝𝚛𝚒𝚌𝚝) 𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙷𝙸𝙼 𝚃𝙾 𝙴𝙽𝙰𝙱𝙻𝙴 𝙸𝚃*')}
return !0
}
