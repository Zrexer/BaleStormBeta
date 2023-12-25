#!/usr/bin/env node

const https = require("https");
const alex = require("./node_modules/alexcolor/alexcolor/index");
const fs = require("fs");
const FormData = require('form-data');
const axios = require('axios');
const log = (data) => {
	console.log(data);
};
const __version__ = "1.0.0";
const __dev__ = "Host1let";
const __lang__ = "nodejs";

log(`<BaleStorm Program ${alex.red("Started")}>\n{\n    Developer ${alex.cyan("-->")} ${alex.blue(__dev__)}\n    Version ${alex.cyan("-->")} ${alex.blue(__version__)}\n    Powered By ${alex.cyan("-->")} ${alex.blue(__lang__)}\n}\n`);

class BaleSession{
	constructor(Token){
		this.token = String(Token);
		this.base = `https://tapi.bale.ai/bot${this.token}`
	}

	getUpdates(){
		return new Promise((resv, rej) => {
			https.get(`${this.base}/getUpdates`, (dataUp) => {

				let data = '';

				dataUp.on('data', (ch) => {
					data += ch;
				})

				dataUp.on('end', () => {
					resv(data);
				})
			}).on('error', (err) => {
				rej(err);
			})
		})
	}

	onMessage(){
			return new Promise((resv, rej) => {
				https.get(`${this.base}/getUpdates`, (res) => {
					let data = '';

					res.on("data", (ch) => {
						data += ch;
					})

					res.on('end', () => {
						resv(JSON.parse(data).result[JSON.parse(data).result.length - 1]);
					})
				}).on("error", (err) => {
					rej(err)
				})
			})
	}

	getMe(){
		return new Promise((resv, rej) => {
			https.get(`${this.base}/getMe`, (myCall) => {
				let data = '';

				myCall.on('data', (ch) => {
					data += ch;
				})

				myCall.on('end', () => {
					resv(JSON.parse(data))
				})
			}).on('error', (err) => {
				rej(err);
			})
		})
	}

	sendMessage(text = null, chat_id = null, message_id = null){
		return new Promise((resv, rej) => {
			if (text === null || chat_id === null){
				resv('text and chat_id parameter cannot be empty');
			}else{
				https.get(`${this.base}/sendMessage?text=${text}&chat_id=${chat_id}&reply_to_message_id=${message_id}`, (resSM) => {
					let data = '';

					resSM.on('data', (ch) => {
						data += ch;
					})

					resSM.on('end', () => {
						resv(JSON.parse(data))
					})
				}).on('error', (err) => {
					rej(err)
				})
			}
		})
	}

	sendPhotoUrl(pathToFile = null, chat_id = null, caption = null, message_id = null, callback){
		axios.post(`${this.base}/sendPhoto?photo=${pathToFile}&chat_id=${chat_id}&caption=${caption}&reply_to_message_id=${message_id}`)
		.then(resp => {
			callback(null, resp.data)
		})
		.then(err => {
			callback(err, null)
		})
	}

	sendPhotoLocal(pathToFile = null, chat_id = null, caption = "null", message_id = "null", callback){
		const formData = new FormData();
		const file = fs.createReadStream(pathToFile);
		formData.append('photo', file);
		formData.append("chat_id", chat_id);
		formData.append('caption', caption);
		formData.append("reply_to_message_id", message_id)
		axios.post(`${this.base}/sendPhoto`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		})
		.then((response) => {
			callback(null, response.data)
		})
		.catch((error) => {
			callback(error, null);
		});

	}
}

module.exports = {
	BaleSession,
}

