'use strict';

//  Inputs, Checkboxes, Radios, Messages

const mtbChk = document.querySelector('#mtb-chk');
const kidChk = document.querySelector('#kid-chk');
const roadChk = document.querySelector('#road-chk');
const gravelChk = document.querySelector('#gravel-chk');
const mtbCount = document.querySelector('#mtb-count');
const kidCount = document.querySelector('#kid-count');
const roadCount = document.querySelector('#road-count');
const gravelCount = document.querySelector('#gravel-count');
const holder0 = document.querySelector('#bikeholder-0');
const holder1 = document.querySelector('#bikeholder-1');
const holder2 = document.querySelector('#bikeholder-2');
const timeSelect = document.querySelector('#time-select');
const priceOffer = document.querySelector('#price-offer');
const resultPrice = document.querySelector('#result-price');
const resultMsg = document.querySelector('#result-message');
const emailInput = document.querySelector('#email-input');

//  Ceny a pomocné

const mtbPrice = 540;
document.querySelector('#mtb-price').textContent = mtbPrice;
const kidPrice = 250;
document.querySelector('#kid-price').textContent = kidPrice;
const roadPrice = 720;
document.querySelector('#road-price').textContent = roadPrice;
const gravelPrice = 837;
document.querySelector('#gravel-price').textContent = gravelPrice;
const bikeTypes = [mtbChk, kidChk, roadChk, gravelChk];
let result = 0;

// Reset formuláře

const resetForm = () => {
    mtbChk.checked = false;
    kidChk.checked = false;
    roadChk.checked = false;
    gravelChk.checked = false;
    mtbCount.value = 0;
    mtbCount.disabled = true;
    kidCount.value = 0;
    kidCount.disabled = true;
    roadCount.value = 0;
    roadCount.disabled = true;
    gravelCount.value = 0;
    gravelCount.disabled = true;
    holder0.checked = false;
    holder1.checked = false;
    holder2.checked = true;
    timeSelect.value = 1;
    priceOffer.value = 0;
    resultPrice.textContent = 0;
    resultMsg.textContent = "Klikněte na tlačítko Vypočti";
    emailInput.value = "";
}
resetForm()

//  De/Aktivace a nulování inputboxů pro typ kola

///  Využití smyčky pro přiřazení eventListeneru 'change' na všechny checkboxy, které jsou předtím umístěny do pole
for (let i = 0; i < bikeTypes.length; i++) {
    bikeTypes[i].addEventListener('change', function (event) {
        if (document.querySelector(`#${event.target.getAttribute('name')}-chk`).checked) {
            document.querySelector(`#${event.target.getAttribute('name')}-count`).disabled = false
        } else {
            document.querySelector(`#${event.target.getAttribute('name')}-count`).disabled = true;
            document.querySelector(`#${event.target.getAttribute('name')}-count`).value = 0;
        }
    })
};

// Výpočet celkové ceny zápůjčky

const priceCalculation = () => {
    //  Za každý typ kola se vynásobí cena typu kola se zadaným počtem kusů
    result = (Number(mtbCount.value) * mtbPrice) + (Number(kidCount.value) * kidPrice) + (Number(roadCount.value) * roadPrice) + (Number(gravelCount.value) * gravelPrice);

    //  Dočasný výsledek se vynásobí počtem dní ze Select elementu
    result *= timeSelect.value;

    //  Úprava výsledné ceny podle zvoleného cyklonosiče
    if (holder0.checked === true) result = (result * 0.05) + result;
    if (holder1.checked === true) result = (result * 0.1) + result;

    //  Zobrazení výsledné ceny a zprávy o dostupnosti
    resultPrice.textContent = result;
    resultMsg.textContent = priceOffer.value < result ? 'Nemáte na to' : 'Můžete si to dovolit';
};

//  Validace emailu podle přítomnosti zavináče v obsahu inputu

const emailValidate = () => {
    let alertMsg = emailInput.value.includes('@') ? 'Formát emailu je validní' : 'Špatný formát emailu';
    priceCalculation();
    window.alert(`${alertMsg}!  Cena: ${result}kč`);
}

//  Přiřazení eventListeneru na tlačítka

document.querySelector('.btn-sum').addEventListener('click', priceCalculation);
document.querySelector('.btn-send').addEventListener('click', emailValidate);
document.querySelector('.btn-reset').addEventListener('click', resetForm);