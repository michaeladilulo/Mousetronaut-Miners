let cheeseCount = 0;
let totalCheeseCountCollected = 0;
let isAchievementAchieved = false;
let achievementCount = 0; // TODO

const gameUpgrades = {
    knives: {
        purchasePrice: 5,
        clickModifier: 7,
        activated: false,
        count: 0,
        knifeMultiplier: 0
    },
    carts: {
        purchasePrice: 15,
        clickModifier: 12,
        activated: false,
        count: 0,
        cartMultiplier: 0
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
    },
    achievements: { //TODO
        isCheeseCollected: false
    }
}

let mousetronautPurchasePrice = gameUpgrades.mousetronauts.purchasePrice;
let mousetronautActivated = gameUpgrades.mousetronauts.activated;
let mousetronautAutoModifier = gameUpgrades.mousetronauts.autoModifier;

let graterPurchasePrice = gameUpgrades.graters.purchasePrice;
let graterActivated = gameUpgrades.graters.activated;
let graterAutoModifier = gameUpgrades.graters.autoModifier;

let isCheeseAchievement = gameUpgrades.achievements.isCheeseCollected;

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
    purchaseCheeseKnifeUpgrade();
})

cartUpgradeButton.addEventListener('click', () => {
    purchaseCartUpgrade();
})

mousetronautUpgradeButton.addEventListener('click', () => {
    purchaseCheeseMousetronautUpgrade();
})

graterUpgradeButton.addEventListener('click', () => {
    purchaseGraterUpgrade();
})

function mineCheese() {
    totalCheeseCountCollected++;
    totalCheeseCountCollected = totalCheeseCountCollected += (gameUpgrades.knives.clickModifier * gameUpgrades.knives.count) + (gameUpgrades.carts.clickModifier * gameUpgrades.carts.count) + (mousetronautAutoModifier * gameUpgrades.mousetronauts.count) + (graterAutoModifier * gameUpgrades.graters.count);
    totalCheeseCountCollectedDisplay.innerHTML = totalCheeseCountCollected;
    cheeseCount++;
    cheeseCount = cheeseCount += (gameUpgrades.knives.clickModifier * gameUpgrades.knives.count) + (gameUpgrades.carts.clickModifier * gameUpgrades.carts.count) + (mousetronautAutoModifier * gameUpgrades.mousetronauts.count) + (graterAutoModifier * gameUpgrades.graters.count);
    totalCheeseCount.innerHTML = cheeseCount;
    enableButtonsForUpgrades();
    isKnifeActivated();
    isCartActivated();
    isMousetronautActivated();
    isGraterActivated();
    enableAchievements();
}

function mousetronautDeactivated() {
    if(gameUpgrades.mousetronauts.count > 0) {
        mousetronautUpgradeButton.disabled = true;
    }
}

function graterDeactivated() {
    if(gameUpgrades.graters.count > 0) {
        graterUpgradeButton.disabled = true;
    }
}

function disableButtonsAtStart() {
    for(upgrade of allResourceUpgradeButtons) {
        upgrade.disabled = true;
    }
}

function purchaseCheeseKnifeUpgrade() {
    gameUpgrades.knives.count++;
    gameUpgrades.knives.activated = true;
    cheeseCount = cheeseCount -= gameUpgrades.knives.purchasePrice;
    totalCheeseCount.innerHTML = cheeseCount;
    displayNumberOfResources();
    gameUpgrades.knives.purchasePrice = gameUpgrades.knives.purchasePrice *= Math.floor((gameUpgrades.knives.count / 2) + 1);
    gameUpgrades.knives.clickModifier = Math.floor(gameUpgrades.knives.count * gameUpgrades.knives.clickModifier / 2.25);
    notEnoughCheeseForClickResources();
    notEnoughCheeseForAutoResources();
    gameUpgrades.knives.knifeMultiplier = (gameUpgrades.knives.clickModifier * gameUpgrades.knives.count) + gameUpgrades.knives.clickModifier;
    totalCheeseMultiplierDisplay.innerHTML = gameUpgrades.knives.knifeMultiplier + gameUpgrades.carts.cartMultiplier + gameUpgrades.mousetronauts.mouseMultiplier + gameUpgrades.graters.graterMultiplier;
    changeIconsToUpgradeCount();
    knifePurchasePriceDisplay.innerHTML = gameUpgrades.knives.purchasePrice;
    return gameUpgrades.knives.knifeMultiplier;
}


