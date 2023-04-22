process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = true
import './config.js';
import { createRequire } from "module"; 
import path, { join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
import * as ws from 'ws';
import { writeFileSync, readdirSync, statSync, unlinkSync, existsSync, readFileSync, copyFileSync, watch, rmSync, readdir, stat } from 'fs';
import yargs from 'yargs';
import { spawn } from 'child_process';
import lodash from 'lodash';
import chalk from 'chalk';
import syntaxerror from 'syntax-error';
import { tmpdir } from 'os';
import { format } from 'util';
import P from 'pino';
import pino from 'pino';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import { Low, JSONFile } from 'lowdb';
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const { DisconnectReason, useMultiFileAuthState } = await import('@adiwajshing/baileys')
const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000
protoType()
serialize()
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() }; global.__dirname = function dirname(pathURL) { return path.dirname(global.__filename(pathURL, true)) }; global.__require = function require(dir = import.meta.url) { return createRequire(dir) }
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
global.timestamp = { start: new Date }
const __dirname = global.__dirname(import.meta.url)
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[' + (opts['prefix'] || 'xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-HhhHBb.aA').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`))

global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) return new Promise((resolve) => setInterval(async function () {
if (!global.db.READ) {
clearInterval(this)
resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
}
}, 1 * 1000))
if (global.db.data !== null) return
global.db.READ = true
await global.db.read().catch(console.error)
global.db.READ = null
global.db.data = {
users: {},
chats: {},
stats: {},
msgs: {},
sticker: {},
settings: {},
...(global.db.data || {})
}
global.db.chain = chain(global.db.data)
}
loadDatabase()

global.authFile = `MysticSession`
const { state, saveState, saveCreds } = await useMultiFileAuthState(global.authFile)

const connectionOptions = {
logger: P({ level: 'silent' }),
printQRInTerminal: true,
auth: state,
browser: ['MysticBot','Safari','16.3.1'],
patchMessageBeforeSending: (message) => {
const requiresPatch = !!( message.buttonsMessage || message.templateMessage || message.listMessage );
if (requiresPatch) { message = { viewOnceMessage: { message: { messageContextInfo: { deviceListMetadataVersion: 2, deviceListMetadata: {}, }, ...message, },},};}
return message;},
getMessage: async (key) => ( opts.store.loadMessage(/** @type {string} */(key.remoteJid), key.id) || opts.store.loadMessage(/** @type {string} */(key.id)) || {} ).message || { conversation: 'Please send messages again' },   
//msgRetryCounterMap,
}

global.conn = makeWASocket(connectionOptions)
/* Solucion mensajes en espera */
global.conn = makeWASocket({ ...connectionOptions, ...opts.connectionOptions,
getMessage: async (key) => (
opts.store.loadMessage(/** @type {string} */(key.remoteJid), key.id) ||
opts.store.loadMessage(/** @type {string} */(key.id)) || {}
).message || { conversation: 'Please send messages again' },
})

conn.isInit = false

if (!opts['test']) {
if (global.db) setInterval(async () => {
if (global.db.data) await global.db.write()
if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp', "jadibts"], tmp.forEach(filename => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])))
}, 30 * 1000)}

if (opts['server']) (await import('./server.js')).default(global.conn, PORT)

