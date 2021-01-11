// Fetch data from local file & Create Dino Objects
//const url = 'https://github.com/NaelSk/Javascript_Nanodegree/blob/main/Javascript-master/dino.json'
//const dino2 = readTextFile(url);

(async () => {
 /*const dino = await fetch("./dinos.json")
        .then((result) => result.json())
        .then((result) => result.Dinos);*/

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
        isNotValidname = (name == "");

        if (isNotValidname) {
            button.disabled = true;
        } else {
            button.disabled = false;
            // On button click, prepare and display infographic
            button.addEventListener('click', display);
        }
    });

    function display() {

        const human = checkUnitAndConvert(new Human());

        let newDinosWithFactList = (dino.Dinos).map(dinoObj => new Dino(dinoObj));
        newDinosWithFactList = newDinosWithFactList.map(dinoObj => dinoObj.comaperHeight(human));
        newDinosWithFactList = newDinosWithFactList.map(dinoObj => dinoObj.compareWeight(human));
        newDinosWithFactList = newDinosWithFactList.map(dinoObj => dinoObj.compareDiet(human));

        //Generate Tiles for each Dino in Array

        const tiles = (function tilePostios() {
            let tiles = [];
            const NUM_COLS = 3;
            const NUM_ROWS = 3;
            let k = 0;
            for (let i = 0; i < NUM_COLS; ++i) {
                for (let j = 0; j < NUM_ROWS; ++j) {
                    if (k == newDinosWithFactList.length / 2) {
                        tiles.push(new Tile(human));
                    }
                    if (k < newDinosWithFactList.length) {

                        dinoObj = newDinosWithFactList[k]
                        tiles.push(new Tile(dinoObj));
                        k = ++k;
                    }
                }
            }
            return tiles;
        }
        )();

        // Add tiles to DOM
        let tilesHTML = '';
        /**
        * @description Add tiles to DOM.
        */
        (function fillGrid() {
            tiles.forEach(function (element) {
                tilesHTML += '<div class="grid-item">';//console.log(element);
                const path = element.picPath;
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


                let fact = "<h4>" + selectedFact + "</h4>";
                tilesHTML += imgHtmlElemet;
                tilesHTML += fact;
                tilesHTML += '</div>';
            });

            tilesHTML += '<div id="btn2">' + "Compare Me" + '</div >';
            grid.innerHTML = tilesHTML;

            const newbutton = document.getElementById('btn2');
            // On button click, show new fact
            newbutton.addEventListener('click', display);

        })();

        removeFrom();
    }


    // Create Dino Constructor
    /**
    * @description Create Dino object.
    * @constructor
    * @param {Object} obj - The author of the book
    */
    function Dino(obj) {
        this.name = obj.species;
        this.weight = obj.weight;
        this.height = obj.height;
        this.diet = obj.diet;
        this.where = obj.where;
        this.when = obj.when;
        this.fact = obj.fact;
        this.ListOfFacts = [this.fact,
        (this.name).concat(" has lived in ", obj.where, " at ", obj.when, " era.")
        ]
        
    }

    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    /**
    * @description compare between dinosaurs's  to human's diet
    * @param {Human} humanObj
    * @returns {Dino} the Dion Object itself after adding new fact based on comparing human's and Dino's diet
    */
    Dino.prototype.compareDiet = function (humanObj) {

        if (this.diet == humanObj.diet) {
            newfact = (humanObj.name).concat(" and ", this.name, " have the same diet");
        } else {
            newfact = (humanObj.name).concat(" and ", this.name, " have the different diet");
        }
        (this.ListOfFacts).push(newfact);
        return this;
    };
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    /**
    * @description compare between dinosaurs's to human's weight
    * @param {Human} humanObj
    * @returns {Dino} the Dion Object itself after adding new fact based on comparing human's and Dino's weight
    */
    Dino.prototype.compareWeight = function (humanObj) {

        const weightRatio = this.weight / (humanObj.weight.amount);
        const newfact = "The weight of ".concat(this.name, " equal ", weightRatio.toFixed(2), " of ", humanObj.real_name, "'s weight");

        (this.ListOfFacts).push(newfact);

        return this

    };

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches.
    /**
    * @description compare between dinosaurs's to human's height 
    * @param {Human} humanObj
    * @returns {Dino}the Dion Object itself after adding new fact based on comparing human's and Dino's height
    */
    Dino.prototype.comaperHeight=function (humanObj) {

        const heightRatio = this.height / (humanObj.height.amount);
        const newfact = "The height of ".concat(this.name, " equal ", heightRatio.toFixed(2), " of ", humanObj.real_name, "'s height");

        (this.ListOfFacts).push(newfact);

        return this
    };

    // Create Human Object
    /**
    * @description Represent the inserted data of human.
    * @constructor
    */
    function Human(){
        this.name = "human",
            this.real_name = document.getElementById('name').value,
            this.ListOfFacts = [this.real_name],
            this.diet = document.getElementById('diet').value,
            this.weight = {
                amount: parseInt(document.getElementById('weight').value),
                unit: document.getElementById('weightUnit').value

            },
            this.height = {
                amount: parseInt(document.getElementById('hightAmount').value),
                unit: document.getElementById('hightUnit').value
            }
    }


    /**
    * @description Create Dino object.
    * @constructor
    * @param {Object} obj - The author of the book
    */
    function Tile(dinoObj) {
        this.dino = dinoObj;
        this.size = 50;
        this.picPath = ".\\images\\" + (dinoObj.name).replace(" ", "%20").toLowerCase() + ".png";

    };

    // Use IIFE to get human data from form

    

    //convert to inch
    /**
    * @description it will convert the value from meter to equivalent in Inch
    * @param {Human} obj
    * @returns {Human} obj after converting the its height value
    */
    function fromMeterToInch(obj) {
        const newValue = obj.height.amount * 39.36;
        obj.height.amount = newValue;
        return (obj);

    }
    //convert to inch
    /**
    * @description it will convert the value from feet to equivalent in Inch
    * @param {Human} obj
    * @returns {Human} obj after converting the its height value
    */
    function fromFeetToInch(obj) {
        const newValue = obj.height.amount * 12;
        obj.height.amount = newValue;
        return (obj);
    }

    //convert to lb
    /**
    * @description it will convert the value from kg to equivalent in lb
    * @param {Human} obj
    * @returns {Human} obj after converting the its weight value
    */
    function fromKgTolb(obj) {
        const newValue = obj.weight.amount * 12;
        obj.weight.amount = newValue;
        return obj;

    }

    //reform the human
    /**
    * @description it will convert the values of human's data to be able compared with exist data of dinosaurs where the unit in inch and lb
    * @param {Human} obj
    * @returns {Human} obj after converting  its values
    */
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

    // Remove form from screen
    /**
    * @description will remove form from screen
    */
    function removeFrom() {
        form.style.display = 'none';
    }

    //Get random elements from the list
    /**
    * @description it will convert the values of human's data to be able compared with exist data of dinosaurs where the unit in inch and lb
    * @param {ListOfFacts} ls
    * @returns {string} one the item in the list
    */
    function getRandomItem(ls) {
        const item = ls[Math.floor(Math.random() * ls.length)];
        return item
    }
})();
