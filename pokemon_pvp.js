
var PK_NAME = "Bunnelby"; // Pokemon name, get from Filter Modal
var IV_ATT = 4;
var IV_DE = 14;
var IV_HP = 5;
var CONFIG_LV = 25;
var TIME_SCAN = 1; // Minutes
var RUN = true;

async function getPokemonPvP() {
    $("a.leaflet-control-zoom-out")[0].click();
    await new Promise(r => setTimeout(r, 200));
    $("#close_donation_button a").click();
    $("#filter_link").click();
   
    await new Promise(r => setTimeout(r, 200));
    $("#deselect_all_btn").click();
    await new Promise(r => setTimeout(r, 200));
    $("#min_iv").val("20");

    let list = $("div.filter_checkbox label");
    for (let item of list) {
        let el = item.childNodes[1];
        if (typeof el !== 'undefined' && el.nodeValue.trim() === PK_NAME) {
            item.click();
        }
    }
    $("#save_iv_button").click();
    await new Promise(r => setTimeout(r, 500));
    $("#close img").click();

    while (RUN) {
        let list = $('.leaflet-zoom-animated.leaflet-interactive');
        for (let item of list) {
            try {
                item.click();
                await new Promise(r => setTimeout(r, 300));

                let modal = $('div.leaflet-popup-content').text();
                if (modal == '') continue;

                let data = $('div.leaflet-popup-content').text().match(/IV: (.*)\((.*)%/);
                if (data == null) continue;
                data = data[1];

                let level = modal.match(/Level: (.*)\)\d+/);
                if (level == null) continue;
                level = Number(level[1]);

                let arrayIV = data.split("(")[0].split("|");
                let attack = Number(arrayIV[0]);
                let defense = Number(arrayIV[1]);
                let hp = Number(arrayIV[2]);

                if (level <= CONFIG_LV && attack == IV_ATT && defense == IV_DE && hp == IV_HP) {
                    let pokemonName = $($('div.leaflet-popup-content b')[0]).text();
                    console.log(`${pokemonName}`);

                    let link = $($('div.leaflet-popup-content a')[1]).attr('href');
                    console.log(`link: ${link}`);
                    let coordinate = link.split("=")[1];

                    console.log(`coordinate: ${coordinate}`);
                }
            } catch (ex) {
                continue;
            }
        }
        await new Promise(r => setTimeout(r, TIME_SCAN * 60 * 1000));
    }
}
await getPokemonPvP();