function backupCreds() {
  const SESSION_DIR = './MysticBot';
  const SESSION_BACKUP_DIR = './sesionRespaldo';
  const CREDENTIALS_FILE = 'creds.json';
  const CREDENTIALS_BACKUP_FILE = 'creds.json';
  const credsFilePath = path.join(SESSION_DIR, CREDENTIALS_FILE);
  const backupFilePath = path.join(SESSION_BACKUP_DIR, CREDENTIALS_BACKUP_FILE);
  copyFileSync(credsFilePath, backupFilePath);
  console.log(`Creado el archivo de respaldo: ${backupFilePath}`);
}
function actualizarNumero() {
  const configPath = path.join(__dirname, 'config.js');
  const configData = readFileSync(configPath, 'utf8');
  const updatedConfigData = configData.replace(/(global\.MysticBot\s*=\s*\[\s*\[')[0-9]+'(,\s*'Bot principal\s*-\s*MysticBot',\s*true\]\s*\])/, function(match) {
    const archivoCreds = readFileSync(path.join(__dirname, 'sesionRespaldo/creds.json'));
    const numero = JSON.parse(archivoCreds).me.id.split(':')[0];
    return `global.botcomedia = [['${numero}', 'Bot principal  - MysticBot', true]]`;
  });
  writeFileSync(configPath, updatedConfigData);
}

function cleanupOnConnectionError() {
  const SESSION_DIR = './MysticBot';
  const SESSION_BACKUP_DIR = './sesionRespaldo';
  const CREDENTIALS_BACKUP_FILE = 'creds.json';

readdirSync(SESSION_DIR).forEach(file => {
    const filePath = path.join(SESSION_DIR, file);
    try {
      unlinkSync(filePath);
      console.log(`Archivo eliminado: ${filePath}`);
    } catch (error) {
      console.log(`No se pudo eliminar el archivo: ${filePath}`);
    }
  });

  const backupFilePath = path.join(SESSION_BACKUP_DIR, CREDENTIALS_BACKUP_FILE);
  try {
    unlinkSync(backupFilePath);
    console.log(`Archivo de copia de seguridad eliminado: ${backupFilePath}`);
  } catch (error) {
    console.log(`No se pudo eliminar el archivo de copia de seguridad o no existe: ${backupFilePath}`);
  }
  process.send('reset')
} 

function credsStatus() {
  const SESSION_DIR = './MysticBot';
  const SESSION_BACKUP_DIR = './sesionRespaldo';
  const CREDENTIALS_FILE = 'creds.json';
  const CREDENTIALS_BACKUP_FILE = 'creds.json';
  
  const credsFilePath = path.join(SESSION_DIR, CREDENTIALS_FILE);
  const backupFilePath = path.join(SESSION_BACKUP_DIR, CREDENTIALS_BACKUP_FILE);
  
  let originalFileValid = false;
  try {
    const stats = statSync(credsFilePath);
    originalFileValid = stats.isFile() && stats.size > 0;
  } catch (error) {
    console.log(`El archivo de credenciales no existe o está vacío. Generando código QR...`);
    connectionOptions
      console.log(`Escanea el código QR para continuar.`);
  }
  
  if (!originalFileValid) {
 	const backupStats = statSync(backupFilePath);
    if (backupStats.isFile() && backupStats.size > 0) {
      copyFileSync(backupFilePath, credsFilePath);
      console.log(`Archivo de credenciales restaurado desde la copia de seguridad: ${backupFilePath} -> ${credsFilePath}`);
        process.send('reset')
    } else {
      console.log(`No se encuentra el archivo de credenciales válido y el archivo de copia de seguridad no es válido o falta: ${credsFilePath}, ${backupFilePath}`);
      connectionOptions
    }
  } else {
    console.log('Archivo de respaldo correcto, continuando inicio de sesión');
  }
}
function waitTwoMinutes() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2 * 60 * 1000); 
  });
}

async function connectionUpdate(update) {
const { connection, lastDisconnect, isNewLogin } = update
global.stopped = connection    
if (isNewLogin) conn.isInit = true
const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (code && code !== DisconnectReason.loggedOut && conn?.ws.readyState !== CONNECTING) {
console.log(await global.reloadHandler(true).catch(console.error))
global.timestamp.connect = new Date
}
if (global.db.data == null) loadDatabase()
if (update.qr != 0 && update.qr != undefined) {
console.log(chalk.yellow('🚩ㅤScan this QR code, the QR code expires in 60 seconds.'))
}
if (connection == 'open') {
console.log(chalk.yellow('▣──────────────────────────────···\n│\n│❧ 𝚂𝚄𝙲𝙲𝙴𝚂𝚂𝙵𝚄𝙻𝙻𝚈 𝙲𝙾𝙽𝙽𝙴𝙲𝚃𝙴𝙳 𝚃𝙾 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 ✅\n│\n▣──────────────────────────────···'))}
if (connection == 'close') {
console.log(chalk.yellow(`🚩ㅤConnection closed, please delete the folder ${global.authFile} and rescan the QR code`));
          } else {
              console.log(chalk.yellow('🚩ㅤError al guardar el archivo de credenciales'));

                    }
          backupCreds();
          actualizarNumero()
          credsStatus();
          try {
            await db.read();

            const chats = db.data.chats;
            let successfulBans = 0;
          
            for (const [key, value] of Object.entries(chats)) {
              if (value.isBanned === false) {
                value.isBanned = true;
                successfulBans++;
              }
            }

            await db.write();
          
            if (successfulBans === 0) {
              throw new Error('No se pudo banear ningún chat');
            } else {
              console.log(`Se banearon ${successfulBans} chats correctamente`);
            }
          
          } catch (e) {
            console.log(`Error: ${e.message}`);
          } 
          await waitTwoMinutes()         
          try {
            await db.read();
        
            const chats = db.data.chats;
            let successfulUnbans = 0;
          
            for (const [key, value] of Object.entries(chats)) {
              if (value.isBanned === true) {
                value.isBanned = false;
                successfulUnbans++;
              }
            }
          
            await db.write();
          
            if (successfulUnbans === 0) {
              throw new Error('No se pudo desbanear ningún chat');
            } else {
              console.log(`Se desbanearon ${successfulUnbans} chats correctamente`);
            }
          
          } catch (e) {
            console.log(`Error: ${e.message}`);
          }
          
          }
        }
 
