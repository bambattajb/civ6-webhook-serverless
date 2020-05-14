require('dotenv').config();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const hook = process.env.DC_WEBHOOK;
'use strict';

module.exports.exec = async req => {

    const xhr =
        new XMLHttpRequest();
    const body
        = req.body;
    const today = new Date();
    const day =
        String(today.getDate()).padStart(2, '0');
    const month =
        String(today.getMonth() + 1).padStart(2, '0');
    const year =
        today.getFullYear();
    const hours =
        today.getHours();
    const minutes =
        String((today.getMinutes() < 10 ? '0' : '') + today.getMinutes());

    let content
        = `Last turn completed on `;
    content += `${day}-${month}-${year}`;
    content += ` @ ${hours}:${minutes}\n`;
    content += `\n`;
    content += `Name: ${body.value1}\n`;
    content += `Turn: ${body.value3}\n`;
    content += `Player next up: ${body.value2}`;

    xhr.
        open("POST", hook);
    xhr.
        setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    await xhr.
        send(JSON.stringify({content})
    );

    return false;
};
