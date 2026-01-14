// creating variables and importing libraries
let axios = require('axios');
let cheerio = require('cheerio');
const fs = require('fs');
const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');


async function miScrapper() {

    const rl = readline.createInterface({ input, output });
    try {
        // ask the user for url
        const url = await rl.question('Copy & paste URL : ');
        //ask the user to select an element
        const element = await rl.question('Select an html element for the search: ');
        // request is done
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        // cargamos html en cheerio
        const $ = cheerio.load(data);

        const selectelement = $(element).text().trim();

        console.log(`${element} found = \n ${selectelement} \n`);
    } catch (error) {
        console.error('\nERROR:', error.message);
    } finally {
        rl.close();
    }

}
miScrapper();