process.on('uncaughtException', console.error)

let isInit = true;
let handler = await import('./handler.js')
global.reloadHandler = async function (restatConn) {
try {
const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
if (Object.keys(Handler || {}).length) handler = Handler
} catch (e) {
console.error(e)
}
if (restatConn) {
const oldChats = global.conn.chats
try { global.conn.ws.close() } catch { }
conn.ev.removeAllListeners()
global.conn = makeWASocket(connectionOptions, { chats: oldChats })
isInit = true
}
if (!isInit) {
conn.ev.off('messages.upsert', conn.handler)
conn.ev.off('group-participants.update', conn.participantsUpdate)
conn.ev.off('groups.update', conn.groupsUpdate)
conn.ev.off('call', conn.onCall)
conn.ev.off('connection.update', conn.connectionUpdate)
conn.ev.off('creds.update', conn.credsUpdate)
}
  
conn.welcome = '*╔══════════════*\n*╟❧ @subject*\n*╠══════════════*\n*╟❧ @user*\n*╟❧ 𝚆𝙴𝙻𝙲𝙾𝙼𝙴* \n*║*\n*╟❧ 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝚃𝙸𝙾𝙽 𝙾𝙵 𝚃𝙷𝙴 𝙶𝚁𝙾𝚄𝙿:*\n\n@desc\n\n*║*\n*╟❧ 𝙴𝙽𝙹𝙾𝚈 𝚈𝙾𝚄𝚁 𝚂𝚃𝙰𝚈!!*\n*╚══════════════*'
conn.bye = '*╔══════════════*\n*╟❧ @user*\n*╟❧ 𝚂𝙴𝙴 𝚈𝙾𝚄 𝚂𝙾𝙾𝙽 👋🏻* \n*╚══════════════*'
conn.spromote = '*@user 𝙹𝙾𝙸𝙽𝚂 𝚃𝙷𝙴 𝙶𝚁𝙾𝚄𝙿 𝙾𝙵 𝙰𝙳𝙼𝙸𝙽𝚂!!*'
conn.sdemote = '*@user 𝙻𝙴𝙰𝚅𝙴𝚂 𝚃𝙷𝙴 𝙰𝙳𝙼𝙸𝙽 𝙶𝚁𝙾𝚄𝙿!!*'
conn.sDesc = '*𝚂𝙴 𝙷𝙰 𝙼𝙾𝙳𝙸𝙵𝙸𝙲𝙰𝙳𝙾 𝙻𝙰 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝙲𝙸𝙾𝙽 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾*\n\n*𝙽𝚄𝙴𝚅𝙰 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝙲𝙸𝙾𝙽:* @desc'
conn.sSubject = '*𝚃𝙷𝙴 𝙶𝚁𝙾𝚄𝙿 𝙽𝙰𝙼𝙴 𝙷𝙰𝚂 𝙱𝙴𝙴𝙽 𝙼𝙾𝙳𝙸𝙵𝙸𝙴𝙳*\n*𝙽𝙴𝚆 𝙽𝙰𝙼𝙴:* @subject'
conn.sIcon = '*𝚂𝙴 𝙷𝙰 𝙲𝙰𝙼𝙱𝙸𝙰𝙳𝙾 𝙻𝙰 𝙵𝙾𝚃𝙾 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾!!*'
conn.sRevoke = '*𝚂𝙴 𝙷𝙰 𝙰𝙲𝚃𝚄𝙰𝙻𝙸𝚉𝙰𝙳𝙾 𝙴𝙻 𝙻𝙸𝙽𝙺 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾!!*\n*𝙻𝙸𝙽𝙺 𝙽𝚄𝙴𝚅𝙾:* @revoke'

conn.handler = handler.handler.bind(global.conn)
conn.participantsUpdate = handler.participantsUpdate.bind(global.conn)
conn.groupsUpdate = handler.groupsUpdate.bind(global.conn)
conn.onCall = handler.callUpdate.bind(global.conn)
conn.connectionUpdate = connectionUpdate.bind(global.conn)
conn.credsUpdate = saveCreds.bind(global.conn, true)

conn.ev.on('messages.upsert', conn.handler)
conn.ev.on('group-participants.update', conn.participantsUpdate)
conn.ev.on('groups.update', conn.groupsUpdate)
conn.ev.on('call', conn.onCall)
conn.ev.on('connection.update', conn.connectionUpdate)
conn.ev.on('creds.update', conn.credsUpdate)
isInit = false
return true
}

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
async function filesInit() {
for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
try {
let file = global.__filename(join(pluginFolder, filename))
const module = await import(file)
global.plugins[filename] = module.default || module
} catch (e) {
conn.logger.error(e)
delete global.plugins[filename]
}}}
filesInit().then(_ => Object.keys(global.plugins)).catch(console.error)

