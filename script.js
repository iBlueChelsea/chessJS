var board = document.getElementById('game');

class Piece {
    constructor(type,player,pos,image,hasMoved) {
        this.type = type;
        this.player = player;
        this.pos = pos;
        this.image = image;
        this.hasMoved = hasMoved;
    }
}

class Game {
    constructor(move,player,isOver,check) {
        this.move = move;
        this.player = player;
        this.isOver = isOver;
        this.check = check;
    }
}

var pieces = [
    new Piece('Rook','black',1,'<img src=css/black-rook.png width="100%"',false),
    new Piece('Knight','black',2,'<img src=css/black-knight.png width="100%"',false),
    new Piece('Bishop','black',3,'<img src=css/black-bishop.png width="100%"',false),
    new Piece('Queen','black',4,'<img src=css/black-queen.png width="100%"',false),
    new Piece('King','black',5,'<img src=css/black-king.png width="100%"',false),
    new Piece('Bishop','black',6,'<img src=css/black-bishop.png width="100%"',false),
    new Piece('Knight','black',7,'<img src=css/black-knight.png width="100%"',false),
    new Piece('Rook','black',8,'<img src=css/black-rook.png width="100%"',false),    
    new Piece('Pawn','black',9,'<img src=css/black-pawn.png width="100%"',false),
    new Piece('Pawn','black',10,'<img src=css/black-pawn.png width="100%"',false),
    new Piece('Pawn','black',11,'<img src=css/black-pawn.png width="100%"',false),
    new Piece('Pawn','black',12,'<img src=css/black-pawn.png width="100%"',false),
    new Piece('Pawn','black',13,'<img src=css/black-pawn.png width="100%"',false),
    new Piece('Pawn','black',14,'<img src=css/black-pawn.png width="100%"',false),
    new Piece('Pawn','black',15,'<img src=css/black-pawn.png width="100%"',false),
    new Piece('Pawn','black',16,'<img src=css/black-pawn.png width="100%"',false),
    new Piece('Pawn','white',49,'<img src=css/white-pawn.png width="100%"',false),
    new Piece('Pawn','white',50,'<img src=css/white-pawn.png width="100%"',false),
    new Piece('Pawn','white',51,'<img src=css/white-pawn.png width="100%"',false),
    new Piece('Pawn','white',52,'<img src=css/white-pawn.png width="100%"',false),
    new Piece('Pawn','white',53,'<img src=css/white-pawn.png width="100%"',false),
    new Piece('Pawn','white',54,'<img src=css/white-pawn.png width="100%"',false),
    new Piece('Pawn','white',55,'<img src=css/white-pawn.png width="100%"',false),
    new Piece('Pawn','white',56,'<img src=css/white-pawn.png width="100%"',false),
    new Piece('Rook','white',57,'<img src=css/white-rook.png width="100%"',false),
    new Piece('Knight','white',58,'<img src=css/white-knight.png width="100%"',false),
    new Piece('Bishop','white',59,'<img src=css/white-bishop.png width="100%"',false),
    new Piece('Queen','white',60,'<img src=css/white-queen.png width="100%"',false),
    new Piece('King','white',61,'<img src=css/white-king.png width="100%"',false),
    new Piece('Bishop','white',62,'<img src=css/white-bishop.png width="100%"',false),
    new Piece('Knight','white',63,'<img src=css/white-knight.png width="100%"',false),
    new Piece('Rook','white',64,'<img src=css/white-rook.png width="100%"',false)
];

var game = new Game(1,'white',false,false);
var turns = [['Type',0,0]];

board.innerHTML = drawBoard(8,8,pieces);

handleMove();

function drawBoard(height,width,array) {
    var rowheight = 800/width;
    var rowwidth = 800/width;
    var result = '<table class="table-bordered table-secondary" align="center"';
    for (i = 1; i < (height + 1); i++) {
        result += '<tr id="row' + i + '">';
        for (j = 1; j < (width + 1); j++) {
            var square = (i-1) * width + j;
            var piece = drawPiece(square,array);
            if ((i % 2 != 0 && j % 2 == 0) || (i % 2 == 0 && j % 2 != 0)) {
                var square_bg = 'green';
            } else {
                var square_bg = 'yellow';
            }
            result += '<td align="center" style="height: ' + rowheight + 'px; width: ' + rowwidth + 'px; background-color: ' + square_bg + '" id="square' + square + '">' + piece + '</td>';
        }
    }
    return result;
}

