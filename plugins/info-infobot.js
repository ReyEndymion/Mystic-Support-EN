import os from 'os'
import util from 'util'
import sizeFormatter from 'human-readable'
import MessageType from '@adiwajshing/baileys'
import fs from 'fs'
import { performance } from 'perf_hooks'
let handler = async (m, { conn, usedPrefix }) => {
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime) 
let totalreg = Object.keys(global.db.data.users).length
const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))
const groups = chats.filter(([id]) => id.endsWith('@g.us'))
const used = process.memoryUsage()
const { restrict, antiCall, antiprivado, modejadibot } = global.db.data.settings[conn.user.jid] || {}
const { autoread, gconly, pconly, self } = global.opts || {}
let old = performance.now()
let neww = performance.now()
let speed = neww - old
let info = `
╠═〘 𝐈𝐍𝐅𝐎 𝐁𝐎𝐓 〙 ═
╠
╠➥ [🤴🏻] 𝙲𝚁𝙴𝙰𝚃𝙾𝚁: *𝙱𝚛𝚞𝚗𝚘 𝚂𝚘𝚋𝚛𝚒𝚗𝚘*
╠➥ [#️⃣] 𝙽𝚄𝙼𝙱𝙴𝚁: *+52 1 999 209 5479*
╠➥ [🎳] 𝙿𝚁𝙴𝙵𝙸𝚇: *${usedPrefix}*
╠➥ [🔐] 𝙿𝚁𝙸𝚅𝙰𝚃𝙴 𝙲𝙷𝙰𝚃𝚂: *${chats.length - groups.length}*
╠➥ [🦜] 𝙶𝚁𝙾𝚄𝙿 𝙲𝙷𝙰𝚃𝚂: *${groups.length}*
╠➥ [💡] 𝚃𝙾𝚃𝙰𝙻 𝙲𝙷𝙰𝚃𝚂: *${chats.length}*
╠➥ [🚀] 𝙰𝙲𝚃𝙸𝚅𝙸𝚃𝚈: *${uptime}*
╠➥ [🎩] 𝚄𝚂𝙴𝚁𝚂: *${totalreg} numbers*
╠➥ [☑️] 𝙰𝚄𝚃𝙾𝚁𝙴𝙰𝙳: ${autoread ? '*enabled : disabled*'}
╠➥ [❗] 𝚁𝙴𝚂𝚃𝚁𝙸𝙲𝚃: ${restrict ? '*enabled : disabled*'}
╠➥ [📵] 𝙰𝙽𝚃𝙸-𝙲𝙰𝙻𝙻: ${antiCall ? '*enabled : disabled*'}
╠➥ [👨‍🦯] 𝚂𝙿𝙴𝙴𝙳:
╠ *${speed}ms* 
╠
╠═〘 𝐓𝐡𝐞 𝐌𝐲𝐬𝐭𝐢𝐜 - 𝐁𝐨𝐭 〙 ═
`.trim() 
m.reply(info)
}
handler.help = ['infobot', 'speed']
handler.tags = ['info', 'tools']
handler.command = /^(ping|speed|infobot)$/i
export default handler

function clockString(ms) {
let h = Math.floor(ms / 3600000)
let m = Math.floor(ms / 60000) % 60
let s = Math.floor(ms / 1000) % 60
console.log({ms,h,m,s})
return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')}