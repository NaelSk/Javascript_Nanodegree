// Fetch data from local file & Create Dino Objects
//const url = 'https://github.com/NaelSk/Javascript_Nanodegree/blob/main/Javascript-master/dino.json'
//const dino2 = readTextFile(url);


const dino = {
    "Dinos": [
    {
        "species": "Triceratops",
        "weight": 13000,
        "height": 114,
        "diet": "herbavor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "First discovered in 1889 by Othniel Charles Marsh"
    },
    {
        "species": "Tyrannosaurus Rex",
        "weight": 11905,
        "height": 144,
        "diet": "carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "The largest known skull measures in at 5 feet long."
    },
    {
        "species": "Anklyosaurus",
        "weight": 10500,
        "height": 55,
        "diet": "herbavor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Anklyosaurus survived for approximately 135 million years."
    },
    {
        "species": "Brachiosaurus",
        "weight": 70000,
        "height": "372",
        "diet": "herbavor",
        "where": "North America",
        "when": "Late Jurasic",
        "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
    },
    {
        "species": "Stegosaurus",
        "weight": 11600,
        "height": 79,
        "diet": "herbavor",
        "where": "North America, Europe, Asia",
        "when": "Late Jurasic to Early Cretaceous",
        "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
    },
    {
        "species": "Elasmosaurus",
        "weight": 16000,
        "height": 59,
        "diet": "carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
    },
    {
        "species": "Pteranodon",
        "weight": 44,
        "height": 20,
        "diet": "carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
    },
    {
        "species": "Pigeon",
        "weight": 0.5,
        "height": 9,
        "diet": "herbavor",
        "where": "World Wide",
        "when": "Holocene",
        "fact": "All birds are living dinosaurs."
    }
]
}


const form = document.getElementById('dino-compare');
const button = document.getElementById('btn');
const name = document.getElementById('name')
name.addEventListener('keyup', function (event) {
    isNotValidname = (name=="");

    if (isNotValidname) {
        button.disabled = true;
    } else {
        button.disabled = false;
        // On button click, prepare and display infographic
        button.addEventListener('click', display);
    }
});

function display() {

    let human = checkUnitAndConvert(new Human());
    
    var newDinosWithFactList = (dino.Dinos).map(dinoObj => new DinoConstructor(dinoObj));
    newDinosWithFactList = newDinosWithFactList.map(dinoObj => comaperHeight(dinoObj, human));
    newDinosWithFactList = newDinosWithFactList.map(dinoObj => compareWeight(dinoObj, human));
    newDinosWithFactList = newDinosWithFactList.map(dinoObj => compareDiet(dinoObj, human));



    // Generate Tiles for each Dino in Array
    function Tile(x, y, dinoObj) {
        this.dino = dinoObj;
        this.x = x;
        this.y = y;
        this.size = 50;
        this.picPath = ".\\images\\" + (dinoObj.name).replace(" ", "%20")+".png";

    };

    
    //Create the array of tiles at appropriate positions
    var tiles = (function tilePostios() {
        var tiles = [];
        var NUM_COLS = 3;
        var NUM_ROWS = 3;
        let k = 0;
        let m = 0;
        for (var i = 0; i < NUM_COLS; ++i) {

            for (var j = 0; j < NUM_ROWS; ++j) {

                if (k == newDinosWithFactList.length / 2) {

                    tiles.push(new Tile(tileX, tileY, human));
                }
                if (k < newDinosWithFactList.length) {

                    dinoObj = newDinosWithFactList[k]
                    var tileX = i * 54 + 50;
                    var tileY = j * 54 + 50;
                    tiles.push(new Tile(tileX, tileY, dinoObj));
                    k = ++k;
                }
            }
        }
        return tiles;
    }
    )();


    let tilesHTML = '';
    (function fillGrid() {
        tiles.forEach(function (element) {
            tilesHTML += '<div class="grid-item">';//console.log(element);
            let path = element.picPath;
            let selectedFact = "";
            let imgHtmlElemet = "<img src=" + path + '>';
            switch ((element.dino).name) {
                case 'Pigeon':
                    selectedFact = element.dino.fact;
                    break;
                case 'human':
                    selectedFact = element.dino.real_name;
                    break;
                default:
                    selectedFact = getRandomItem(element.dino.ListOfFacts);
            }
            
               
            let fact="<h4>"+selectedFact+"</h4>";
            tilesHTML += imgHtmlElemet;
            tilesHTML += fact;
            tilesHTML += '</div>';
        });    
       
        tilesHTML += '<div id="btn2">'+"Compare Me"+ '</div >';
        grid.innerHTML = tilesHTML;
        
        const newbutton = document.getElementById('btn2');
        // On button click, show new fact
        newbutton.addEventListener('click', display);
        
    })();

    removeFrom();
}
// Create Dino Constructor
function DinoConstructor(obj) {
    this.name = obj.species;
    this.weight = obj.weight;
    this.height = obj.height;
    this.diet = obj.diet;
    this.where = obj.where;
    this.when = obj.when;
    this.fact = obj.fact;
    this.ListOfFacts = [this.fact,
        (this.name).concat(" has lived in ",obj.where, " at ", obj.when, " era.")
    ]
}