function drawPiece(square,array){
    var result = '';
    for (obj of array) {
        if (obj.pos == square) {
            var result = obj.image;
        }
    }
    return result;
}

function handleMove(){

$(document).ready(function(){
    var valid = false;
    var oppPiece = false;
    var checkmoves = [];
    var cms;
    var oppcheckmoves = [];
    var oppcms;
    var kingpos;
    for (let i = 1; i < 65; i++){
        oppPiece = getOppPieces(i,game,pieces);
        if (oppPiece == true) {
            oppcms = checkMove(i,pieces);
            for (let oppcm of oppcms){
                if (oppcm > 0 && oppcm < 65){
                    oppcheckmoves.push(oppcm);
                }
            }
        }
        valid = checkValidity(i,game,pieces);
        if (valid == true) {
            cms = checkMove(i,pieces);
            for (let cm of cms){
                if (cm > 0 && cm < 65){
                    checkmoves.push(cm);
                }
            }
            let piece = getPiece(i,pieces);
            if (pieces[piece].type == 'King'){
                kingpos = pieces[piece].pos;
            }
            $("#square" + i).click(function(){
                $("#square" + i).prop("onclick", null).off("click");
                $("#square" + i).addClass("bg-primary");
                var validmoves = checkMove(i,pieces);
                var changemoves = changeMove(i,game,pieces);
                var index = getPiece(i,pieces);
                var prev = i;
                getMovesLoop(validmoves,changemoves,index,prev);
            });
        }
    }
    if (oppcheckmoves.includes(kingpos)){
        $("#square" + kingpos).addClass("bg-danger");
    }
    if (checkmoves.length == 0){
        if (oppcheckmoves.includes(kingpos)){
            alert('CHECKMATE');
        } else {
            alert('STALEMATE');
        }
    }
});

}

function checkValidity(square,game,pieces){
    let valid = false;
    for (piece of pieces) {
        if (piece.pos == square && piece.player == game.player) {
            valid = true;
        }
    }
    return valid;
}

function getOppPieces(square,game,pieces){
    let valid = false;
    for (piece of pieces) {
        if (piece.pos == square && piece.player != game.player) {
            valid = true;
        }
    }
    return valid;
}

function checkMove(square,pieces){
    var validmoves = [];
    for (let piece of pieces) {
        if (piece.pos == square) {
            if (piece.type == 'Pawn') {
                validmoves = getPawnValidMoves(square,piece,pieces);
            }
            if (piece.type == 'Knight') {
                validmoves = getKnightValidMoves(square,piece);
            }
            if (piece.type == 'Bishop') {
                validmoves = getBishopValidMoves(square,piece);
            }
            if (piece.type == 'Rook') {
                validmoves = getRookValidMoves(square,piece);
            }
            if (piece.type == 'Queen') {
                validmoves = getQueenValidMoves(square,piece);
            }
            if (piece.type == 'King') {
                validmoves = getKingValidMoves(square,piece,pieces);
            }
        }
    }
    return validmoves;
}

function changeMove(square,game,pieces){
    changemoves = [];
    for (piece of pieces) {
        if (piece.player == game.player && square != piece.pos) {
            changemoves.push(piece.pos);
        }
    }
    return changemoves;
}

function getPiece(square,pieces){
    let index = 0;
    var result = -1;
    for (let piece of pieces) {
        if (piece.pos == square) {
            result = index;
        }
        index++;
    }
    return result;
}

