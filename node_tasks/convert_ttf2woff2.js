const path = require('../gulp_modules/paths'),
fs = require('fs'),
chalk = require('chalk'),
ttf2woff2 = require('ttf2woff2'),
ttf2woff = require('ttf2woff');

const typeFontsConvert = process.env.FONTS_TYPE;

fs.readdir(path.fonts.dir, async (err, items) => {
    if (err) {
        console.log(err, 'ошибка чтения файла');
    }

    let fontsTtf = false;

    items.forEach(item => {
        const regStr = /.ttf/;

        if (item.match(regStr)) {
            fontsTtf = true;

            const pathToFont = path.fonts.dir + item;
            const input = fs.readFileSync(pathToFont);
            const fontName = item.split('.')[0];

            let typeExt = '';

            switch(typeFontsConvert) {
                case 'WOFF2':
                    typeExt = '.woff2';
                    fs.writeFileSync(`${path.fonts.dir}${fontName}${typeExt}`, ttf2woff2(input));
                    break;
                case 'WOFF':
                    typeExt = '.woff';
                    fs.writeFileSync(`${path.fonts.dir}${fontName}${typeExt}`, ttf2woff(input));
                    console.log('WOFF CONVERT');
                    break;
            }

            fs.appendFileSync(path.fonts.style, `@include font-face("${fontName}", "${fontName}", 400, "normal", "${typeExt.split('.')[1]}");\r\n`, err => {
                if (err) {
                    console.log(err, 'Ошибка записи файла!');
                    return;
                }
            });

            fs.unlinkSync(pathToFont, (err) => {
                if (err) {
                    console.log(err,  `ошибка при удалении шрифта ${item}`);
                    return;
                }
            });

            console.log(chalk `
                {bold {underline Шрифт удален:} {red ${item}}}
                {bold {underline Шрифт добавлен:} {green ${fontName}${typeExt}}
                ----------------------------------------------------------------------------------
                {bgYellow.black Отредактируйте информацию в файле: "${path.fonts.style}" {red !} }}
                ----------------------------------------------------------------------------------
            `);

        }
    });

    if (!fontsTtf) {
        console.log(chalk `
                {bold
                    -------------------------
                    {underline {green Шрифтов .ttf не найдено! }}
                    -------------------------
                }
            `);
    }
});