// Create Human Object
function  Human(){
    this.name= "human",
    this.real_name= document.getElementById('name').value,
    this.ListOfFacts= [this.real_name],
    this.diet=document.getElementById('diet').value,
    this.weight= {
        amount: parseInt(document.getElementById('weight').value),
        unit: document.getElementById('weightUnit').value

    },
    this.height= {
        amount: parseInt(document.getElementById('hightAmount').value),
        unit: document.getElementById('hightUnit').value
    }

}
 
    // Use IIFE to get human data from form


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function comaperHeight(dinoObj, humanObj) {

    let heightRatio = dinoObj.height / (humanObj.height.amount);
    let newfact = "The height of ".concat(dinoObj.name, " equal ", heightRatio.toFixed(2), " of ", humanObj.real_name, "'s height"); 

    (dinoObj.ListOfFacts).push(newfact);

    return dinoObj
}
    
// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareWeight(dinoObj, humanObj) {

    let weightRatio = dinoObj.weight / (humanObj.weight.amount);
    let newfact = "The weight of ".concat(dinoObj.name, " equal ", weightRatio.toFixed(2), " of ", humanObj.real_name, "'s weight");

    (dinoObj.ListOfFacts).push(newfact);

    return dinoObj

}
    
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareDiet(dinoObj, humanObj) {
    
    if (dinoObj.diet == humanObj.diet) {
        newfact = (humanObj.name).concat(" and ", dinoObj.name , " have the same diet");
    } else {
        newfact = (humanObj.name).concat(" and ", dinoObj.name, " have the different diet");
    }
    (dinoObj.ListOfFacts).push(newfact);
    return dinoObj
}

//convert to inch
function fromMeterToInch(obj) {
    let newValue = obj.height.amount * 39.36;
    obj.height.amount = newValue;
    return (obj);

}
//convert to inch
function fromFeetToInch(obj) {
    let newValue = obj.height.amount * 12;
    obj.height.amount = newValue;
    return (obj);
}

//convert to lb
function fromKgTolb(obj) {
    let newValue = obj.weight.amount * 12;
    obj.weight.amount = newValue;
    return obj;

}

//reform the human
function checkUnitAndConvert(humanObj) {
    let convertedObj;
    switch ((humanObj.height).unit) {
        case "meter":
            convertedObj = fromMeterToInch(humanObj);
            break;
        case "feet":
            convertedObj = fromFeetToInch(humanObj);
            break;
        default:
            convertedObj = humanObj;

    }
    switch ((convertedObj.weight).unit) {
        case "kg":
            convertedObj = fromKgTolb(convertedObj);
            break;
    }
    return convertedObj;
}

  
// Add tiles to DOM

// Remove form from screen
function removeFrom() {
    form.style.display = 'none';
}


//Get random elements from the list
function getRandomItem(ls) {
    let item = ls[Math.floor(Math.random() * ls.length)];
    return item
}