function getMovesLoop(validmoves,changemoves,index,prev){
    for (let move of validmoves){
        let capture = -1;
        capture = getPiece(move,pieces);
        if (capture == -1 || pieces[capture].type != 'King'){
            $("#square" + move).addClass("bg-info");
            $("#square" + move).click(function(){
                turns.push([pieces[index].type,pieces[index].pos,move]);
                if (capture != -1){
                    pieces[capture].pos = 0;
                }
                if (turns[game.move-1][0] == 'Pawn' && (turns[game.move-1][1]-turns[game.move-1][2] == 16 || turns[game.move-1][2]-turns[game.move-1][1] == 16)){
                    if ((move == turns[game.move-1][2]-8 && turns[game.move-1][2]-turns[game.move-1][1] == 16) || (move == turns[game.move-1][2]+8 && turns[game.move-1][1]-turns[game.move-1][2] == 16)){
                        if (pieces[index].type == 'Pawn'){
                            capture = getPiece(turns[game.move-1][2],pieces);
                            pieces[capture].pos = 0;
                        }
                    }
                }
                if (pieces[index].type == 'King' && (pieces[index].pos-move == 2 || move-pieces[index].pos == 2)){
                    if (move == 3){
                        capture = getPiece(1,pieces);
                        pieces[capture].pos = 4;
                    }
                    if (move == 7){
                        capture = getPiece(8,pieces);
                        pieces[capture].pos = 6;
                    }
                    if (move == 59){
                        capture = getPiece(57,pieces);
                        pieces[capture].pos = 60;
                    }
                    if (move == 63){
                        capture = getPiece(64,pieces);
                        pieces[capture].pos = 62;
                    }
                }
                pieces[index].pos = move;
                if (pieces[index].type == 'Pawn'){
                    if (pieces[index].player == 'white' && (move>0 && move<9)){
                        pieces[index].type = 'Queen';
                        pieces[index].image = '<img src=css/white-queen.png width="100%"';
                    }
                    if (pieces[index].player == 'black' && (move>56 && move<65)){
                        pieces[index].type = 'Queen';
                        pieces[index].image = '<img src=css/black-queen.png width="100%"';
                    }
                }
                if (pieces[index].hasMoved == false){
                    pieces[index].hasMoved = true;
                }
                board.innerHTML = drawBoard(8,8,pieces);
                game.move++;
                if (game.player == 'white') {
                    game.player = 'black';
                } else {
                    game.player = 'white';
                }
                handleMove();
            });
        }
    }
    for (let change of changemoves){
        $("#square" + change).prop("onclick", null).off("click");
        $("#square" + change).click(function(){
            $("#square" + change).prop("onclick", null).off("click");
            $("#square" + change).addClass("bg-primary");
            $("#square" + prev).removeClass("bg-primary");
            for (move of validmoves) {
                $("#square" + move).prop("onclick", null).off("click");
                $("#square" + move).removeClass("bg-info");
            }
            validmoves = checkMove(change,pieces);
            changemoves = changeMove(change,game,pieces);
            index = getPiece(change,pieces);
            prev = change;
            getMovesLoop(validmoves,changemoves,index,prev);
        });
    }
}

function getPawnValidMoves(square,piece,pieces){
    var validmoves = [];
    var rowB = [9,10,11,12,13,14,15,16];
    var rowD = [25,26,27,28,29,30,31,32];
    var rowE = [33,34,35,36,37,38,39,40];
    var rowG = [49,50,51,52,53,54,55,56];
    var columnA = [1,9,17,25,33,41,49,57];
    var columnH = [8,16,24,32,40,48,56,64];
    let index = -1;
    if (piece.player == 'white') {
        index = getPiece(square-8,pieces);
        if (index == -1){
            validmoves.push(square-8);
            index = getPiece(square-16,pieces);
            if (piece.hasMoved == false && index == -1){
                validmoves.push(square-16);
            }
        }
        index = getPiece(square-9,pieces);
        if (index != -1){
            if (columnA.includes(square) == false){
                validmoves.push(square-9);  
            }
        }
        index = getPiece(square-7,pieces);
        if (index != -1){
            if (columnH.includes(square) == false){
                validmoves.push(square-7);  
            }
        }
        if (turns[game.move-1][0] == 'Pawn' && rowB.includes(turns[game.move-1][1]) && rowD.includes(turns[game.move-1][2])){
            if (square-1 == turns[game.move-1][2] && square != 33){
                validmoves.push(square-9);
            }
            if (square+1 == turns[game.move-1][2] && square != 24){
                validmoves.push(square-7);
            }
        }
    }
    if (piece.player == 'black') {
        index = getPiece(square+8,pieces);
        if (index == -1){
            validmoves.push(square+8);
            index = getPiece(square+16,pieces);
            if (piece.hasMoved == false && index == -1){
                validmoves.push(square+16);
            }
        }
        index = getPiece(square+9,pieces);
        if (index != -1){
            if (columnH.includes(square) == false){
                validmoves.push(square+9);  
            }
        }
        index = getPiece(square+7,pieces);
        if (index != -1){
            if (columnA.includes(square) == false){
                validmoves.push(square+7);  
            }
        }
        if (turns[game.move-1][0] == 'Pawn' && rowG.includes(turns[game.move-1][1]) && rowE.includes(turns[game.move-1][2])){
            if (square-1 == turns[game.move-1][2] && square != 41){
                validmoves.push(square+7);
            }
            if (square+1 == turns[game.move-1][2] && square != 32){
                validmoves.push(square+9);
            }
        }
    }
    let moves = [];
    let result = false;
    for (let move of validmoves){
        result = getMoveConditions(move,piece,pieces);
        if (result == true){
            moves.push(move);
        }
    }
    return moves;
}

