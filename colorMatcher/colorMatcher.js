class Format {
    #width;
    #height;
    #paper;
    #price;
    constructor(width, height, paper, price) {
        this.#width = width;
        this.#height = height;
        this.#paper = paper;
        this.#price = price;
    }
}

class Color {
    #hex;
    #name;
    constructor(hex, name) {
        this.#hex = hex;
        this.#name = name;
    }

    get name() {
        return this.#name;
    }

    get hex() {
        return this.#hex;
    }
}

class Photo {
    #src;
    #formats = [];
    #colors = [];
    #title = "";
    #description = "";
    constructor(src){
        this.#src = src;
    }

    set title(title)
    {
        this.#title = title;
    }

    set description(description)
    {
        this.#description = description;
    }

    get src() {
        return this.#src;
    }

    get title() {
        return this.#title;
    }

    addFormats(...args) {
        args.forEach(format => {
            this.#formats.push(format);
        })
    }

    addColors(...args) {
        args.forEach(color => {
            this.#colors.push(color);
        })
    }

    containsColor(color) {
        var colorFound = false;
        this.#colors.forEach(listColor => {
            if(color.name == listColor.name) {
                colorFound = true;
            }
        });
        return colorFound;
    }
}

photos = [];
colors = [];
cart = [];
buttons = new Map(); //the key is the button object and the value is whether it is selected.

//creates all of the format, color, and photo objects.
//TODO store these values in json files.
//----------------------------------------------------
f12x36 = new Format(12, 36, "Photo Rag", 49.99);
f24x72 = new Format(24, 72, "Photo Rag", 129.99);
f8x12 = new Format(8, 12, "Photo Rag", 29.99);
f12x8 = new Format(12, 8, "Photo Rag", 29.99);
f12x12 = new Format(12, 12, "Photo Rag", 59.99);
f20x20 = new Format(20, 20, "Photo Rag", 99.99);
f16x9 = new Format(16, 9, "Photo Rag", 39.99);

red = new Color("ff0000", "Red");
blue = new Color("3300ff", "Blue");
green = new Color("3cbf00", "Green");
white = new Color("ffffff", "White");
black = new Color("222222", "Black");
yellow = new Color("ffe15b", "Yellow");
orange = new Color("f7a035", "Orange");
pink = new Color("ff82d8", "Pink");
purple = new Color("c40da8", "Purple");

colors.push(red);
colors.push(blue);
colors.push(green);
colors.push(white);
colors.push(black);
colors.push(yellow);
colors.push(orange);
colors.push(pink);
colors.push(purple);
//----------------------------------------------------

p1 = new Photo("BadlandsAtDawn.jpg");
p1.title = "Badlands at Dawn";
p1.addColors(pink, blue, purple);
p1.addFormats(f12x36, f24x72);
p1.description = "Peaceful morning panorama of the badlands near Joseph City Arizona.";
photos.push(p1);

p2 = new Photo("BadlandsCan.jpg");
p2.title = "Badlands Can";
p2.addColors(black, white);
p2.addFormats(f12x8);
p2.description = "The paint had been stripped off of this can from its many years in the desert of Arizona.";
photos.push(p2);

p3 = new Photo("TemplePotatos.jpg");
p3.title = "Temple Potatos";
p3.addColors(green, white);
p3.addFormats(f12x36, f24x72);
p3.description = "Potato fields provide an abstract forground for the Rexburg Idaho Temple of the Church of Jesus Christ of Latter-day Saints.";
photos.push(p3);

p4 = new Photo("TwinsInPink.jpg");
p4.title = "Twins in Pink";
p4.addColors(pink, orange);
p4.addFormats(f12x12, f20x20);
p4.description = "These twin Saguaros near Pheonix AZ have a majestic stature.";
photos.push(p4);

p5 = new Photo("CropdusterTemple.jpg");
p5.title = "Cropduster Temple";
p5.addColors(yellow, blue);
p5.addFormats(f16x9);
p5.description = "A ready to harvest field of wheat provides a forground for the Rexburg Idaho Temple of the Church of Jesus Christ of Latter-day Saints.";
photos.push(p5);

p6 = new Photo("WarmWheat.jpg");
p6.title = "Warm Wheat";
p6.addColors(green, yellow);
p6.addFormats(f8x12);
p6.description = "Beautiful soft light gently touches this Idaho wheat field.";
photos.push(p6);

//creates the color buttons for each color in the color array
colors.forEach(color => {
    var button = document.createElement('BUTTON');
    var text = document.createTextNode(color.name);
    button.appendChild(text);
    button.style.backgroundColor = "#" + color.hex;
    buttons.set(button, false);
    document.querySelector("#colors").appendChild(button);
});

//creates event listener for each of the color buttons
//each time one of the buttons is pressed it calls the function to update the images
Array.from(buttons.keys()).forEach(button => {
    button.addEventListener("click", function() {
        buttons.set(button, !buttons.get(button));
        if(buttons.get(button)) {
            //set border to red
            button.style.borderColor = "#FF0000";
        } else{
            //set border to black
            button.style.borderColor = "#000000";
        }
        document.querySelector("#photos").innerHTML = "";
        updateImages();
    });
});

function updateImages() {
    var colorIndex = 0;
    var selectedPhotos = [];
    buttons.forEach(selected => {
        if(selected) {
            //for each photo check if it contains the color. If so add it to the photos div
            photos.forEach(photo => {
                if(photo.containsColor(colors[colorIndex])) {
                    //this makes sure that there are only one version of the image getting added
                    var inSelected = false;
                    selectedPhotos.forEach(selectedPhoto => {
                        if(photo.title == selectedPhoto.title){
                            console.log(photo.title + " " + selectedPhoto.title);
                            inSelected = true;
                        }
                    });
                    if(!inSelected){
                        selectedPhotos.push(photo);
                    }
                }
            });
        }
        colorIndex++;
    });

    selectedPhotos.forEach(photo =>{
        //create photo element for each photo in the selectedPhotos array
        var domPhoto = document.createElement("img");
        domPhoto.src = "../photos/" + photo.src;
        domPhoto.style.height = "200px";
        domPhoto.style.width = "auto";
        document.querySelector("#photos").appendChild(domPhoto);
    });
}