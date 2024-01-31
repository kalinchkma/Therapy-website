/** @format */

const fs = require('fs/promises');

async function openFile(path) {
	try {
		const fileHandler = await fs.open(path, 'r');
		console.log(`opened ${path}, file descriptor is ${fileHandler.fd}`);
		const data = await fileHandler.read();
		console.log(data);
		await fs.writeFile('./public/test.png', data.buffer, 'binary');
	} catch (err) {
		console.log(err);
	}
}
(async () => {
	await openFile('./public/images/about_us.jpg');
})();
