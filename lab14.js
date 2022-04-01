const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const freqs = [
    ['о', 0.10983], ['е', 0.08483], ['а', 0.07998], ['и', 0.07367], ['н', 0.067], ['т', 0.06318],
    ['с', 0.05473], ['р', 0.04746], ['в', 0.04533], ['л', 0.04343], ['к', 0.03486], ['м', 0.03203],
    ['д', 0.02977], ['п', 0.02804], ['у', 0.02615], ['я', 0.02001], ['ы', 0.01898], ['ь', 0.01735],
    ['г', 0.01687], ['з', 0.01641], ['б', 0.01592], ['ч', 0.0145], ['й', 0.01208], ['х', 0.00966],
    ['ж', 0.0094], ['ш', 0.00718], ['ю', 0.00639], ['ц', 0.00486], ['щ', 0.00361], ['э', 0.00331],
    ['ф', 0.00267], ['ъ', 0.00037], ['ё', 0.00013]
];
const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

/**
 Г хсуяъж бав бвъ улцщхц у хцвцуяп гдарэ гдаэт г бвътъдаы ь яцюе хагьаы: «Хцв. Юаващауьс». Ъ уад ахясшхм гъэнямы уцдцв баусэъэ гдаэт, ъ хагьс всгьаэаэсгн.

 У чыущдысж бучфд Ъцнльщчауи лчычксфиъе чанце чъцчкиынфецч. Кдхдфи к уфиъън шчфд с чуци, шчкнъсфи цчкдн бычщд, щиъъыиксфи к буиэию уцслс с ьанйцдн шчъчйсз.

 Мпьж мпвпы шкхкшюшп люоюдкй ювуэпцжшубк ьщьэкмцйцк ыкьъуькшуп юыщхщм, ткъщцшйцк хцкььшёф сюышкц, шкоъуьёмкцк эпэыкоу… Ок экх у юьшюцк шк хуъп эпэыкощх.

 Стыуш писнщям мяыич. Яытр цяшюцщям ын яьщыдт. Ц яьщытеыит хнчецшц эюирнщц аба ц анъ, ытшьаьюит снфт эюманщцяй п ншшбюнаыь юняеуяныыьч оьюьст Стсн Ъьюьхн.

 Фбыш яюбьювафвл эп ъпавг, вю ьюцэю гсшуфвл эп эфщ уфбовъш, п ьюцфв рквл, ш бювэш апчэке Ьюаючюсюъ. Сюв ш аюуюспо уфафсэо Уфуп Ьюаючп б эфчпяпьовэке сафьхэ эпчкспыпбл Ьюаючюсъющ.
 */

rl.question('Введите текст:\n', (txt) => {
    txt = txt.toLowerCase();

    rl.question('Введите сдвиг:\n ', (shift) => {
        console.log('Зашифрованное: ', caesarShift(txt, parseInt(shift)));

        rl.question('Введите зафишрованный текст:\n', (encoded) => {
            rl.close()
            console.log('Расшифрованное: ', caesarDecode(encoded.toLowerCase()));
        })
    })
});

const caesarShift = function (txt, shift) {
    let res = "";

    for (let i = 0; i < txt.length; i++) {
        let c = txt[i];
        if (c.match(/[а-яА-ЯёЁ]/)) c = alphabet[(alphabet.indexOf(c) + shift)%33];
        res += c;
    }

    return res;
};

const caesarDecode = function (txt) {
    let alph = [];
    const N = txt.length;
    for (let i = 0; i < N; i++) {
        let c = txt[i];
        if (c.match(/[а-яА-ЯёЁ]/)) {
            if (alph[c]) alph[c]++;
            else alph[c] = 1;
        }
    }
    for (let k in alph) {
        alph[k] /= N;
    }

    let entries = Object.entries(alph);
    entries.sort((a, b) => a[0] - b[0]);

    let mdif = calculateDif(entries, 0);
    let mshift = 0;
    for (let shift = 1; shift <= 32; shift++) {
        let dif = calculateDif(entries, shift);
        if (dif < mdif) {
            mdif = dif;
            mshift = shift;
        }
    }

    let res = '';
    for (let i = 0; i < N; i++) {
        let c = txt[i];
        if (c.match(/[а-яА-ЯёЁ]/)) c = alphabet[(alphabet.indexOf(c)+mshift)%33]
        res += c;
    }

    return res;
}

const calculateDif = function (entries, shift) {
    let min = 0;
    for (let i = 0; i < 33; i++) {
        let f1 = freqs.filter(a => a[0] === alphabet[(i+shift)%33])[0][1];
        let f2 = entries.filter(a => a[0] === alphabet[i])[0];
        if (f2 === undefined) f2 = 0; else f2 = f2[1];
        min += Math.abs(f1-f2);
    }

    return min;
}