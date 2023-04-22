let handler = async (m, { conn, usedPrefix }) => {
let name = '👑 Mystic - Owner 👑'    
let numero = [['5219992095479'], ['52117489568']]
let numeroformato = '+52 1 999 209 5479'
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;${name};;;\nFN:${name}\nORG:${name}\nTITLE:\nitem1.TEL;waid=${numero}:${numeroformato}\nitem1.X-ABLabel:${name}\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:${name}\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: name, contacts: [{ vcard }] }}, {quoted: m})}
handler.help = ['owner', 'creator']
handler.tags = ['info']
handler.command = /^(owner|creator|creador|propietario)$/i
export default handler