function getKnightValidMoves(square,piece){
    var validmoves = [];
    var columnA = [1,9,17,25,33,41,49,57];
    var columnB = [2,10,18,26,34,42,50,58];
    var columnG = [7,15,23,31,39,47,55,63];
    var columnH = [8,16,24,32,40,48,56,64];
    if (columnH.includes(square-17) == false){
        validmoves.push(square-17); 
    }
    if (columnG.includes(square-10) == false && columnH.includes(square-10) == false){
        validmoves.push(square-10); 
    }
    if (columnH.includes(square+15) == false){
        validmoves.push(square+15); 
    }
    if (columnG.includes(square+6) == false && columnH.includes(square+6) == false){
        validmoves.push(square+6); 
    }
    if (columnA.includes(square+17) == false){
        validmoves.push(square+17); 
    }
    if (columnB.includes(square+10) == false && columnA.includes(square+10) == false){
        validmoves.push(square+10); 
    }
    if (columnA.includes(square-15) == false){
        validmoves.push(square-15); 
    }
    if (columnB.includes(square-6) == false && columnA.includes(square-6) == false){
        validmoves.push(square-6); 
    }
    let moves = [];
    let result = false;
    for (let move of validmoves){
        result = getMoveConditions(move,piece,pieces);
        if (result == true){
            moves.push(move);
        }
    }
    return moves;
}

function getBishopValidMoves(square,piece){
    var validmoves = [];
    var upright = square;
    var upleft = square;
    var downright = square;
    var downleft = square;
    var rowA = [1,2,3,4,5,6,7,8];
    var rowH = [57,58,59,60,61,62,63,64];
    var columnA = [1,9,17,25,33,41,49,57];
    var columnH = [8,16,24,32,40,48,56,64];
    let result = true;
    let index = -1;
    while (columnH.includes(upright) == false && rowA.includes(upright) == false && result == true){
        upright -= 7;
        result = getMoveConditions(upright,piece,pieces);
        if (result == false && game.check == false) {
            index = getPiece(upright,pieces);
            if (pieces[index].player != piece.player){
                validmoves.push(upright);
            }
        } else {
            validmoves.push(upright);
        }
    }
    result = true;
    while (columnA.includes(upleft) == false && rowA.includes(upleft) == false && result == true){
        upleft -= 9;
        result = getMoveConditions(upleft,piece,pieces);
        if (result == false && game.check == false) {
            index = getPiece(upleft,pieces);
            if (pieces[index].player != piece.player){
                validmoves.push(upleft);
            }
        } else {
            validmoves.push(upleft);
        }
    }
    result = true;
    while (columnH.includes(downright) == false && rowH.includes(downright) == false  && result == true){
        downright += 9;
        result = getMoveConditions(downright,piece,pieces);
        if (result == false && game.check == false) {
            index = getPiece(downright,pieces);
            if (pieces[index].player != piece.player){
                validmoves.push(downright);
            }
        } else {
            validmoves.push(downright);
        }
    }
    result = true;
    while (columnA.includes(downleft) == false && rowH.includes(downleft) == false  && result == true){
        downleft += 7;
        result = getMoveConditions(downleft,piece,pieces);
        if (result == false && game.check == false) {
            index = getPiece(downleft,pieces);
            if (pieces[index].player != piece.player){
                validmoves.push(downleft);
            }
        } else {
            validmoves.push(downleft);
        }
    }
    let moves = [];
    let checkresult = false;
    if (game.check == false){
        for (let move of validmoves){
            checkresult = getCheckCondition(move,piece,pieces);
            if (checkresult == true){
                moves.push(move);
            }
        }
        return moves;
    } else {
        return validmoves;
    }
}

