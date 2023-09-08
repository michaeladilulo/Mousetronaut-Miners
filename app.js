const mousetronautMiners = {
    resources: {
        count: 0,
        totalCollected: 0
    },

    gameUpgrades: {
        knives: {
            purchasePrice: 5,
            clickModifier: 7,
            activated: false,
            count: 0,
            multiplier: 0
        },
        carts: {
            purchasePrice: 15,
            clickModifier: 12,
            activated: false,
            count: 0,
            multiplier: 0
        },
        mousetronauts: {
            purchasePrice: 50,
            autoModifier: 80,
            activated: false,
            count: 0,
            mouseMultiplier: 0
        },
        graters: {
            purchasePrice: 500,
            autoModifier: 150,
            activated: false,
            count: 0,
            graterMultiplier: 0
        }
    },

    achievements: {
        count: 0,
        unlocked: false
    }
}

const totalCheeseCount = document.querySelector('.cheese-count');
const clickToGenerateCheeseResource = document.getElementById('cheeseResource');
const allResourceUpgradeButtons = document.querySelectorAll('button');
const knifeUpgradeButton = document.querySelector('.cheese-knife-upgrade-btn');
const cartUpgradeButton = document.querySelector('.cheese-cart-upgrade-btn');
const mousetronautUpgradeButton = document.querySelector('.cheese-mousetronaut-upgrade-btn');
const graterUpgradeButton = document.querySelector('.cheese-grater-upgrade-btn');
let knifeUpgradeCount = document.querySelector('.number-of-knife-resources');
let cartUpgradeCount = document.querySelector('.number-of-cart-resources');
const maxMouseAutoUpgradeCount = document.querySelector('.mouse-max-auto-upgrade');
const maxGraterAutoUpgradeCount = document.querySelector('.grater-max-auto-upgrade');
const knifeModifierDisplay = document.querySelector('.knife-plus-cheese-modifier');
const cartModifierDisplay = document.querySelector('.cart-plus-cheese-modifier');
const mouseModifierDisplay = document.querySelector('.mouse-plus-cheese-modifier');
const graterModifierDisplay = document.querySelector('.grater-plus-cheese-modifier');
const totalCheeseMultiplierDisplay = document.querySelector('.cheese-stat-tcm-count');
const knifePurchasePriceDisplay = document.querySelector('.knife-purchase-price-display');
const cartPurchasePriceDisplay = document.querySelector('.cart-purchase-price-display');
const mousePurchasePriceDisplay = document.querySelector('.mouse-purchase-price-display');
const graterPurchasePriceDisplay = document.querySelector('.grater-purchase-price-display');
let totalCheeseCountCollectedDisplay = document.querySelector('.total-cheese-count-collected');
const achievementDisplay = document.querySelector('.achievement-display');
const achievementDisplaySection = document.querySelector('.achievement-display-section');

disableButtonsAtStart();
disableMaxAutoUpgrades();
hideIconsPerClickUpgrade();

clickToGenerateCheeseResource.addEventListener('click', () => {
mineCheese();
});

knifeUpgradeButton.addEventListener('click', () => {
    purchaseClickUpgrade(knives);
})

cartUpgradeButton.addEventListener('click', () => {
    purchaseClickUpgrade(carts);
})

mousetronautUpgradeButton.addEventListener('click', () => {
    purchaseCheeseMousetronautUpgrade();
})

graterUpgradeButton.addEventListener('click', () => {
    purchaseGraterUpgrade();
})

function mineCheese() {
    mousetronautMiners.resources.totalCollected++;
    mousetronautMiners.resources.totalCollected = mousetronautMiners.resources.totalCollected += (mousetronautMiners.gameUpgrades.knives.clickModifier * mousetronautMiners.gameUpgrades.knives.count) + (mousetronautMiners.gameUpgrades.carts.clickModifier * mousetronautMiners.gameUpgrades.carts.count) + (mousetronautMiners.gameUpgrades.mousetronauts.autoModifier * mousetronautMiners.gameUpgrades.mousetronauts.count) + (mousetronautMiners.gameUpgrades.graters.autoModifier * mousetronautMiners.gameUpgrades.graters.count);
    totalCheeseCountCollectedDisplay.innerHTML = mousetronautMiners.resources.totalCollected;
    mousetronautMiners.resources.count++;
    mousetronautMiners.resources.count = mousetronautMiners.resources.count += (mousetronautMiners.gameUpgrades.knives.clickModifier * mousetronautMiners.gameUpgrades.knives.count) + (mousetronautMiners.gameUpgrades.carts.clickModifier * mousetronautMiners.gameUpgrades.carts.count) + (mousetronautMiners.gameUpgrades.mousetronauts.autoModifier * mousetronautMiners.gameUpgrades.mousetronauts.count) + (mousetronautMiners.gameUpgrades.graters.autoModifier * mousetronautMiners.gameUpgrades.graters.count);
    totalCheeseCount.innerHTML = mousetronautMiners.resources.count;
    enableButtonsForUpgrades();
    isKnifeActivated();
    isCartActivated();
    isMousetronautActivated();
    isGraterActivated();
    enableAchievements();
}