function purchaseCartUpgrade() {
    gameUpgrades.carts.count++;
    gameUpgrades.carts.activated = true;
    cheeseCount = cheeseCount -= gameUpgrades.carts.purchasePrice;
    totalCheeseCount.innerHTML = cheeseCount;
    displayNumberOfResources();
    gameUpgrades.carts.purchasePrice = gameUpgrades.carts.purchasePrice *= Math.floor((gameUpgrades.carts.count / 2) + 1);
    gameUpgrades.carts.clickModifier = Math.floor(gameUpgrades.carts.count * gameUpgrades.carts.clickModifier / 2.25);
    notEnoughCheeseForClickResources();
    notEnoughCheeseForAutoResources();
    gameUpgrades.carts.cartMultiplier = (gameUpgrades.carts.clickModifier * gameUpgrades.carts.count) + gameUpgrades.carts.clickModifier;
    totalCheeseMultiplierDisplay.innerHTML = gameUpgrades.knives.knifeMultiplier + gameUpgrades.carts.cartMultiplier + gameUpgrades.mousetronauts.mouseMultiplier + gameUpgrades.graters.graterMultiplier;
    changeIconsToUpgradeCount();
    cartPurchasePriceDisplay.innerHTML = gameUpgrades.carts.purchasePrice;
    return gameUpgrades.carts.cartMultiplier;
}

function purchaseCheeseMousetronautUpgrade() {
    gameUpgrades.mousetronauts.count++;
    mousetronautDeactivated();
    mousetronautActivated = true;
    cheeseCount = cheeseCount -= mousetronautPurchasePrice;
    totalCheeseCount.innerHTML = cheeseCount;
    notEnoughCheeseForClickResources();
    notEnoughCheeseForAutoResources();
    setInterval(autoMouseUpgradeModifier, 5000)
    maxMouseAutoUpgradeCount.classList.remove('hide-upgrade-text-icons')
    maxMouseAutoUpgradeCount.classList.add('max-auto-upgrade')
    mousetronautAutoModifier = (gameUpgrades.mousetronauts.count * mousetronautAutoModifier);
    gameUpgrades.mousetronauts.mouseMultiplier = (mousetronautAutoModifier * gameUpgrades.mousetronauts.count);
    totalCheeseMultiplierDisplay.innerHTML = gameUpgrades.knives.knifeMultiplier + gameUpgrades.carts.cartMultiplier + gameUpgrades.mousetronauts.mouseMultiplier + gameUpgrades.graters.graterMultiplier;
    mousePurchasePriceDisplay.innerHTML = mousetronautPurchasePrice
    return gameUpgrades.mousetronauts.mouseMultiplier;
}

function purchaseGraterUpgrade() {
    console.log('clicked')
    gameUpgrades.graters.count++;
    graterDeactivated();
    graterActivated = true;
    cheeseCount = cheeseCount -= graterPurchasePrice;
    totalCheeseCount.innerHTML = cheeseCount;
    notEnoughCheeseForClickResources();
    notEnoughCheeseForAutoResources();
    setInterval(autoGraterUpgradeModifier, 3000);
    maxGraterAutoUpgradeCount.classList.remove('hide-upgrade-text-icons')
    maxGraterAutoUpgradeCount.classList.add('max-auto-upgrade')
    graterAutoModifier = (gameUpgrades.graters.count * graterAutoModifier);
    gameUpgrades.graters.graterMultiplier = (graterAutoModifier * gameUpgrades.graters.count);
    totalCheeseMultiplierDisplay.innerHTML = gameUpgrades.knives.knifeMultiplier + gameUpgrades.carts.cartMultiplier + gameUpgrades.mousetronauts.mouseMultiplier + gameUpgrades.graters.graterMultiplier;
    return gameUpgrades.graters.graterMultiplier;
}



function enableButtonsForUpgrades() {
    if(cheeseCount >= gameUpgrades.knives.purchasePrice) {
        knifeUpgradeButton.disabled = false;
    }
    if(cheeseCount >= gameUpgrades.carts.purchasePrice) {
        cartUpgradeButton.disabled = false;
    }
    if(cheeseCount >= mousetronautPurchasePrice && gameUpgrades.mousetronauts.count === 0) {
        mousetronautUpgradeButton.disabled = false;
    }
    if(cheeseCount >= graterPurchasePrice && gameUpgrades.graters.count === 0) {
        graterUpgradeButton.disabled = false;
    }
}