function getRookValidMoves(square,piece){
    var validmoves = [];
    var up = square;
    var down = square;
    var right = square;
    var left = square;
    var rowA = [1,2,3,4,5,6,7,8];
    var rowH = [57,58,59,60,61,62,63,64];
    var columnA = [1,9,17,25,33,41,49,57];
    var columnH = [8,16,24,32,40,48,56,64];
    let result = true;
    let index = -1;
    while (rowA.includes(up) == false && result == true){
        up -= 8;
        result = getMoveConditions(up,piece,pieces);
        if (result == false && game.check == false) {
            index = getPiece(up,pieces);
            if (pieces[index].player != piece.player){
                validmoves.push(up);
            }
        } else {
            validmoves.push(up);
        }
    }
    result = true;
    while (rowH.includes(down) == false && result == true){
        down += 8;
        result = getMoveConditions(down,piece,pieces);
        if (result == false && game.check == false) {
            index = getPiece(down,pieces);
            if (pieces[index].player != piece.player){
                validmoves.push(down);
            }
        } else {
            validmoves.push(down);
        }
    }
    result = true;
    while (columnH.includes(right) == false && result == true){
        right += 1;
        result = getMoveConditions(right,piece,pieces);
        if (result == false && game.check == false) {
            index = getPiece(right,pieces);
            if (pieces[index].player != piece.player){
                validmoves.push(right);
            }
        } else {
            validmoves.push(right);
        }
    }
    result = true;
    while (columnA.includes(left) == false && result == true){
        left -= 1;
        result = getMoveConditions(left,piece,pieces);
        if (result == false && game.check == false) {
            index = getPiece(left,pieces);
            if (pieces[index].player != piece.player){
                validmoves.push(left);
            }
        } else {
            validmoves.push(left);
        }
    }
    let moves = [];
    let checkresult = false;
    if (game.check == false){
        for (let move of validmoves){
            checkresult = getCheckCondition(move,piece,pieces);
            if (checkresult == true){
                moves.push(move);
            }
        }
        return moves;
    } else {
        return validmoves;
    }
}

function getQueenValidMoves(square,piece){
    var validmovesbishop = getBishopValidMoves(square,piece);
    var validmovesrook = getRookValidMoves(square,piece);
    var validmoves = validmovesbishop.concat(validmovesrook);
    return validmoves;
}

function getKingValidMoves(square,piece,pieces){
    let validmoves = [];
    var columnA = [1,9,17,25,33,41,49,57];
    var columnH = [8,16,24,32,40,48,56,64];
    validmoves.push(square-8);
    validmoves.push(square+8);
    if (columnA.includes(square) == false){
        validmoves.push(square-9);
    }
    if (columnH.includes(square) == false){
        validmoves.push(square-7);
    }
    if (columnA.includes(square) == false){
        validmoves.push(square-1);
    }
    if (columnH.includes(square) == false){
        validmoves.push(square+1);
    }
    if (columnA.includes(square) == false){
        validmoves.push(square+7);
    }
    if (columnH.includes(square) == false){
        validmoves.push(square+9);
    }
    let castlemoves = getCastleMoves(square,piece,pieces);
    let allmoves = validmoves.concat(castlemoves);
    let moves = [];
    for (let move of allmoves){
        let result = getMoveConditions(move,piece,pieces);
        if (result == true){
            moves.push(move);
        }
    }
    return moves;
}

