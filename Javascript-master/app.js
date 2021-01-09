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

const button = document.getElementById('btn');
button.addEventListener('click', display);
function display() {
    // Create Human Object
    var  human = {
        name: document.getElementById('name').value,
        diet: document.getElementById('diet').value,
        weight: {
            amount: parseInt(document.getElementById('weight').value),
            unit: document.getElementById('weightUnit').value  

        } ,
        height: {
            amount: parseInt(document.getElementById('hightAmount').value),
            unit: document.getElementById('hightUnit').value
        }
    }
    var newDinosWithFactList = (dino.Dinos).map(dinoObj => new DinoConstructor(dinoObj));
    console.log(newDinosWithFactList);
    newDinosWithFactList = newDinosWithFactList.map(dinoObj => comaperHeight(dinoObj, human));
    newDinosWithFactList = newDinosWithFactList.map(dinoObj => compareWeight(dinoObj, human));
    newDinosWithFactList = newDinosWithFactList.map(dinoObj => compareDiet(dinoObj, human));
    
  

    // Generate Tiles for each Dino in Array
    function Tile(x, y, dinoObj) {
        this.dino = dinoObj;
        this.x = x;
        this.y = y;
        this.size = 50;
        this.picPath = "./image/".concat(dinoObj.name);
        
    };

    Tile.prototype.draw = function () {
        fill(214, 247, 202);
        strokeWeight(2);
        rect(this.x, this.y, this.size, this.size, 10);
        image(getImage(this.picPath),
            this.x, this.y, this.size, this.size);
    };

    //Create the array of tiles at appropriate positions
    var tiles=(function tilePostios() {
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
                   
                   dinoObj=newDinosWithFactList[k]
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


    //Start by drawing them all face down
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].draw();
    }
    console.log(tiles);// remove later

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
        (this.name).concat(" Had lived in ",obj.where, " in ", obj.when, " era.")
    ]


}
 
    // Use IIFE to get human data from form


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function comaperHeight(dinoObj, humanObj) {
    let humanInfo = humanObj.height;
    
    
    if (humanInfo.unit == "meter") {
        //convert to inch
        humanInfo.amount = (humanInfo.amount) * 39.36;
    }
    if (humanInfo.unit == "feet") {
        //convert to inch
        humanInfo.amount = (humanInfo.amount) * 12;
    }
    
    let heightRatio = humanInfo.amount / dinoObj.height;
    let newfact = "The size of ".concat(dinoObj.name, " equal ", Math.round(heightRatio), " from ", humanObj.name, "'s size"); 
    
    (dinoObj.ListOfFacts).push(newfact);
    return dinoObj
    
}
    
// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareWeight(dinoObj, humanObj) {
    let humanInfo = humanObj.weight;

    if (humanInfo.unit == "kg") {
        //convert to lb
        humanInfo.amount = (humanInfo.amount) * 2.205;
    }
    
    let weightRatio = dinoObj.weight/ humanInfo.amount ;
    //console.log(weightRatio);
    let newfact = "The weight of ".concat(dinoObj.name, " equal ", Math.round(weightRatio), " of ", humanObj.name, "'s weight");

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


     


  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic