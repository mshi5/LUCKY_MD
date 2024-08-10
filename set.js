const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUdSL2JYaHZ4UHlWV1dJanQ0M0UvTmwwb0M1RGZHSmxLdVdFVGtHaTgwbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYjd4TFl1WWE4RU40cGxrK1h1NlFqUjZLcnZtcHE1a1ozUTVEclM4azd4dz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNQXlzUHZ1SU13TVpLdGh4MFdHZGN6R2tJU2tadnZsTXFUUjY4aExsSmxVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKUURpUldaUFhkOGo4T3JHN1ZHWVMzQlJ2dkNWU0I4MnJCK2xTeXBmcjFFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFKVm1lU2tWdkNzVXJ4aTVsbjB2YVU0amt6VE1aU21ZemJ5Y0FSOFNMMzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldnWTVTQWF1TWxuNndkbVNudUNNbVRVWFNnN2dzT3VHTi96anNqYjgrV0E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkZ1TmJJTVI4d2VJTHFoY2FMSUVDM0dzT3MveUhtS0M2empRZEo2ZGRITT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkhWVUtSUnBsNjE3TmI4RWE1Tzl6SkV2ak0vbHBPYXE5SCtyaTZSZFRWUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imd0Q0E5WFkrSUo3bVZCQWs5dWNjUUlDbzhoQmtWN21vWXBEdTB2Mi9kS2Y1UGpzOG5oVXU2UHpvdktxRVpKdTNyNnhheWFZM0JaSytFc3F5M0lhVkRnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMsImFkdlNlY3JldEtleSI6IjdzNHhhaFIzbHhNcmlMRmxMbDI5YUlNa2REd0ZHUGtyMFdPQzhEbmJCVjQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Imp0dW9tamRXUURlOXBSbWFybkE0bnciLCJwaG9uZUlkIjoiMWFjOGEyMDAtMzM1ZS00MjE1LWFmMTMtODE0N2E2YjhlZDlkIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVqWDhJTGZiWXZqdWlCZzFNeEVORko3TEhyaz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGdytUanIxMThhbklrajNDdEhUaDdMM1JpYTA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUTNFWDdGWEYiLCJtZSI6eyJpZCI6IjI1NTc0ODQwOTIxMjozNkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJMdXRlbmFudCBKb3ZpbiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTUdZNDZjRUVKRE8zclVHR0FvZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiYVFObGI1bXBoVnBXY1d2V0NLbllMdjU0bGx2NTdldlNoNW9oajRUelBWcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiakduNFUzSFY3L3Jyek9SdlhNUDdGcWZnQjIvQU5rVk9Mc0dxdzZFUUhVa3BqejErbWtWV2VpSUU4VVIvVk40UVZ1WjN3OXdSNWNTTVZVYmVHWCtyQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6ImhKbEZGaG1Ga1lzb3pJWlhUN0Q1cHd0K3E3Q2dleG1wUFN1ZmNwYkJzdGxFR1lTeHJ5NTArcTJ4RUV5aDZGU3BuYlBhaTR5R2RJallXejVLakRNQ0FnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NzQ4NDA5MjEyOjM2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldrRFpXK1pxWVZhVm5GcjFnaXAyQzcrZUpaYitlM3Iwb2VhSVkrRTh6MWIifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjMzMTE5MDEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSmdRIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Fredie Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255748409212",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'LUCKY MD V5',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/60cd0a18bda777a41ffe3.jpg,https://telegra.ph/file/bc9bf76f258c98877d993.jpg,https://telegra.ph/file/f6c60977ceb194e05e616.jpg,https://telegra.ph/file/74d7f0176b4e779dea4fd.jpg,https://telegra.ph/file/d04abf5e17b331ab46871.jpg,https://telegra.ph/file/2ab35f2759d081657d286.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
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