function getCastleMoves(square,piece,pieces){
    let castlemoves = [];
    let blocksquares = [];
    let rooks = [];
    let blocked = false;
    if (piece.hasMoved == false) {
        if (piece.player == 'black'){
            rooks = [pieces[0],pieces[7]];
            for (rook of rooks){
                if (rook.hasMoved == false) {
                    if (rook.pos == 1) {
                        blocksquares = [2,3,4];
                        for (p in pieces) {
                            if (blocksquares.includes(pieces[p].pos)) {
                                blocked = true;
                            }
                        }
                        if (blocked == false) {
                        castlemoves.push(square-2);
                        }
                    }
                    if (rook.pos == 8) {
                        blocked = false;
                        blocksquares = [6,7];
                        for (p in pieces) {
                            if (blocksquares.includes(pieces[p].pos)) {
                                blocked = true;
                            }
                        }
                        if (blocked == false) {
                        castlemoves.push(square+2);
                        }
                    }
                }
            }
        }
        if (piece.player == 'white'){
            rooks = [pieces[24],pieces[31]];
            for (rook of rooks){
                if (rook.hasMoved == false) {
                    if (rook.pos == 57) {
                        blocksquares = [58,59,60];
                        for (p in pieces) {
                            if (blocksquares.includes(pieces[p].pos)) {
                                blocked = true;
                            }
                        }
                        if (blocked == false) {
                        castlemoves.push(square-2);
                        }
                    }
                    if (rook.pos == 64) {
                        blocked = false;
                        blocksquares = [62,63];
                        for (p in pieces) {
                            if (blocksquares.includes(pieces[p].pos)) {
                                blocked = true;
                            }
                        }
                        if (blocked == false) {
                        castlemoves.push(square+2);
                        }
                    }
                }
            }
        }
    }
    return castlemoves;
}

function getMoveConditions(square,piece,pieces){
    let conditions = [true,true];
    let result = true;
    let index = getPiece(square,pieces);
    if (piece.type == 'Bishop' || piece.type == 'Rook' || piece.type == 'Queen'){
        if (index != -1){
            conditions[0] = false;
        }
    } else if (index != -1 && pieces[index].player == piece.player && game.check == false){
        conditions[0] = false;
    }
    if (game.check == false){
        if (piece.type == 'Pawn' || piece.type == 'Knight' || piece.type == 'King'){
            let check = getCheckCondition(square,piece,pieces);
            if (check == false){
                conditions[1] = false;
            }
        }
    }
    for (let condition of conditions){
        if(condition == false){
            result = false;
        }
    }
    return result;
}

function getCheckCondition(square,piece,pieces){
    let check = false;
    let attackmoves = [];
    let moves = [];
    let savepos = piece.pos;
    piece.pos = square;
    let kingsquare;
    let castle;
    let enpassant;
    let enpassantpos;
    game.check = true;
    for (let p of pieces){
        let capture = false;
        if (p.player == piece.player && p.type == 'King'){
            if (piece.type == 'King' && (savepos-square == 2 || square-savepos == 2)){
                if (savepos-square == 2){
                    castle = savepos-1;
                }
                if (square-savepos == 2){
                    castle = savepos+1;
                }
                kingsquare = [p.pos,castle,savepos];
            } else {
                kingsquare = p.pos;
            }
        }
        if (p.pos == square) {
            p.pos = 0;
            capture = true;
        }
        if (turns[game.move-1][0] == 'Pawn' && (turns[game.move-1][1]-turns[game.move-1][2] == 16 || turns[game.move-1][2]-turns[game.move-1][1] == 16)){
            if ((square == turns[game.move-1][2]-8 && turns[game.move-1][2]-turns[game.move-1][1] == 16) || (square == turns[game.move-1][2]+8 && turns[game.move-1][1]-turns[game.move-1][2] == 16)){
                if (piece.type == 'Pawn'){
                    enpassantpos = p.pos;
                    enpassant = true;
                    p.pos = 0;
                }
            }
        }
        if (p.player != piece.player && p.pos != 0){
            moves = checkMove(p.pos,pieces);
            for (let move of moves){
                attackmoves.push(move);
            }
        }
        if (capture == true){
            p.pos = square;
        }
        if (enpassant == true){
            p.pos = enpassantpos;
        }
    }
    piece.pos = savepos;
    game.check = false;
    if (typeof kingsquare == 'object'){
        for (let ks of kingsquare){
            if (attackmoves.includes(ks)){
                check = true;
            }
        }
    } else {
        if (attackmoves.includes(kingsquare)){
            check = true;
        }
    }
    if (check == true){
        return false;
    } else {
        return true;
    }
}
