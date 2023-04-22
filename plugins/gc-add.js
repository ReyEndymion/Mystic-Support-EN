let { generateWAMessageFromContent, prepareWAMessageMedia, proto } = (await import('@adiwajshing/baileys')).default
import fetch from 'node-fetch'
const { getBinaryNodeChild, getBinaryNodeChildren } = (await import('@adiwajshing/baileys')).default
let handler = async (m, { conn, text, participants, args, usedPrefix, command }) => {  
if (!global.db.data.settings[conn.user.jid].restrict) throw '*[ ⚠️ ] 𝚃𝙷𝙴 𝙾𝚆𝙽𝙴𝚁 𝙷𝙰𝚂 𝚁𝙴𝚂𝚃𝚁𝙸𝙲𝚃𝙴𝙳 (𝚎𝚗𝚊𝚋𝚕𝚎 𝚛𝚎𝚜𝚝𝚛𝚒𝚌𝚝 / 𝚍𝚒𝚜𝚊𝚋𝚕𝚎 𝚛𝚎𝚜𝚝𝚛𝚒𝚌𝚝) 𝚃𝙷𝙴 𝚄𝚂𝙴 𝙾𝙵 𝚃𝙷𝙸𝚂 𝙲𝙾𝙼𝙼𝙰𝙽𝙳*'
if (!args[0]) throw '*[❗] 𝙴𝙽𝚃𝙴𝚁 𝚃𝙷𝙴 𝙽𝚄𝙼𝙱𝙴𝚁 𝙾𝙵 𝚃𝙷𝙴 𝚄𝚂𝙴𝚁 𝚈𝙾𝚄 𝚆𝙰𝙽𝚃 𝚃𝙾 𝙰𝙳𝙳*' 
if (isNaN(text)) throw `*[❗] 𝙴𝚁𝚁𝙾𝚁, 𝙿𝙻𝙴𝙰𝚂𝙴 𝙴𝙽𝚃𝙴𝚁 𝙰 𝙲𝙾𝚁𝚁𝙴𝙲𝚃 𝙽𝚄𝙼𝙱𝙴𝚁, 𝙴𝚇𝙰𝙼𝙿𝙻𝙴: ${usedPrefix + command} 5219996666666*`    
try {    
let _participants = participants.map(user => user.id)
let users = (await Promise.all(
text.split(',')
.map(v => v.replace(/[^0-9]/g, ''))
.filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
.map(async v => [v, await conn.onWhatsApp(v + '@s.whatsapp.net')]))).filter(v => v[1][0]?.exists).map(v => v[0] + '@c.us')
const response = await conn.query({ tag: 'iq', attrs: { type: 'set', xmlns: 'w:g2', to: m.chat }, content: users.map(jid => ({ tag: 'add', attrs: {}, content: [{ tag: 'participant', attrs: { jid } }]}))})
const pp = await conn.profilePictureUrl(m.chat).catch(_ => null)
const jpegThumbnail = pp ? await (await fetch(pp)).buffer() : Buffer.alloc(0)
const add = getBinaryNodeChild(response, 'add')
const participant = getBinaryNodeChildren(add, 'participant')
for (const user of participant.filter(item => item.attrs.error == 403)) {
const jid = user.attrs.jid
const content = getBinaryNodeChild(user, 'add_request')
const invite_code = content.attrs.code
const invite_code_exp = content.attrs.expiration
let teks = `*[❗𝐈𝐍𝐅𝐎❗] 𝙸𝚃 𝚆𝙰𝚂 𝙽𝙾𝚃 𝙿𝙾𝚂𝚂𝙸𝙱𝙻𝙴 𝚃𝙾 𝙰𝙳𝙳 𝚃𝙾 @${jid.split('@')[0]}, THIS MAY HAPPEN BECAUSE THE NUMBER IS INCORRECT, THE PERSON HAS RECENTLY LEFT THE GROUP OR THE PERSON HAS CONFIGURED HIS GROUP PRIVACY, 𝚃𝙷𝙴 𝙶𝚁𝙾𝚄𝙿 𝙸𝙽𝚅𝙸𝚃𝙰𝚃𝙸𝙾𝙽 𝚆𝙰𝚂 𝚂𝙴𝙽𝚃 𝚃𝙾 𝚃𝙷𝙴 𝚄𝚂𝙴𝚁 𝙿𝚁𝙸𝚅𝙰𝚃𝙴 𝙲𝙷𝙰𝚃*`
m.reply(teks, null, { mentions: conn.parseMention(teks)})
let captionn = `Hey!! Hi, I introduce myself, I'm The Mystic - Bot, and I'm a WhatsApp Bot, a person from the group used the command to add you to the group, but I couldn't add you, so I'm sending you the invitation to add yourself, we're waiting for you!!`    
var messaa = await prepareWAMessageMedia({ image: jpegThumbnail }, { upload: conn.waUploadToServer })
var groupInvite = generateWAMessageFromContent(m.chat, proto.Message.fromObject({ groupInviteMessage: { groupJid: m.chat, inviteCode: invite_code, inviteExpiration: invite_code_exp, groupName: await conn.getName(m.chat), caption: captionn, jpegThumbnail: jpegThumbnail }}), { userJid: jid })
await conn.relayMessage(jid, groupInvite.message, { messageId: groupInvite.key.id })}
} catch {
throw '*[❗𝐈𝐍𝐅𝐎❗] 𝙽𝙾 𝙵𝚄𝙴 𝙿𝙾𝚂𝙸𝙱𝙻𝙴 𝙰𝙽̃𝙰𝙳𝙸𝚁 𝙴𝙻 𝙽𝚄𝙼𝙴𝚁𝙾 𝚀𝚄𝙴 𝙸𝙽𝙶𝚁𝙴𝚂𝙾, THIS MAY HAPPEN BECAUSE THE NUMBER IS INCORRECT, THE PERSON HAS RECENTLY LEFT THE GROUP OR THE PERSON HAS CONFIGURED HIS GROUP PRIVACY, 𝚆𝙴 𝙰𝙳𝚅𝙸𝚂𝙴 𝚈𝙾𝚄 𝚃𝙾 𝚂𝙴𝙽𝙳 𝚃𝙷𝙴 𝙸𝙽𝚅𝙸𝚃𝙰𝚃𝙸𝙾𝙽 𝙼𝙰𝙽𝚄𝙰𝙻𝙻𝚈!!*'
}}
handler.help = ['add', '+'].map(v => v + ' número')
handler.tags = ['group']
handler.command = /^(add|agregar|añadir|\+)$/i
handler.admin = handler.group = handler.botAdmin = true
export default handler
