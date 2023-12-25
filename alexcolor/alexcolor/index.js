const reset = "\x1b[0m";


function green(textg){
    return `\x1b[32m${textg}${reset}`;
}

function white(textw){
    return `${reset}${textw}`;
}

function red(textr){
    return `\x1b[31m${textr}${reset}`;
}

function yellow(texty){
    return `\x1b[33m${texty}${reset}`;
}

function black(textb1){
    return `\x1b[30m${textb1}${reset}`;
}

function cyan(textc){
    return `\x1b[36m${textc}${reset}`;
}

function blue(textb2){
    return `\x1b[34m${textb2}${reset}`;
}

function magenta(textm){
    return `\x1b[35m${textm}${reset}`;
}

function bgRed(textbr){
    return `\x1b[41m${textbr}${reset}`;
}

function bgYellow(textby){
    return `\x1b[43m${textby}${reset}`;
}

function bgGreen(textbg){
    return `\x1b[42m${textbg}${reset}`;
}

function bgBlue(textbb){
    return `\x1b[44m${textbb}${reset}`;
}

function bgMagenta(textbm){
    return `\x1b[45m${textbm}${reset}`;
}

function bgCyan(textbc){
    return `\x1b[46m${textbc}${reset}`;
}

function bgWhite(textbw){
    return `\x1b[47m${textbw}${reset}`
}


module.exports = {
    green,
    white,
    red,
    yellow,
    black,
    cyan,
    blue,
    magenta,
    bgRed,
    bgYellow,
    bgGreen,
    bgBlue,
    bgMagenta,
    bgCyan,
    bgWhite
}