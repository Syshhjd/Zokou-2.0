const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0p0MDN0Zys2TVFjKzFUVmlSV2RkQmtNbmtFcmdFM3BXSTZxekZ6d2kxdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTHZ0NTltQ2N6TUd4WXhkVWFheml3Y1pRVFVsdnJmT3lKWXBPSTdKMWdBWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5RTEwQkxmbEk3SmpDWDdLQjR3UitXU0J3MnhjeTM2UGJ3UFY3eENvWVY4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGK3M4Um51YWVUSStUck82cGJ3cGZJV0MwRUs5akNxNjlZMmpRZHhBQVVvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFMNHp1YjdUOGNKTlBCdmNjUEw5eEtsTHRVMjRSUjlYQ2JJWFhUdGdzWHM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkM4eW8zL0hraFZDUjhtYkR3ZlJqN3hrd3hRSldYdmgrcy9BM25WK21NR0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0lBN0s4YzFwU0tmdjBwSndxb1llYXowRUZKVW96Yys5cFYvN1VnMW8wMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidytSZ1dmVE0xMmZKaDFrWkg5a3hlMS91cDNrNmhCSmlSYkM5OTBxM3Ewbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1Lcjc1V3laYVF0M014YkhlVFJJU1hBUFNsYjlYUFpBeVovRHZRcUs1aUkrNEZrQUJoM3B1eFBLUFlwR0l5a1k5SmxMVXN4b3pKKytia3Z4UVlEU0RBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI0LCJhZHZTZWNyZXRLZXkiOiJiRGJBZ0lGQStZV1YyaDk5UHRNY3NuZk1KekJlRmp3YUp0RGoxWmdYbWZJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJVaXJ6NXJsSlFPT1RSd0RicEVLRUF3IiwicGhvbmVJZCI6IjM0YWE2ZDc0LTNlOGMtNDM2Yy05Mzk2LTQ2YzBmN2YxMjRhNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQcE5JZ084OXByOTBUbUxRdWJGTkUxMDlNM1U9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImM1QlVqa2c3TmZ2ekc0b0ptOC93ZGpHZUNvRT0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05qODB0b05FTmlQbHJnR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkNIVGN0eGxtOExubTBPaEczM3ZOeXh5V1pQWWp1MGF0Q1paYWRXdWI3MnM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkJHYXRhU2xSRnd2SWFDY1Z0M0NJcjNqd1prYWw3WXlHdHpFV3A2Y0pza3hwaW5lMlNVTFpzdjVRNTJkVEdVR3RIQ0o1Wmx2c1IwUXNRclJORnB0TUF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ2WDNlUTVNMm5GZUwxMzRLUUQ3WHJjeGVVOEsyUXBMR3duUlN6YTlsNUZXczZDMTZocjNVSkoyWjJ5bUxkMG5RRXZqODkxalYraVllc1FiM3dhMHNDdz09In0sIm1lIjp7ImlkIjoiMTcxNjUwMzY2MTY6MTFAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyMjgyOTUyNDUzNDQ4NDk6MTFAbGlkIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjE3MTY1MDM2NjE2OjExQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFoMDNMY1padkM1NXREb1J0OTd6Y3NjbG1UMkk3dEdyUW1XV25Wcm0rOXIifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI4NDE1NzA3LCJsYXN0UHJvcEhhc2giOiIycm5Ha0sifQ==  ',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || " 🍷 𝚵𝚳𝚸𝚵𝚪𝚯𝚪 𝐒𝐔𝐊𝐔𝚴𝚫 🍷  ",
    NUMERO_OWNER : process.env.NUMERO_OWNER,17165036616              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "oui",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'JMH X MD ',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'oui',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
