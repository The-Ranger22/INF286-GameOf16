/* Array containing the image slices */
var images=['1_1','1_2','1_3','1_4','2_1','2_2','2_3','2_4','3_1','3_2','3_3','3_4','4_1','4_2','4_3','4_4'];
var shuffledImages=[];
var isStarted = false;
console.log(shuffledImages);
/* div that contains all images */
var container=document.getElementById('pieces-container');

drawPuzzle(images);

var startGameButton=document.getElementById('btn-start');
startGameButton.addEventListener('click',function(event){
    isStarted = true;
    console.log('start game');
    shuffledImages=images;
    for(i = 0; i <images.length; i++) shuffledImages[i]=images[i];
    shuffle(shuffledImages);
    console.log(images);
    shuffledImages[0]='blank';
    shuffle(shuffledImages);
    drawPuzzle(shuffledImages);
});
/** */
container.addEventListener('click', function (ev) {
    if(!isStarted || ev.target.getAttribute('data-row')==null) return;
    console.log("Row: " + ev.target.getAttribute('data-row') + " | Col: " + ev.target.getAttribute('data-col'));
    row=parseInt(ev.target.getAttribute('data-row'));
    col=parseInt(ev.target.getAttribute('data-col'));

    checkAbove(row - 1, col);
    checkBelow(row + 1, col);
    checkLeft(row, col - 1);
    checkRight(row, col + 1);
    if(checkVictory()){
        console.log("Game Finished");
        alert("You win!");
        isStarted('false');
    }




});
function checkAbove(row, col){
    //console.log('ABOVE|-|Row: ' + row + ' | Column: ' + col);
    if (row == 0 || isNaN(row)){
        console.log("Above: indexOutOfBounds");
        return;
    }
    //console.log(document.getElementById(row+'_'+col).src);
    if(foundBlank(row, col)) swapBlank(row, col, 'up');
}
function checkBelow(row, col){
    console.log('BELOW|-|Row: ' + row + ' | Column: ' + col);
    if (row == 5 || isNaN(row)){
        console.log("Below: indexOutOfBounds");
        return;
    }
    //console.log(document.getElementById(row+'_'+col).src);
    if(foundBlank(row, col)) swapBlank(row, col, 'down');
}
function checkLeft(row, col){
    //console.log('LEFT|-|Row: ' + row + ' | Column: ' + col);
    if (col == 0 || isNaN(col)){
        console.log("Left: indexOutOfBounds");
        return;
    }
    //console.log(document.getElementById(row+'_'+col).src);
    if(foundBlank(row, col)) swapBlank(row, col, 'left');
}
function checkRight(row, col){
    console.log('RIGHT|-|Row: ' + row + ' | Column: ' + col);
    if (col == 5 || isNaN(col)){
        console.log("Right: indexOutOfBounds");
        return;
    }
    //console.log(document.getElementById(row+'_'+col).src);
    if(foundBlank(row, col)) swapBlank(row, col, 'right');
}

function foundBlank(row, col){
    if(document.getElementById(row+'_'+col).src.includes('blank.png')) return true;
    else return false;
}
function swapBlank(row, col, direction){
    var x = 0;
    var y = 0;

    switch(direction) {
        case 'up':
            y = 1;
            break;
        case 'down':
            y = -1;
            break;
        case 'left':
            x = 1;
            break;
        case 'right':
            x = -1;
            break;
        default:
            console.log("Error: default reached without correct direction");
    }
    console.log('| ' + direction + ' | Row: ' + row + ' | Col: ' + col + ' | y: ' + y + ' | x: ' + x + ' |');
    var temp = document.getElementById((row + y)+'_'+(col + x)).src;
    document.getElementById((row + y)+'_'+(col + x)).src = document.getElementById((row)+'_'+(col)).src;
    document.getElementById((row)+'_'+(col)).src = temp;
}

function drawPuzzle(imageSet){
    container.innerHTML='';
    /* Create the images and put them in the div */
    var row = 1;
    var column = 0;
    for(i=0;i<imageSet.length;i++){
        column++;
        //console.log(column, row);

        if(column == 5){
            row++;
            column = 1;
        }
        container.innerHTML+='<div class="col-3" style="max-width:187px"><img id="'+row+'_'+column+'" data-row="'+ row + '" data-col="' + column +'" class="" src="img/'+imageSet[i]+'.png" /></div>';
    }
}
function checkVictory(){
    var row = 1;
    var col = 0;
    for(i = 0; i < images.length;i++){
        col++;
        if(col == 5){
            row++;
            col = 1;
        }
        if(!document.getElementById(row+'_'+col).src.includes(images[i]) && !document.getElementById(row+'_'+col).src.includes('blank.png')) return false;
    }
}
function shuffle(array) {

    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
}