global.reload = async (_ev, filename) => {
if (pluginFilter(filename)) {
let dir = global.__filename(join(pluginFolder, filename), true)
if (filename in global.plugins) {
if (existsSync(dir)) conn.logger.info(` updated plugin - '${filename}'`)
else {
conn.logger.warn(`deleted plugin - '${filename}'`)
return delete global.plugins[filename]
}
} else conn.logger.info(`new plugin - '${filename}'`)
let err = syntaxerror(readFileSync(dir), filename, {
sourceType: 'module',
allowAwaitOutsideFunction: true
})
if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
else try {
const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
global.plugins[filename] = module.default || module
} catch (e) {
conn.logger.error(`error require plugin '${filename}\n${format(e)}'`)
} finally {
global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
}}}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()
async function _quickTest() {
let test = await Promise.all([
spawn('ffmpeg'),
spawn('ffprobe'),
spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
spawn('convert'),
spawn('magick'),
spawn('gm'),
spawn('find', ['--version'])
].map(p => {
return Promise.race([
new Promise(resolve => {
p.on('close', code => {
resolve(code !== 127)
})}),
new Promise(resolve => {
p.on('error', _ => resolve(false))
})])}))
let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
let s = global.support = { ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find }
Object.freeze(global.support)
}
global.prefix = new RegExp('^[' + (opts['prefix'] || 'xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®?&.\\-HhhHBb.aA' + conn.user.jid).replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');

function clearTmp() {
  const tmp = [tmpdir(), join(__dirname, './tmp')]
  const filename = []
  tmp.forEach(dirname => readdirSync(dirname).forEach(file => filename.push(join(dirname, file))))
  return filename.map(file => {
      const stats = statSync(file)
      if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) return unlinkSync(file) // 3 minutes
      return false })
  }
  
  function purgeSession() {
      
      let prekey = []
      let directorio = readdirSync("./MysticBot")
      let filesFolderPreKeys = directorio.filter((file) => {
          if (file.startsWith('pre-key-')) {
          return true 
          }
          const stats = fs.statSync(path.join(`./MysticBot/${file}`));
          const mtime = new Date(stats.mtime);
        const now = new Date();
        const hourAgo = new Date(now - 60 * 60 * 1000);
        return (
          (file.startsWith('sender-key-') ||
            file.startsWith('sender-key-memory-') ||
            file.startsWith('sender-key-status@broadcast') ||
            file.startsWith('session')) &&
          mtime <= hourAgo
        )
      })
      if (prekey.length === 0) {
        console.log("Ningún archivo encontrado");
      } else {
      prekey = [...prekey, ...filesFolderPreKeys]
      filesFolderPreKeys.forEach(files => {
      unlinkSync(`./MysticBot/${files}`)
      console.log(`${files} fueron eliminados`)
  
  })
  }
  }  
  
  function purgeSessionSB() {
    const listaDirectorios = fs.readdirSync('./jadibts/');
    console.log(listaDirectorios);
    let SBprekey = [];
  
    listaDirectorios.forEach((filesInDir) => {
      const directorio = fs.readdirSync(`./jadibts/${filesInDir}`);
      console.log(directorio);
      const DSBPreKeys = directorio.filter((fileInDir) => {
        if (fileInDir.startsWith('pre-key-')) {
          return true;
        }
        const stats = fs.statSync(path.join(`./jadibts/${filesInDir}/${fileInDir}`));
        const mtime = new Date(stats.mtime);
        const now = new Date();
        const hourAgo = new Date(now - 60 * 60 * 1000);
        return (
          (fileInDir.startsWith('sender-key-') ||
            fileInDir.startsWith('sender-key-memory-') ||
            fileInDir.startsWith('sender-key-status@broadcast') ||
            fileInDir.startsWith('session')) &&
          mtime <= hourAgo
        );
      });
      if (DSBPreKeys.length === 0) {
        console.log('Ningún archivo encontrado');
      } else {
        SBprekey = [...SBprekey, ...DSBPreKeys];
        DSBPreKeys.forEach((fileInDir) => {
          fs.unlinkSync(`./jadibts/${filesInDir}/${fileInDir}`);
          console.log(`${fileInDir} fueron eliminados`);
        });
      }
    });
  }
  
  function purgeOldFiles() {
      const directories = ['./MysticBot/', './jadibts/'];
      const oneHourAgo = new Date(Date.now() - (60 * 60 * 1000));
     
      directories.forEach((dir) => {
          readdirSync(dir, (err, files) => {
          if (err) throw err;
          files.forEach((file) => {
            const filePath = path.join(dir, file);
            statSync(filePath, (err, stats) => {
              if (err) throw err;
              const createTime = new Date(stats.birthtimeMs);
              const modTime = new Date(stats.mtimeMs);
              const isOld = createTime < oneHourAgo || modTime < oneHourAgo;
              const isCreds = file === 'creds.json';
              if (stats.isFile() && isOld && !isCreds) {
                  unlinkSync(filePath, (err) => {
                  if (err) throw err;
                  console.log(`Archivos ${filePath} borrados con éxito`);
                });
              } else {
                console.log(`Archivo ${filePath} no borrado`);
              }
            });
          });
        });
      });
    }
    purgeOldFiles()