function isKnifeActivated() {
    if(gameUpgrades.knives.activated) {
        cheeseCount = cheeseCount += gameUpgrades.knives.clickModifier;
        totalCheeseCount.innerHTML = cheeseCount;
    }
    return cheeseCount;
}

function isCartActivated() {
    if(gameUpgrades.carts.activated) {
        cheeseCount = cheeseCount += gameUpgrades.carts.clickModifier;
        totalCheeseCount.innerHTML = cheeseCount;
    }
    return cheeseCount;
}

function isMousetronautActivated() {
    if(mousetronautActivated) {
        cheeseCount = cheeseCount += mousetronautAutoModifier;
        totalCheeseCount.innerHTML = cheeseCount;
        mousePurchasePriceDisplay.innerHTML = 'MAX PURCHASED';
    }
    return cheeseCount;
}

function isGraterActivated() {
    if(graterActivated) {
        cheeseCount = cheeseCount += graterAutoModifier;
        totalCheeseCount.innerHTML = cheeseCount;
        graterPurchasePriceDisplay.innerHTML = 'MAX PURCHASED';
    }
    return cheeseCount;
}

function notEnoughCheeseForClickResources() {
    if(cheeseCount < gameUpgrades.knives.purchasePrice) {
        knifeUpgradeButton.disabled = true;
    }
    if(cheeseCount < gameUpgrades.carts.purchasePrice) {
        cartUpgradeButton.disabled = true;
    }
}

function notEnoughCheeseForAutoResources() {
    if(cheeseCount < mousetronautPurchasePrice) {
        mousetronautUpgradeButton.disabled = true;
    }
    if(cheeseCount < graterPurchasePrice) {
        graterUpgradeButton.disabled = true;
    }
}

function autoMouseUpgradeModifier() {
    totalCheeseCount.innerHTML = cheeseCount += mousetronautAutoModifier;
    enableButtonsForUpgrades();
}

function autoGraterUpgradeModifier() {
    totalCheeseCount.innerHTML = cheeseCount += graterAutoModifier;
    enableButtonsForUpgrades();
}

function disableMaxAutoUpgrades() {
    if(gameUpgrades.mousetronauts.count === 0) {
        maxMouseAutoUpgradeCount.classList.add('hide-upgrade-text-icons');
    }
    if(gameUpgrades.graters.count === 0) {
        maxGraterAutoUpgradeCount.classList.add('hide-upgrade-text-icons');
    }
}

function hideIconsPerClickUpgrade() {
    if(gameUpgrades.knives.count === 0) {
        knifeUpgradeCount.classList.add('hide-upgrade-text-icons');
    }

    if(gameUpgrades.carts.count === 0) {
        cartUpgradeCount.classList.add('hide-upgrade-text-icons');
    }
}

function displayNumberOfResources() {
    if(gameUpgrades.knives.count >= 1) {
        knifeUpgradeCount.classList.remove('hide-upgrade-text-icons');
        knifeUpgradeCount.innerHTML = `${'<i class="fa-solid fa-pen-nib"></i>'}`.repeat(gameUpgrades.knives.count);
    }
    if(gameUpgrades.carts.count >= 1) {
        cartUpgradeCount.classList.remove('hide-upgrade-text-icons');
        cartUpgradeCount.innerHTML = `${'<i class="fa-solid fa-cart-shopping"></i>'}`.repeat(gameUpgrades.carts.count);
    }
}

function changeIconsToUpgradeCount() {
    if(gameUpgrades.knives.count >= 11) {
        knifeUpgradeCount.innerHTML = gameUpgrades.knives.count;
    }
    if(gameUpgrades.carts.count >= 11) {
        cartUpgradeCount.innerHTML = gameUpgrades.carts.count;
    }
}


// Achievements

function enableAchievements() {
    isAchievementAchieved;
    console.log('made it here')
    if(totalCheeseCountCollected >= 100) {
        isAchievementAchieved = true;
        achievementCount++;
        if(achievementCount === 1) {
            isAchievementAchieved = true;
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