function mousetronautDeactivated() {
    if(mousetronautMiners.gameUpgrades.mousetronauts.count > 0) {
        mousetronautUpgradeButton.disabled = true;
    }
}

function graterDeactivated() {
    if(mousetronautMiners.gameUpgrades.graters.count > 0) {
        graterUpgradeButton.disabled = true;
    }
}

function disableButtonsAtStart() {
    for(upgrade of allResourceUpgradeButtons) {
        upgrade.disabled = true;
    }
}

let knives = mousetronautMiners.gameUpgrades.knives;
let carts = mousetronautMiners.gameUpgrades.carts;
let mousetronauts = mousetronautMiners.gameUpgrades.mousetronauts;
let graters = mousetronautMiners.gameUpgrades.graters;


function purchaseClickUpgrade(upgrade) {
    upgrade.count++;
    upgrade.activated = true;
    mousetronautMiners.resources.count = mousetronautMiners.resources.count -= upgrade.purchasePrice;
    totalCheeseCount.innerHTML = mousetronautMiners.resources.count;
    displayNumberOfResources();
    upgrade.purchasePrice = upgrade.purchasePrice *= Math.floor((upgrade.count / 2) + 1);
    upgrade.clickModifier = Math.floor(upgrade.count * upgrade.clickModifier / 2.25);
    notEnoughCheeseForClickResources();
    notEnoughCheeseForAutoResources();
    upgrade.multiplier = (upgrade.clickModifier * upgrade.count) + upgrade.clickModifier;
    totalCheeseMultiplierDisplay.innerHTML = mousetronautMiners.gameUpgrades.knives.multiplier + mousetronautMiners.gameUpgrades.carts.multiplier + mousetronautMiners.gameUpgrades.mousetronauts.mouseMultiplier + mousetronautMiners.gameUpgrades.graters.graterMultiplier;
    changeIconsToUpgradeCount();
    if(upgrade === knives) {
        knifePurchasePriceDisplay.innerHTML = upgrade.purchasePrice;
    }
    if(upgrade === carts) {
        cartPurchasePriceDisplay.innerHTML = upgrade.purchasePrice;
    }
   
    return upgrade.multiplier;
}

function purchaseCheeseMousetronautUpgrade() {
    mousetronautMiners.gameUpgrades.mousetronauts.count++;
    mousetronautDeactivated();
    mousetronautMiners.gameUpgrades.mousetronauts.activated = true;
    mousetronautMiners.resources.count = mousetronautMiners.resources.count -= mousetronautMiners.gameUpgrades.mousetronauts.purchasePrice;
    totalCheeseCount.innerHTML = mousetronautMiners.resources.count;
    notEnoughCheeseForClickResources();
    notEnoughCheeseForAutoResources();
    setInterval(autoMouseUpgradeModifier, 5000)
    maxMouseAutoUpgradeCount.classList.remove('hide-upgrade-text-icons')
    maxMouseAutoUpgradeCount.classList.add('max-auto-upgrade')
    mousetronautMiners.gameUpgrades.mousetronauts.autoModifier = (mousetronautMiners.gameUpgrades.mousetronauts.count * mousetronautMiners.gameUpgrades.mousetronauts.autoModifier);
    mousetronautMiners.gameUpgrades.mousetronauts.mouseMultiplier = (mousetronautMiners.gameUpgrades.mousetronauts.autoModifier * mousetronautMiners.gameUpgrades.mousetronauts.count);
    totalCheeseMultiplierDisplay.innerHTML = mousetronautMiners.gameUpgrades.knives.knifeMultiplier + mousetronautMiners.gameUpgrades.carts.cartMultiplier + mousetronautMiners.gameUpgrades.mousetronauts.mouseMultiplier + mousetronautMiners.gameUpgrades.graters.graterMultiplier;
    mousePurchasePriceDisplay.innerHTML = mousetronautMiners.gameUpgrades.mousetronauts.purchasePrice
    return mousetronautMiners.gameUpgrades.mousetronauts.mouseMultiplier;
}