setInterval(async () => {
    backupCreds()
    console.log(chalk.whiteBright(`\n▣────────[ BACKUP_CREDS ]───────────···\n│\n▣─❧ SUCCESSFUL ENDORSEMENT ✅\n│\n▣────────────────────────────────────···\n`))
    }, 15 * 60 * 1000)
setInterval(async () => {
    clearTmp()
    console.log(chalk.cyanBright(`\n▣───────────[ 𝙰𝚄𝚃𝙾𝙲𝙻𝙴𝙰𝚁 ]──────────────···\n│\n▣─❧ 𝙵𝙸𝙻𝙴𝚂 𝙳𝙴𝙻𝙴𝚃𝙴𝙳 ✅\n│\n▣───────────────────────────────────────···\n`))
    }, 1000 * 60 * 3)
setInterval(async () => {
     purgeSession()
    console.log(chalk.cyanBright(`\n▣────────[ AUTOPURGESESSIONS ]───────────···\n│\n▣─❧ FILES DELETED ✅\n│\n▣────────────────────────────────────···\n`))
    }, 1000 * 60 * 60)
setInterval(async () => {
      purgeSessionSB()
     console.log(chalk.cyanBright(`\n▣────────[ AUTO_PURGE_SESSIONS_SUB-BOTS ]───────────···\n│\n▣─❧ FILES DELETED ✅\n│\n▣────────────────────────────────────···\n`))
    }, 1000 * 60 * 60)
setInterval(async () => {
     purgeOldFiles()
    console.log(chalk.cyanBright(`\n▣────────[ AUTO_PURGE_OLDFILES ]───────────···\n│\n▣─❧ FILES DELETED ✅\n│\n▣────────────────────────────────────···\n`))
    }, 1000 * 60 * 60)

setInterval(async () => {
if (stopped == 'close') return        
const status = global.db.data.settings[conn.user.jid] || {}
let _uptime = process.uptime() * 1000    
let uptime = clockString(_uptime)
let bio = `🤖 ᴀᴄᴛɪᴠᴇ ᴛɪᴍᴇ: ${uptime} ┃ 👑 ʙʏ ʙʀᴜɴᴏ sᴏʙʀɪɴᴏ ┃ 🔗 ᴏғғɪᴄɪᴀʟ ᴀᴄᴄᴏᴜɴᴛs: https://www.atom.bio/theshadowbrokers-team`
await conn.updateProfileStatus(bio).catch(_ => _)
}, 60000)
function clockString(ms) {
let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [d, ' Day(s) ️', h, ' Hour(s) ', m, ' Minute(s) ', s, ' Second(s) '].map(v => v.toString().padStart(2, 0)).join('')}

_quickTest()
.then(() => conn.logger.info(`Լᴏᴀᴅɪɴɢ．．．\n`))
.catch(console.error)
