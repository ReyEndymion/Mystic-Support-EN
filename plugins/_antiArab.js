let handler = m => m
handler.before = async function (m, {conn, isAdmin, isBotAdmin, isOwner, isROwner} ) {
	
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]

if (isBotAdmin && chat.antiArab && !isAdmin && !isOwner && !isROwner) {
		
if (m.sender.startsWith('212' || '212') || m.sender.startsWith('265' || '265')) {
global.db.data.users[m.sender].banned = true
m.reply(`✳️ Anti Arabs is active to avoid spam\n\nUntil next time`)
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return   
}
   
}}
export default handler
//Plugin adjusted by https://github.com/ReyEndymion