function purchaseGraterUpgrade() {
    mousetronautMiners.gameUpgrades.graters.count++;
    graterDeactivated();
    mousetronautMiners.gameUpgrades.graters.activated = true;
    mousetronautMiners.resources.count = mousetronautMiners.resources.count -= mousetronautMiners.gameUpgrades.graters.purchasePrice;
    totalCheeseCount.innerHTML = mousetronautMiners.resources.count;
    notEnoughCheeseForClickResources();
    notEnoughCheeseForAutoResources();
    setInterval(autoGraterUpgradeModifier, 3000);
    maxGraterAutoUpgradeCount.classList.remove('hide-upgrade-text-icons')
    maxGraterAutoUpgradeCount.classList.add('max-auto-upgrade')
    mousetronautMiners.gameUpgrades.graters.autoModifier = (mousetronautMiners.gameUpgrades.graters.count * mousetronautMiners.gameUpgrades.graters.autoModifier);
    mousetronautMiners.gameUpgrades.graters.graterMultiplier = (mousetronautMiners.gameUpgrades.graters.autoModifier * mousetronautMiners.gameUpgrades.graters.count);
    totalCheeseMultiplierDisplay.innerHTML = mousetronautMiners.gameUpgrades.knives.knifeMultiplier + mousetronautMiners.gameUpgrades.carts.cartMultiplier + mousetronautMiners.gameUpgrades.mousetronauts.mouseMultiplier + mousetronautMiners.gameUpgrades.graters.graterMultiplier;
    return mousetronautMiners.gameUpgrades.graters.graterMultiplier;
}



//NOTE - NEW FUNCTION TO TRY OUT WITH REFACTOR
function calculateTotalResourceCollected() {
    return totalCheeseMultiplierDisplay.innerHTML = mousetronautMiners.gameUpgrades.knives.knifeMultiplier + mousetronautMiners.gameUpgrades.carts.cartMultiplier + mousetronautMiners.gameUpgrades.mousetronauts.mouseMultiplier + mousetronautMiners.gameUpgrades.graters.graterMultiplier;
}

function enableButtonsForUpgrades() {
    if(mousetronautMiners.resources.count >= mousetronautMiners.gameUpgrades.knives.purchasePrice) {
        knifeUpgradeButton.disabled = false;
    }
    if(mousetronautMiners.resources.count >= mousetronautMiners.gameUpgrades.carts.purchasePrice) {
        cartUpgradeButton.disabled = false;
    }
    if(mousetronautMiners.resources.count >= mousetronautMiners.gameUpgrades.mousetronauts.purchasePrice && mousetronautMiners.gameUpgrades.mousetronauts.count === 0) {
        mousetronautUpgradeButton.disabled = false;
    }
    if(mousetronautMiners.resources.count >= mousetronautMiners.gameUpgrades.graters.purchasePrice && mousetronautMiners.gameUpgrades.graters.count === 0) {
        graterUpgradeButton.disabled = false;
    }
}

function isKnifeActivated() {
    if(mousetronautMiners.gameUpgrades.knives.activated) {
        mousetronautMiners.resources.count = mousetronautMiners.resources.count += mousetronautMiners.gameUpgrades.knives.clickModifier;
        totalCheeseCount.innerHTML = mousetronautMiners.resources.count;
    }
    return mousetronautMiners.resources.count;
}

function isCartActivated() {
    if(mousetronautMiners.gameUpgrades.carts.activated) {
        mousetronautMiners.resources.count = mousetronautMiners.resources.count += mousetronautMiners.gameUpgrades.carts.clickModifier;
        totalCheeseCount.innerHTML = mousetronautMiners.resources.count;
    }
    return mousetronautMiners.resources.count;
}

function isMousetronautActivated() {
    if(mousetronautMiners.gameUpgrades.mousetronauts.activated) {
        mousetronautMiners.resources.count = mousetronautMiners.resources.count += mousetronautMiners.gameUpgrades.mousetronauts.autoModifier;
        totalCheeseCount.innerHTML = mousetronautMiners.resources.count;
        mousePurchasePriceDisplay.innerHTML = 'MAX PURCHASED';
    }
    return mousetronautMiners.resources.count;
}

function isGraterActivated() {
    if(mousetronautMiners.gameUpgrades.graters.activated) {
        mousetronautMiners.resources.count = mousetronautMiners.resources.count += mousetronautMiners.gameUpgrades.graters.autoModifier;
        totalCheeseCount.innerHTML = mousetronautMiners.resources.count;
        graterPurchasePriceDisplay.innerHTML = 'MAX PURCHASED';
    }
    return mousetronautMiners.resources.count;
}

function notEnoughCheeseForClickResources() {
    if(mousetronautMiners.resources.count < mousetronautMiners.gameUpgrades.knives.purchasePrice) {
        knifeUpgradeButton.disabled = true;
    }
    if(mousetronautMiners.resources.count < mousetronautMiners.gameUpgrades.carts.purchasePrice) {
        cartUpgradeButton.disabled = true;
    }
}

function notEnoughCheeseForAutoResources() {
    if(mousetronautMiners.resources.count < mousetronautMiners.gameUpgrades.mousetronauts.purchasePrice) {
        mousetronautUpgradeButton.disabled = true;
    }
    if(mousetronautMiners.resources.count < mousetronautMiners.gameUpgrades.graters.purchasePrice) {
        graterUpgradeButton.disabled = true;
    }
}

function autoMouseUpgradeModifier() {
    totalCheeseCount.innerHTML = mousetronautMiners.resources.count += mousetronautMiners.gameUpgrades.mousetronauts.autoModifier;
    enableButtonsForUpgrades();
}

function autoGraterUpgradeModifier() {
    totalCheeseCount.innerHTML = mousetronautMiners.resources.count += mousetronautMiners.gameUpgrades.graters.autoModifier;
    enableButtonsForUpgrades();
}

function disableMaxAutoUpgrades() {
    if(mousetronautMiners.gameUpgrades.mousetronauts.count === 0) {
        maxMouseAutoUpgradeCount.classList.add('hide-upgrade-text-icons');
    }
    if(mousetronautMiners.gameUpgrades.graters.count === 0) {
        maxGraterAutoUpgradeCount.classList.add('hide-upgrade-text-icons');
    }
}

function hideIconsPerClickUpgrade() {
    if(mousetronautMiners.gameUpgrades.knives.count === 0) {
        knifeUpgradeCount.classList.add('hide-upgrade-text-icons');
    }

    if(mousetronautMiners.gameUpgrades.carts.count === 0) {
        cartUpgradeCount.classList.add('hide-upgrade-text-icons');
    }
}

function displayNumberOfResources() {
    if(mousetronautMiners.gameUpgrades.knives.count >= 1) {
        knifeUpgradeCount.classList.remove('hide-upgrade-text-icons');
        knifeUpgradeCount.innerHTML = `${'<i class="fa-solid fa-pen-nib"></i>'}`.repeat(mousetronautMiners.gameUpgrades.knives.count);
    }
    if(mousetronautMiners.gameUpgrades.carts.count >= 1) {
        cartUpgradeCount.classList.remove('hide-upgrade-text-icons');
        cartUpgradeCount.innerHTML = `${'<i class="fa-solid fa-cart-shopping"></i>'}`.repeat(mousetronautMiners.gameUpgrades.carts.count);
    }
}

function changeIconsToUpgradeCount() {
    if(mousetronautMiners.gameUpgrades.knives.count >= 11) {
        knifeUpgradeCount.innerHTML = mousetronautMiners.gameUpgrades.knives.count;
    }
    if(mousetronautMiners.gameUpgrades.carts.count >= 11) {
        cartUpgradeCount.innerHTML = mousetronautMiners.gameUpgrades.carts.count;
    }
}


// Achievements

function enableAchievements() {
    mousetronautMiners.achievements.unlocked;
    if(mousetronautMiners.resources.totalCollected >= 100) {
        mousetronautMiners.achievements.unlocked = true;
        mousetronautMiners.achievements.count++;
        if(mousetronautMiners.achievements.count === 1) {
            mousetronautMiners.achievements.unlocked = true;
            achievementDisplay.disabled = false;
            achievementDisplay.classList.add('achievement-accomplished')
            getColor();
            getRandomColor();
            achievementBody.style.backgroundColor = getColor() || getRandomColor();
            achievementWrapper.classList.remove("animation");
            setTimeout(() => achievementWrapper.classList.add("animation"), 200);
        }
    }
}

var achievementBody = document.querySelector(".achievement-body");
var achievementWrapper = document.querySelector(".achievement-wrapper");

var btn = document.getElementById("btn");

var COLORS = ["#2196F3", "#A791D4", "#FC7A50", "#5AB65D", "#03A9F4"];

function getColor() {
  var index = Math.floor(Math.random() * 6);

  return COLORS[index];
}

function getRandomColor() {
  var lum = -0.25;
  var hex = String(
    "#" +
      Math.random()
        .toString(16)
        .slice(2, 8)
        .toUpperCase()
  ).replace(/[^0-9a-f]/gi, "");
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  var rgb = "#",
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }
  return rgb;
}