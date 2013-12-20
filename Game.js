var whoplay = 2; //Чей ход 0 - белый 1 черные
var whogo = 2;
var SelI = -1;
var SelJ = -1;
var black = ["bladya", "bhorse", "bofficer", "bqueen", "bking", "bpeshka"]
var white = ["wladya", "whorse", "wofficer", "wqueen", "wking", "wpeshka"]
var WhiteShah = 0; //шах белым
var BlackShah = 0; //шах черным
var CellBlack = [];
var CellWhite = [];
var socket;
// Блокировку полей добавить!

var eat = [[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]] //позиции, куда может быть осуществлен ход

var shahw = [[-1, -1, -1, -1, -1, -1, -1, -1, ], [-1, -1, -1, -1, -1, -1, -1, -1, ]] //массив шах/мат

var shahb = [[-1, -1, -1, -1, -1, -1, -1, -1, ], [-1, -1, -1, -1, -1, -1, -1, -1, ]] //массив шах/мат
   

function clearshahw()
{
    for (i = 0; i <= 9; i++) {
        shahw[0][i] = -1; shahw[1][i] = -1;
    }
    
}

function clearshahb() {
    for (i = 0; i <= 9; i++) {
        shahb[0][i] = -1; shahb[1][i] = -1;
    }
}

function SelBlack(Cell) {
    var i = $(Cell).parent().parent().children().index($(Cell).parent());
    var j = $(Cell).parent().children().index($(Cell));

    if ((i == SelI) && (j == SelJ)) {
        $(Cell).css('border', '0px solid black ');
        clear();
        SelI = -1;
        SelJ = -1;
        return;
    }

    if ((SelI == -1) && (SelJ == -1)) {
        $(Cell).css('border', '1px solid yellow');
        SelI = i;
        SelJ = j;
        Chek(Cell); //проверка выделение
        return;
    }
    GO(Cell, undefined, undefined, undefined, undefined, undefined);

}

function SelWhite(Cell) {
    var i = $(Cell).parent().parent().children().index($(Cell).parent());
    var j = $(Cell).parent().children().index($(Cell));

    if ((i == SelI) && (j == SelJ)) {
        $(Cell).css('border', '0px solid black ');
        clear();
        SelI = -1;
        SelJ = -1;
        return;
    }
    if ((SelI == -1) && (SelJ == -1)) {
        $(Cell).css('border', '1px solid yellow');
        SelI = i;
        SelJ = j;
        Chek(Cell); //проверка выделение
        return;
    }
    GO(Cell, undefined, undefined, undefined, undefined, undefined);
}

//очистка после хода
function clear() {
 
    for (i = 0; i < 28; i++) {
        if (eat[0][i]!=-1)
        {
            $("tr:eq(" + (eat[0][i]) + ")").find("td:eq(" + eat[1][i] + ")").css('border', '0px solid black')
        }
        eat[0][i] = -1;
        eat[1][i] = -1;
    }

}



function  Checkcell(i,j)
{
    for (p = 0; p < 28; p++) {
        if ((eat[0][p] == i) && (eat[1][p] == j)) return 1;     
    }
    return 0;
} // если 1 ходить можно, 0 нельзя


function SetShahb(i, j,flag, cell,z,x) {
    
    
    for (p = 0; p < 9; p++) {
        if ((shahb[0][p] == -1) || (shahb[0][p] == i) && (shahb[1][p] == j)) {
            shahb[0][p] = i;
            shahb[1][p] = j;
            break;
        }
    }

    if ((BlackShah == 0) && (flag = true)&&(z!=-1)) {
        BlackShah = 1;
        //alert("Шах черным");
        ChekMat(z, x, cell);
    }
}
function SetShahw(i, j,flag, cell, z,x) {

    for (p = 0; p < 9; p++) {
        if ((shahw[0][p] == -1) || (shahw[0][p] == i) && (shahw[1][p] == j)) {
            shahw[0][p] = i;
            shahw[1][p] = j;
            break;
        }
    }
    if ((WhiteShah == 0) && (flag == true)&&(z!=-1)) {
        WhiteShah = 1;
        //alert("Шах белым");
        ChekMat(z, x, cell);
    }
}

function ChekMat(i, j, cell) {
    obj = $("tr:eq(" + i + ")").find("td:eq(" + j + ")");

    ChekKing(obj, false);
    if (eat[0][0] == -1) {
        if (jQuery.inArray($(obj).attr("name"), black) > -1) {
            alert("Шах и мат черным \r\n Победили белые");
        }
        else {
            alert("Шах и мат белым \r\n Победили черные");
        }
        return;
    }

    if (jQuery.inArray($(obj).attr("name"), black) > -1)
        alert("Шах черным");
    else
        alert("Шах белым");

}



function InShanb(i,j)
{
    for (p = 0; p < 9; p++) {
        if ((shahb[0][p] == i) && (shahb[1][p] == j)) {
            return 1;
        }
    }
    //допилить проверку пустых на шах

    for (p1 = 0; p1 < CellWhite.length; p1++) {
        if ((CellWhite[p1] != null) && (CellWhite[p1].attr("name") != "wking")) {
            ChekNKing(CellWhite[p1]);
        }
    }

    for (p = 0; p < 9; p++) {
        if ((shahb[0][p] == i) && (shahb[1][p] == j)) {
            return 1;
        }
    }
    return 0;
}

function InShanw(i,j)
{
    for (p = 0; p <9; p++) {
        if ((shahw[0][p] == i) && (shahw[1][p] == j)) {
            return 1;
        }
    }
    //допилить проверку пустых на шах
    for (p1 = 0; p1 < CellBlack.length; p1++) {
        if ((CellBlack[p1] != null) && (CellBlack[p1].attr("name") != "bking")) {

            ChekNKing(CellBlack[p1]);
        }
    }

    for (p = 0; p < 9; p++) {
        if ((shahw[0][p] == i) && (shahw[1][p] == j)) {
            return 1;
        }
    }
    return 0;
}




// подсветка и проверка ходов
function SetPosition(i,j)
{
    for (p = 0; p < 28; p++) {
        if (eat[0][p] == -1) {
            eat[0][p] = i;
            eat[1][p] = j;
            return;
        }
    }
}



function ChekPeshka(Cell) {
    var posi = $(Cell).parent().parent().children().index($(Cell).parent());
    var posj = $(Cell).parent().children().index($(Cell));

    //проверка пешки для белых
    if (jQuery.inArray($(Cell).attr("name"), white) > -1) {
        if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + posj + ")").attr("name") == "hell") {
            $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + posj + ")").css('border', '1px solid blue')
            SetPosition(posi-1,posj);
            if ((posi == 6) && ($("tr:eq(" + (posi - 2) + ")").find("td:eq(" + posj + ")").attr("name") == "hell")) {
                $("tr:eq(" + (posi - 2) + ")").find("td:eq(" + posj + ")").css('border', '1px solid blue')
                SetPosition(posi - 2, posj);
            }
        }
        if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), black) > -1) {
            $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '1px solid red')
            SetPosition(posi-1, posj-1);
        }
        if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), black) > -1) {
            $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '1px solid red')
            SetPosition(posi-1, posj+1);
        }
    }

    //проверка пешки для черных
    if (jQuery.inArray($(Cell).attr("name"), black) > -1) {
        if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + posj + ")").attr("name") == "hell") {
            $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + posj + ")").css('border', '1px solid blue')
            SetPosition(posi+1, posj);
            if ((posi == 1) && ($("tr:eq(" + (posi + 2) + ")").find("td:eq(" + posj + ")").attr("name") == "hell")) {
                $("tr:eq(" + (posi + 2) + ")").find("td:eq(" + posj + ")").css('border', '1px solid blue')
                SetPosition(posi+2, posj);
            }
        }
        if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), white) > -1) {
            $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '1px solid red')
            SetPosition(posi+1, posj-1);
        }
        if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), white) > -1) {
            $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '1px solid red')
            SetPosition(posi+1, posj+1);
        }
    }


}

function ChekLadya(Cell) {

    var posi = $(Cell).parent().parent().children().index($(Cell).parent());
    var posj = $(Cell).parent().children().index($(Cell));

    var i = 1;
    var cv = 0; //всегда белый

    if (jQuery.inArray($(Cell).attr("name"), black) > -1) { //да тогда черный
        cv = 1;
    }


    //выделяем все по вертикали вверх
    while ($("tr:eq(" + (posi - i) + ")").find("td:eq(" + posj + ")").attr("name") == "hell")
    {
        if ((posi - i) < 0) break;
        $("tr:eq(" + (posi - i) + ")").find("td:eq(" + posj + ")").css('border', '2px solid blue');
        SetPosition(posi - i, posj);        
        i = i + 1;
        }

    if (!((posi - i) < 0)) {
        //если враждебная
        if (cv == 0) {
            if (jQuery.inArray($("tr:eq(" + (posi - i) + ")").find("td:eq(" + posj + ")").attr("name"), black) > -1) {
                $("tr:eq(" + (posi - i) + ")").find("td:eq(" + posj + ")").css('border', '2px solid red');
                SetPosition(posi - i, posj);
            }
        }
        else {
            if (jQuery.inArray($("tr:eq(" + (posi - i) + ")").find("td:eq(" + posj + ")").attr("name"), white) > -1) {
                $("tr:eq(" + (posi - i) + ")").find("td:eq(" + posj + ")").css('border', '2px solid red');
                SetPosition(posi - i, posj);
            }
        }
    }

    i = 1;
    //выделяем все по вертикали вниз
    while ($("tr:eq(" + (posi + i) + ")").find("td:eq(" + posj + ")").attr("name") == "hell") {
        if ((posi + i) > 7) break;
        $("tr:eq(" + (posi + i) + ")").find("td:eq(" + posj + ")").css('border', '2px solid blue');
        SetPosition(posi + i, posj);
        i = i + 1;       
    }

    if (!((posi + i) > 7)) {
        //если враждебная
        if (cv == 0) {
            if (jQuery.inArray($("tr:eq(" + (posi + i) + ")").find("td:eq(" + posj + ")").attr("name"), black) > -1) {
                $("tr:eq(" + (posi + i) + ")").find("td:eq(" + posj + ")").css('border', '2px solid red');
                SetPosition(posi + i, posj);
            }
        }
        else {
            if (jQuery.inArray($("tr:eq(" + (posi + i) + ")").find("td:eq(" + posj + ")").attr("name"), white) > -1) {
                $("tr:eq(" + (posi + i) + ")").find("td:eq(" + posj + ")").css('border', '2px solid red');
                SetPosition(posi + i, posj);
            }
        }
    }



    i = 1;
    //выделяем все по горизонтали вправо
    while ($("tr:eq(" + posi + ")").find("td:eq(" + (posj + i) + ")").attr("name") == "hell") {
        if ((posj + i) > 7) break;
        $("tr:eq(" + posi + ")").find("td:eq(" + (posj + i) + ")").css('border', '2px solid blue');
        SetPosition(posi, posj+i);
        i = i + 1;      
    }

    if (!((posj + i) > 7)) {
        //если враждебная
        if (cv == 0) {
            if (jQuery.inArray($("tr:eq(" + posi + ")").find("td:eq(" + (posj + i) + ")").attr("name"), black) > -1) {
                $("tr:eq(" + posi + ")").find("td:eq(" + (posj + i) + ")").css('border', '2px solid red');
                SetPosition(posi, (posj + i));
            }
        }
        else {
            if (jQuery.inArray($("tr:eq(" + posi + ")").find("td:eq(" + (posj + i) + ")").attr("name"), white) > -1) {
                $("tr:eq(" + posi + ")").find("td:eq(" + (posj + i) + ")").css('border', '2px solid red');
                SetPosition(posi, (posj + i));
            }
        }
    }

    i = 1;
    //выделяем все по горизонтали влево
    while ($("tr:eq(" + posi + ")").find("td:eq(" + (posj - i) + ")").attr("name") == "hell") {
        if ((posj - i) < 0) break;
        $("tr:eq(" + posi + ")").find("td:eq(" + (posj - i) + ")").css('border', '2px solid blue');
        SetPosition(posi, posj - i);
        i = i + 1;       
    }

    if (!((posj - i) < 0)) {
        //если враждебная
        if (cv == 0) {
            if (jQuery.inArray($("tr:eq(" + posi + ")").find("td:eq(" + (posj - i) + ")").attr("name"), black) > -1) {
                $("tr:eq(" + posi + ")").find("td:eq(" + (posj - i) + ")").css('border', '2px solid red');
                SetPosition(posi, (posj - i));
            }
        }
        else {
            if (jQuery.inArray($("tr:eq(" + posi + ")").find("td:eq(" + (posj - i) + ")").attr("name"), white) > -1) {
                $("tr:eq(" + posi + ")").find("td:eq(" + (posj - i) + ")").css('border', '2px solid red');
                SetPosition(posi, (posj - i));
            }
        }
    }
}

function ChekHorse(Cell) {

    var posi = $(Cell).parent().parent().children().index($(Cell).parent());
    var posj = $(Cell).parent().children().index($(Cell));

    var cv = 0; //всегда белый

    if ($(Cell).attr("name") == "bhorse") { //да тогда черный
        cv = 1;
    }

    //если пусто
    if (posi + 2 <= 7) {
        if (posj - 1 > -1) {
            if ($("tr:eq(" + (posi + 2) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "hell") {
                $("tr:eq(" + (posi + 2) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid blue')
                SetPosition(posi + 2, posj - 1);
            }
        }
        if (posj + 1 <= 7) {
            if ($("tr:eq(" + (posi + 2) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "hell") {
                $("tr:eq(" + (posi + 2) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid blue')
                SetPosition(posi + 2, posj + 1);
            }
        }
    }

    if (posi - 2 > -1) {
        if (posj - 1 > -1) {
            if ($("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "hell") {
                $("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid blue')
                SetPosition(posi - 2, posj - 1);
            }
        }
        if (posj + 1 <= 7) {
            if ($("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "hell") {
                $("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid blue')
                SetPosition(posi - 2, posj + 1);
            }
        }
    }

    if (posi - 1 > -1) {
        if (posj + 2 < 8) {
            if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 2) + ")").attr("name") == "hell") {
                $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 2) + ")").css('border', '2px solid blue')
                SetPosition(posi - 1, posj + 2);
            }
        }
        if (posj - 1 > -1) {
            if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 2) + ")").attr("name") == "hell") {
                $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 2) + ")").css('border', '2px solid blue')
                SetPosition(posi - 1, posj - 2);
            }
        }
    }

    if (posi + 1 < 8) {
        if (posj + 2 < 8) {
            if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 2) + ")").attr("name") == "hell") {
                $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 2) + ")").css('border', '2px solid blue')
                SetPosition(posi + 1, posj + 2);
            }
        }
        if (posj - 2 > -1) {
            if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 2) + ")").attr("name") == "hell") {
                $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 2) + ")").css('border', '2px solid blue')
                SetPosition(posi + 1, posj - 2);
            }
        }
        }
    

    //если ты белый
    if (cv == 0) {
        if (posi + 2 <= 7) {
            if (posj - 1 > -1) {
                if (jQuery.inArray($("tr:eq(" + (posi + 2) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), black) > -1) {
                    $("tr:eq(" + (posi + 2) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid red')
                    SetPosition(posi + 2, posj - 1);
                }
            }
            if (posj + 1 <= 7) {
                if (jQuery.inArray($("tr:eq(" + (posi + 2) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), black) > -1) {
                    $("tr:eq(" + (posi + 2) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid red')
                    SetPosition(posi + 2, posj + 1);
                }
            }
        }
        
        if (posi - 2 > -1) {
            if (posj - 1 > -1) {
                if (jQuery.inArray($("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), black) > -1) {
                    $("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid red')
                    SetPosition(posi - 2, posj - 1);
                }
            }
            if (posj + 1 < 8) {
                if (jQuery.inArray($("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), black) > -1) {
                    $("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid red')
                    SetPosition(posi - 2, posj + 1);
                }
            }
        }

        if (posi-1>-1)     {
            if (posj +2 <8)
            {
                if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 2) + ")").attr("name"),black)>-1) {
                    $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 2) + ")").css('border', '2px solid red')
                    SetPosition(posi - 1, posj + 2);
                }
            }

            if (posj - 2 >-1)          {
                if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 2) + ")").attr("name"), black) > -1) {
                    $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 2) + ")").css('border', '2px solid red')
                    SetPosition(posi - 1, posj - 2);
                }
            }
        }

        if (posi+1<8)        {
            if (posj +2 <8)            {
                if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 2) + ")").attr("name"),black)>-1) {
                    $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 2) + ")").css('border', '2px solid red')
                    SetPosition(posi + 1, posj + 2);
                }
            }
            if (posj - 2 > -1) {
                if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 2) + ")").attr("name"), black) > -1) {
                    $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 2) + ")").css('border', '2px solid red')
                    SetPosition(posi + 1, posj - 2);
                }
            }
        }
    }
    //если ты черный
        if (cv == 1)
        {
            if (posi + 2 <= 7) {
                if (posj - 1 > -1) {
                    if (jQuery.inArray($("tr:eq(" + (posi + 2) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), white) > -1) {
                        $("tr:eq(" + (posi + 2) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid red')
                        SetPosition(posi + 2, posj - 1);
                    }
                }
                if (posj + 1 <= 7) {
                    if (jQuery.inArray($("tr:eq(" + (posi + 2) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), white) > -1) {
                        $("tr:eq(" + (posi + 2) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid red')
                        SetPosition(posi + 2, posj + 1);
                    }
                }
            }
        
            if (posi - 2 > -1) {
                if (posj - 1 > -1) {
                    if (jQuery.inArray($("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), white) > -1) {
                        $("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid red')
                        SetPosition(posi - 2, posj - 1);
                    }
                }
                if (posj + 1 < 8) {
                    if (jQuery.inArray($("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), white) > -1) {
                        $("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid red')
                        SetPosition(posi - 2, posj + 1);
                    }
                }
            }

            if (posi-1>-1)     {
                if (posj +2 <8)
                {
                    if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 2) + ")").attr("name"), white) > -1) {
                        $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 2) + ")").css('border', '2px solid red')
                        SetPosition(posi - 1, posj + 2);
                    }
                }

                if (posj - 2 >-1)          {
                    if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 2) + ")").attr("name"), white) > -1) {
                        $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 2) + ")").css('border', '2px solid red')
                        SetPosition(posi - 1, posj - 2);
                    }
                }
            }

            if (posi+1<8)        {
                if (posj +2 <8)            {
                    if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 2) + ")").attr("name"), white) > -1) {
                        $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 2) + ")").css('border', '2px solid red')
                        SetPosition(posi + 1, posj + 2);
                    }
                }
                if (posj - 2 >-1)  {     
                    if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 2) + ")").attr("name"), white) > -1) {
                        $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 2) + ")").css('border', '2px solid red')
                        SetPosition(posi + 1, posj - 2);
                    }
                }
            }
        }
}

function ChekOfficer(Cell) {
    var posi = $(Cell).parent().parent().children().index($(Cell).parent());
    var posj = $(Cell).parent().children().index($(Cell));

    var i = 1;
    var cv = 0; //всегда белый

    if (jQuery.inArray($(Cell).attr("name"), black) > -1) { //да тогда черный
        cv = 1;
    }


    //выделяем все по вертикали вверх
    while ($("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj - i) + ")").attr("name") == "hell") {
        if (((posi - i) < 0) || ((posj - i) < 0)) break;
        $("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj -i) + ")").css('border', '2px solid blue');
        SetPosition(posi - i, posj-i);
        i = i + 1;
    }

    if (!(((posi - i) < 0) || ((posj - i) < 0))) {
        //если враждебная
        if (cv == 0) {
            if (jQuery.inArray($("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj - i) + ")").attr("name"), black) > -1) {
                $("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj - i) + ")").css('border', '2px solid red');
                SetPosition(posi - i, (posj - i));
            }
        }
        else {
            if (jQuery.inArray($("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj - i) + ")").attr("name"), white) > -1) {
                $("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj - i) + ")").css('border', '2px solid red');
                SetPosition(posi - i, (posj - i));
            }
        }
    }

    i = 1;
    //выделяем все по вертикали вниз
    while ($("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj + i) + ")").attr("name") == "hell") {
        if (((posi + i) > 7) || ((posj + i)>7))  break;
        $("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj + i) + ")").css('border', '2px solid blue');
        SetPosition(posi + i, (posj + i));
        i = i + 1;        
    }

    if (!(((posi + i) > 7) || ((posj + i) > 7))) {
        //если враждебная
        if (cv == 0) {
            if (jQuery.inArray($("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj + i) + ")").attr("name"), black) > -1) {
                $("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj + i) + ")").css('border', '2px solid red');
                SetPosition(posi + i, posj + i);
            }
        }
        else {
            if (jQuery.inArray($("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj + i) + ")").attr("name"), white) > -1) {
                $("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj + i) + ")").css('border', '2px solid red');
                SetPosition(posi + i, (posj + i));
            }
        }
    }



    i = 1;
    //выделяем все по горизонтали вправо
    while ($("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj + i) + ")").attr("name") == "hell") {
        if (((posi - i ) < 0) || ((posj + i) > 7)) break;
        $("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj + i) + ")").css('border', '2px solid blue');
        SetPosition((posi - i), posj + i);
        i = i + 1;        
    }

    if (!(((posi - i) < 0) || ((posj + i) > 7))) {
        //если враждебная
        if (cv == 0) {
            if (jQuery.inArray($("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj + i) + ")").attr("name"), black) > -1) {
                $("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj + i) + ")").css('border', '2px solid red');
                SetPosition((posi - i), (posj + i));
            }
        }
        else {
            if (jQuery.inArray($("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj + i) + ")").attr("name"), white) > -1) {
                $("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj + i) + ")").css('border', '2px solid red');
                SetPosition((posi - i), (posj + i));
            }
        }
    }

    i = 1;
    //выделяем все по горизонтали влево
    while ($("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj - i) + ")").attr("name") == "hell") {
        if  (((posi+i)>7) || ((posj - i) < 0)) break;
        $("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj - i) + ")").css('border', '2px solid blue');
        SetPosition((posi + i), posj - i);
        i = i + 1;      
    }

    if (!(((posi + i) > 7) || ((posj - i) < 0))) {
        //если враждебная
        if (cv == 0) {
            if (jQuery.inArray($("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj - i) + ")").attr("name"), black) > -1) {
                $("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj - i) + ")").css('border', '2px solid red');
                SetPosition((posi + i), (posj - i));
            }
        }
        else {
            if (jQuery.inArray($("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj - i) + ")").attr("name"), white) > -1) {
                $("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj - i) + ")").css('border', '2px solid red');
                SetPosition((posi + i), (posj - i));
            }
        }
    }


}

function ChekQueen(Cell) {
    ChekLadya(Cell);
    ChekOfficer(Cell);
}

function ChekKing(Cell, f) {
    var posi = $(Cell).parent().parent().children().index($(Cell).parent());
    var posj = $(Cell).parent().children().index($(Cell));

    var i = 1;
    var cv = 0; //всегда белый

    if (jQuery.inArray($(Cell).attr("name"), black) > -1) { //да тогда черный
        cv = 1;
    }

    //если пусто
    if (posi - 1 > -1) {

        if (posj - 1 > -1) {
            if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "hell") {
                if (((cv==0) && (InShanw(posi - 1,posj - 1)==0)) || ((cv==1) && (InShanb(posi - 1,posj - 1)==0)))
                {
                    if (f) $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid blue');
                    SetPosition(posi - 1, posj - 1);
                }
            }
        }
            if (posj + 1 < 8) {
                if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "hell") {
                    if (((cv==0) && (InShanw(posi - 1,posj + 1)==0)) || ((cv==1) && (InShanb(posi - 1,posj + 1)==0)))
                    {
                        if (f) $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid blue');
                        SetPosition(posi - 1, posj + 1);
                    }
                }
            }
                if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj ) + ")").attr("name") == "hell") {
                    if (((cv==0) && (InShanw(posi - 1,posj )==0)) || ((cv==1) && (InShanb(posi - 1,posj)==0)))
                    {
                        if (f) $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj) + ")").css('border', '2px solid blue');
                        SetPosition(posi - 1, posj );
                    }
            }
    }
    if (posi + 1 < 8) {
        if (posj - 1 > -1) {
            if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "hell") {
                if (((cv==0) && (InShanw(posi + 1,posj - 1)==0)) || ((cv==1) && (InShanb(posi + 1,posj - 1)==0)))
                {
                    if (f) $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid blue');
                    SetPosition(posi + 1, posj - 1);
                }
            }
        }
        if (posj + 1 < 8) {
            if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "hell") {
                if (((cv==0) && (InShanw(posi + 1,posj + 1)==0)) || ((cv==1) && (InShanb(posi + 1,posj + 1)==0)))
                {
                    if (f) $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid blue');
                    SetPosition(posi + 1, posj + 1);
                }
            }
        }
            if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj) + ")").attr("name") == "hell") {
                if (((cv==0) && (InShanw(posi + 1,posj)==0)) || ((cv==1) && (InShanb(posi + 1,posj)==0)))
                {
                    if (f) $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj) + ")").css('border', '2px solid blue');
                    SetPosition(posi + 1, posj);
                }
        }
    }
    if (posj - 1 > -1) {
        if ($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "hell") {
            if (((cv==0) && (InShanw(posi,posj - 1)==0)) || ((cv==1) && (InShanb(posi,posj - 1)==0)))
            {
                if (f) $("tr:eq(" + (posi) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid blue');
                SetPosition(posi, posj - 1);
            }
        }
    }
    if (posj + 1 < 8) {
        if ($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "hell") {
            if (((cv==0) && (InShanw(posi,posj + 1)==0)) || ((cv==1) && (InShanb(posi, posj + 1)==0)))
            {
                if (f) $("tr:eq(" + (posi) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid blue');
                SetPosition(posi, posj + 1);
            }
        }
    }

    //если ты белый
    if (cv == 0) {
        if (posi - 1 > -1) {

            if (posj - 1 > -1) {
                if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), black) > -1) {
                    if (f) $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid red');
                    SetPosition(posi - 1, posj - 1);
                }
            }
            if (posj + 1 < 8) {
                if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), black) > -1) {
                    if (f) $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid red');
                    SetPosition(posi - 1, posj + 1);
                }
            }
            if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj) + ")").attr("name"), black) > -1) {
                if (f) $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj) + ")").css('border', '2px solid red');
                SetPosition(posi - 1, posj);
            }
        }
        if (posi + 1 < 8) {
            if (posj - 1 > -1) {
                if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), black) > -1) {
                    if (f) $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid red');
                    SetPosition(posi + 1, posj - 1);
                }
            }
            if (posj + 1 < 8) {
                if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), black) > -1) {
                    if (f) $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid red');
                    SetPosition(posi + 1, posj + 1);
                }
            }
            if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj) + ")").attr("name"), black) > -1) {
                if (f) $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj) + ")").css('border', '2px solid red');
                SetPosition(posi + 1, posj);
            }
        }
        if (posj - 1 > -1) {
            if (jQuery.inArray($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), black) > -1) {
                if (f) $("tr:eq(" + (posi) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid red');
                SetPosition(posi, posj - 1);
            }
        }
        if (posj + 1 < 8) {
            if (jQuery.inArray($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), black) > -1) {
                if (f) $("tr:eq(" + (posi) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid red');
                SetPosition(posi, posj + 1);
            }
        }

    }
    else { //если ты черный
        if (posi - 1 > -1) {

            if (posj - 1 > -1) {
                if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), white) > -1) {
                    if (f) $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid red');
                    SetPosition(posi - 1, posj - 1);
                }
            }
            if (posj + 1 < 8) {
                if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), white) > -1) {
                    if (f) $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid red');
                    SetPosition(posi - 1, posj + 1);
                }
            }
            if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj) + ")").attr("name"), white) > -1) {
                if (f) $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj) + ")").css('border', '2px solid red');
                SetPosition(posi - 1, posj);
            }
        }
        if (posi + 1 < 8) {
            if (posj - 1 > -1) {
                if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), white) > -1) {
                    if (f) $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid red');
                    SetPosition(posi + 1, posj - 1);
                }
            }
            if (posj + 1 < 8) {
                if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), white) > -1) {
                    if (f) $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid red');
                    SetPosition(posi + 1, posj + 1);
                }
            }
            if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj) + ")").attr("name"), white) > -1) {
                if (f) $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj) + ")").css('border', '2px solid red');
                SetPosition(posi + 1, posj);
            }
        }
        if (posj - 1 > -1) {
            if (jQuery.inArray($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), white) > -1) {
                if (f) $("tr:eq(" + (posi) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid red');
                SetPosition(posi, posj - 1);
            }
        }
        if (posj + 1 < 8) {
            if (jQuery.inArray($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), white) > -1) {
                if (f) $("tr:eq(" + (posi) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid red');
                SetPosition(posi, posj + 1);
            }
        }
    }
}

function Chek(Cell)
{
    if (($(Cell).attr("name")=="bladya") || ($(Cell).attr("name")=="wladya"))
    {
        ChekLadya(Cell);
    }
    if (($(Cell).attr("name") == "bhorse") || ($(Cell).attr("name") == "whorse"))
    {
        ChekHorse(Cell);
    }
    if (($(Cell).attr("name") == "bofficer") || ($(Cell).attr("name") == "wofficer"))
    {
        ChekOfficer(Cell);
    }
    if (($(Cell).attr("name") == "bqueen") || ($(Cell).attr("name") == "wqueen"))
    {
        ChekQueen(Cell);
    }
    if (($(Cell).attr("name") == "bking") || ($(Cell).attr("name") == "wking"))
    {
        ChekKing(Cell,true);
    }
    if (($(Cell).attr("name") == "bpeshka") || ($(Cell).attr("name") == "wpeshka"))
    {
        ChekPeshka(Cell);
    }
}


// проверка на шах и мат

function ChekNPeshka(Cell) {
    var posi = $(Cell).parent().parent().children().index($(Cell).parent());
    var posj = $(Cell).parent().children().index($(Cell));

    //проверка пешки для белых
    if (jQuery.inArray($(Cell).attr("name"), white) > -1) {
        if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + posj + ")").attr("name") == "bking") {
            SetShahb(posi - 1, posj, true, Cell, posi - 1, posj);
            if ((posi == 6) && ($("tr:eq(" + (posi - 2) + ")").find("td:eq(" + posj + ")").attr("name") == "bking")) {
                SetShahb(posi - 1, posj, true, Cell, posi - 1, posj);
            }
        }
    }

    //проверка пешки для черных
    if (jQuery.inArray($(Cell).attr("name"), black) > -1) {
        if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + posj + ")").attr("name") == "wking") {
            SetShahw(posi + 1, posj, true, Cell, posi + 1, posj);
            if ((posi == 1) && ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + posj + ")").attr("name") == "wking")) {
                SetShahw(posi + 2, posj, true, Cell, posi + 2, posj);
            }
        }     
    }
}

function ChekNLadya(Cell) {

    var posi = $(Cell).parent().parent().children().index($(Cell).parent());
    var posj = $(Cell).parent().children().index($(Cell));

    var i = 1;
    var cv = 0; //всегда белый

    if (jQuery.inArray($(Cell).attr("name"), black) > -1) { //да тогда черный
        cv = 1;
    }


    //выделяем все по вертикали вверх
    while ($("tr:eq(" + (posi - i) + ")").find("td:eq(" + posj + ")").attr("name") == "hell") {
        if ((posi - i) < 0) break;
        CheckNearKing($("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj) + ")"), cv);
        i = i + 1;
    }

    if (!((posi - i) < 0)) {
        //если враждебная
        if (cv == 0) {
            if ($("tr:eq(" + (posi - i) + ")").find("td:eq(" + posj + ")").attr("name") == "bking") {
                SetShahb(posi - (i - 1), posj, true, Cell, posi - i, posj);
                if (($("tr:eq(" + (posi - (i+1)) + ")").find("td:eq(" + posj + ")").attr("name")=="hell") && (posi - (i+1)>-1))
                SetShahb(posi - (i+1), posj, false, Cell,-1,-1);
            }
        }
        else {
            if ($("tr:eq(" + (posi - i) + ")").find("td:eq(" + posj + ")").attr("name") == "wking") {
                SetShahw(posi - (i - 1), posj, true, Cell, posi - i, posj);
                if (($("tr:eq(" + (posi - (i+1)) + ")").find("td:eq(" + posj + ")").attr("name")=="hell") && (posi - (i+1)>-1))
                SetShahw(posi - (i+1), posj, false,Cell,-1,-1);
            }
        }
    }

    i = 1;
    //выделяем все по вертикали вниз
    while ($("tr:eq(" + (posi + i) + ")").find("td:eq(" + posj + ")").attr("name") == "hell") {
        if ((posi + i) > 7) break;
        CheckNearKing($("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj ) + ")"),cv);
        i = i + 1;
    }

    if (!((posi + i) > 7)) {
        //если враждебная
        if (cv == 0) {
            if ($("tr:eq(" + (posi + i) + ")").find("td:eq(" + posj + ")").attr("name") == "bking") {
                SetShahb(posi + (i - 1), posj, true, Cell, posi + i, posj);
                if (($("tr:eq(" + (posi + i+1) + ")").find("td:eq(" + posj + ")").attr("name")=="hell")&&((posi + i+1)<8))
                    SetShahb(posi + i + 1, posj, false, Cell,-1,-1);
            }
        }
        else {
            if ($("tr:eq(" + (posi + i) + ")").find("td:eq(" + posj + ")").attr("name") == "wking") {
                SetShahw(posi + (i - 1), posj, true, Cell, posi + i, posj);
                if (($("tr:eq(" + (posi + i+1) + ")").find("td:eq(" + posj + ")").attr("name")=="hell")&&((posi + i+1)<8))
                    SetShahw(posi + i + 1, posj, false, Cell,-1,-1);
            }
        }
    }



    i = 1;
    //выделяем все по горизонтали вправо
    while ($("tr:eq(" + posi + ")").find("td:eq(" + (posj + i) + ")").attr("name") == "hell") {
        if ((posj + i) > 7) break;   
        CheckNearKing($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj+i ) + ")"),cv);
        i = i + 1;
    }

    if (!((posj + i) > 7)) {
        //если враждебная
        if (cv == 0) {
            if ($("tr:eq(" + posi + ")").find("td:eq(" + (posj + i) + ")").attr("name") == "bking") {
                SetShahb(posi, posj + (i - 1), true, Cell, posi, posj + i);
                if (($("tr:eq(" + posi + ")").find("td:eq(" + (posj + i+1) + ")").attr("name")=="hell") && ((posj + i)<8))
                    SetShahb(posi, (posj + i + 1), false, Cell,-1,-1);
            }
        }
        else {
            if ($("tr:eq(" + posi + ")").find("td:eq(" + (posj + i) + ")").attr("name") == "wking") {
                SetShahw(posi, posj + (i - 1), true, Cell, posi, posj + i);
                if (($("tr:eq(" + posi + ")").find("td:eq(" + (posj + i+1) + ")").attr("name")=="hell") && ((posj + i)<8))
                    SetShahw(posi, (posj + i + 1), false, Cell,-1,-1);
            }
        }
    }

    i = 1;
    //выделяем все по горизонтали влево
    while ($("tr:eq(" + posi + ")").find("td:eq(" + (posj - i) + ")").attr("name") == "hell") {
        if ((posj - i) < 0) break;
        CheckNearKing($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj -i ) + ")"),cv);
        i = i + 1;
    }

    if (!((posj - i) < 0)) {
        //если враждебная
        if (cv == 0) {
            if ($("tr:eq(" + posi + ")").find("td:eq(" + (posj - i) + ")").attr("name") == "bking") {
                SetShahb(posi, (posj - (i - 1)), true, Cell, posi, posj - i);
                if (($("tr:eq(" + posi + ")").find("td:eq(" + (posj - i-1) + ")").attr("name")=="hell")&&((posj - i-1)>-1))
                    SetShahb(posi, (posj - i - 1), false, Cell,-1,-1);
            }
        }
        else {
            if ($("tr:eq(" + posi + ")").find("td:eq(" + (posj - i) + ")").attr("name") == "wking") {
                SetShahw(posi, posj - (i - 1), true, Cell, posi, posj - i);
                if (($("tr:eq(" + posi + ")").find("td:eq(" + (posj - i-1) + ")").attr("name")=="hell")&&((posj - i-1)>-1))
                    SetShahw(posi, (posj - i - 1), false, Cell,-1,-1);
            }
        }
    }
}

function ChekNHorse(Cell) {

    var posi = $(Cell).parent().parent().children().index($(Cell).parent());
    var posj = $(Cell).parent().children().index($(Cell));

    var cv = 0; //всегда белый

    if ($(Cell).attr("name") == "bhorse") { //да тогда черный
        cv = 1;
    }

    
    //если ты белый
    if (cv == 0) {
        if (posi + 2 <= 7) {
            if (posj - 1 > -1) {
                if ($("tr:eq(" + (posi + 2) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "bking") {
                    SetShahb(posi + 2, posj - 1, true, Cell, posi + 2, posj - 1);
                }
            }
            if (posj + 1 <= 7) {
                if ($("tr:eq(" + (posi + 2) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "bking") {
                    SetShahb(posi + 2, posj + 1, true, Cell, posi + 2, posj + 1);
                }
            }
        }
        
        if (posi - 2 > -1) {
            if (posj - 1 > -1) {
                if ($("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "bking") {
                    SetShahb(posi - 2, posj - 1, true, Cell, posi - 2, posj - 1);
                }
            }
            if (posj + 1 < 8) {
                if ($("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "bking") {
                    SetShahb(posi - 2, posj + 1, true, Cell, posi - 2, posj + 1);
                }
            }
        }

        if (posi-1>-1)     {
            if (posj +2 <8)
            {
                if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 2) + ")").attr("name") == "bking") {
                    SetShahb(posi - 1, posj + 2, true, Cell, posi - 1, posj + 2);
                }
            }

            if (posj - 2 >-1)          {
                if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 2) + ")").attr("name") == "bking") {
                    SetShahb(posi - 1, posj - 2, true, Cell, posi - 1, posj - 2);
                }
            }
        }

        if (posi+1<8)        {
            if (posj +2 <8)            {
                if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 2) + ")").attr("name") == "bking") {
                    SetShahb(posi + 1, posj + 2, true, Cell, posi + 1, posj + 2);
                }
            }
            if (posj - 2 > -1) {
                if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 2) + ")").attr("name") == "bking") {
                    SetShahb(posi + 1, posj - 2, true, Cell, posi + 1, posj - 2);
                }
            }
        }
    }
    //если ты черный
    if (cv == 1)
    {
        if (posi + 2 <= 7) {
            if (posj - 1 > -1) {
                if ($("tr:eq(" + (posi + 2) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "wking") {
                    SetShahw(posi + 2, posj - 1, true, Cell, posi + 2, posj - 1);
                }
            }
            if (posj + 1 <= 7) {
                if ($("tr:eq(" + (posi + 2) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "wking") {
                    SetShahw(posi + 2, posj + 1, true, Cell, posi + 2, posj + 1);
                }
            }
        }
        
        if (posi - 2 > -1) {
            if (posj - 1 > -1) {
                if ($("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "wking") {
                    SetShahw(posi - 2, posj - 1, true, Cell, posi - 2, posj - 1);
                }
            }
            if (posj + 1 < 8) {
                if ($("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "wking") {
                    SetShahw(posi - 2, posj + 1, true, Cell, posi - 2, posj + 1);
                }
            }
        }

        if (posi-1>-1)     {
            if (posj +2 <8)
            {
                if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 2) + ")").attr("name") == "wking") {
                    SetShahw(posi - 1, posj + 2, true, Cell, posi - 1, posj + 2);
                }
            }

            if (posj - 2 >-1)          {
                if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 2) + ")").attr("name") == "wking") {
                    SetShahw(posi - 1, posj - 2, true, Cell, posi - 1, posj - 2);
                }
            }
        }

        if (posi+1<8)        {
            if (posj +2 <8)            {
                if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 2) + ")").attr("name") == "wking") {
                    SetShahw(posi + 1, posj + 2, true, Cell, posi + 1, posj + 2);
                }
            }
            if (posj - 2 > -1) {
                if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 2) + ")").attr("name") == "wking") {
                    SetShahw(posi + 1, posj - 2, true, Cell, posi + 1, posj - 2);
                }
            }
        
        }
    }
}

function ChekNOfficer(Cell) {
    var posi = $(Cell).parent().parent().children().index($(Cell).parent());
    var posj = $(Cell).parent().children().index($(Cell));

    var i = 1;
    var cv = 0; //всегда белый

    if (jQuery.inArray($(Cell).attr("name"), black) > -1) { //да тогда черный
        cv = 1;
    }


    //выделяем все по вертикали вверх
    while ($("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj - i) + ")").attr("name") == "hell") {
        if (((posi - i) < 0) || ((posj - i) < 0)) break;
        CheckNearKing($("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj - i) + ")"),cv);
        i = i + 1;
    }

    if (!(((posi - i) < 0) || ((posj - i) < 0))) {
        //если враждебная
        if (cv == 0) {
            if ($("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj - i) + ")").attr("name") == "bking") {
                SetShahb(posi - (i - 1), (posj - (i - 1)), true, Cell, posi - i, posj - i);
                if (($("tr:eq(" + (posi - i-1) + ")").find("td:eq(" + (posj - i-1) + ")").attr("name")=="hell")&& ((posi - i-1)>-1)&& ((posj - i-1)>-1) )
                    SetShahb(posi - i - 1, (posj - i - 1), false, Cell,-1,-1);
            }
        }
        else {
            if ($("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj - i) + ")").attr("name") == "wking") {
                SetShahw(posi - (i - 1), (posj - (i - 1)), true, Cell, posi - i, posj - i);
                if (($("tr:eq(" + (posi - i-1) + ")").find("td:eq(" + (posj - i-1) + ")").attr("name")=="hell")&& ((posi - i-1)>-1)&& ((posj - i-1)>-1) )
                    SetShahw(posi - i - 1, (posj - i - 1), false, Cell,-1,-1);
            }
        }
    }

    i = 1;
    //выделяем все по вертикали вниз
    while ($("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj + i) + ")").attr("name") == "hell") {
        if (((posi + i) > 7) || ((posj + i)>7))  break;
        CheckNearKing($("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj + i) + ")"),cv);
        i = i + 1;        
    }

    if (!(((posi + i) > 7) || ((posj + i) > 7))) {
        //если враждебная
        if (cv == 0) {
            if ($("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj + i) + ")").attr("name") == "bking") {
                SetShahb(posi + (i - 1), posj + (i - 1), true, Cell, posi + i, posj + i);
                if (($("tr:eq(" + (posi + i+1) + ")").find("td:eq(" + (posj + i+1) + ")").attr("name")=="hell")&&((posi + i+1)<8)&&((posj + i+1)<8))
                    SetShahb(posi + i+1, posj + i+1,false,Cell,-1,-1);
            }
        }
        else {
            if ($("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj + i) + ")").attr("name") == "wking") {
                SetShahw(posi + (i - 1), posj + (i - 1), true, Cell, posi + i, posj + i);
                if (($("tr:eq(" + (posi + i+1) + ")").find("td:eq(" + (posj + i+1) + ")").attr("name")=="hell")&&((posi + i+1)<8)&&((posj + i+1)<8))
                    SetShahw(posi + i + 1, posj + i + 1, false, Cell,-1,-1);
            }
        }
    }



    i = 1;
    //выделяем все по горизонтали вправо
    while ($("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj + i) + ")").attr("name") == "hell") {
        if (((posi - i ) < 0) || ((posj + i) > 7)) break;
        CheckNearKing($("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj + i) + ")"),cv);
        i = i + 1;        
    }

    if (!(((posi - i) < 0) || ((posj + i) > 7))) {
        //если враждебная
        if (cv == 0) {
            if ($("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj + i) + ")").attr("name") == "bking") {
                SetShahb((posi - (i - 1)), (posj + (i - 1)), true, Cell, posi - i, posj + i);
                if (($("tr:eq(" + (posi - i-1) + ")").find("td:eq(" + (posj + i+1) + ")").attr("name")=="hell")&&((posi - i-1)>-1)&&((posj + i+1)<8))
                    SetShahb((posi - i - 1), (posj + i + 1), false, Cell,-1,-1);
            }
        }
        else {
            if ($("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj + i) + ")").attr("name") == "wking") {
                SetShahw((posi - (i - 1)), (posj + (i - 1)), true, Cell, posi - i, posj + i);
                if (($("tr:eq(" + (posi - i-1) + ")").find("td:eq(" + (posj + i+1) + ")").attr("name")=="hell")&&((posi - i-1)>-1)&&((posj + i+1)<8))
                    SetShahw((posi - i - 1), (posj + i + 1), false, Cell,-1,-1);
            }
        }
    }

    i = 1;
    //выделяем все по горизонтали влево
    while ($("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj - i) + ")").attr("name") == "hell") {
        if  (((posi+i)>7) || ((posj - i) < 0)) break;
        CheckNearKing($("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj - i) + ")"),cv);
        i = i + 1;      
    }

    if (!(((posi + i) > 7) || ((posj - i) < 0))) {
        //если враждебная
        if (cv == 0) {
            if ($("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj - i) + ")").attr("name") == "bking") {
                SetShahb((posi + (i - 1)), (posj - (i - 1)), true, Cell, posi + i, posj - i);
                if (($("tr:eq(" + (posi + i+1) + ")").find("td:eq(" + (posj - i-1) + ")").attr("name")=="hell")&&((posi + i+1)<8)&&((posj - i-1)>-1))
                    SetShahb((posi + i + 1), (posj - i - 1), false, Cell,-1,-1);
            }
        }
        else {
            if ($("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj - i) + ")").attr("name") == "wking") {
                SetShahw((posi + (i - 1)), (posj - (i - 1)), true, Cell, posi + i, posj - i);
                if (($("tr:eq(" + (posi + i+1) + ")").find("td:eq(" + (posj - i-1) + ")").attr("name")=="hell")&&((posi + i+1)<8)&&((posj - i-1)>-1))
                    SetShahw((posi + i + 1), (posj - i - 1), false, Cell,-1,-1);
            }
        }
    }


}

function ChekNQueen(Cell) {
    ChekNLadya(Cell);
    ChekNOfficer(Cell);
}

function CheckNearKing(Cell, cv) {

    var posi = $(Cell).parent().parent().children().index($(Cell).parent());
    var posj = $(Cell).parent().children().index($(Cell));

    var i = 1;
    //если ты белый
    if (cv == 0) {
        if (posi - 1 > -1) {

            if (posj - 1 > -1) {
                if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "bking") {
                    SetShahb(posi, posj, false, Cell,-1,-1);
                }
            }
            if (posj + 1 < 8) {
                if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "bking") {
                    SetShahb(posi, posj, false, Cell, -1,- 1);
                }
            }
            if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj) + ")").attr("name") == "bking") {
                SetShahb(posi, posj, false, Cell,- 1, -1);
            }
        }
        if (posi + 1 < 8) {
            if (posj - 1 > -1) {
                if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "bking") {
                    SetShahb(posi, posj, false, Cell, -1, -1);
                }
            }
            if (posj + 1 < 8) {
                if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "bking") {
                    SetShahb(posi, posj, false, Cell, -1,- 1);
                }
            }
            if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj) + ")").attr("name") == "bking") {
                SetShahb(posi, posj, false, Cell, -1, -1);
            }
        }
        if (posj - 1 > -1) {
            if ($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "bking") {
                SetShahb(posi, posj, false, Cell, -1, -1);
            }
        }
        if (posj + 1 < 8) {
            if ($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "bking") {
                SetShahb(posi, posj, false, Cell, -1,- 1);
            }
        }

    }
    else { //если ты черный
        if (posi - 1 > -1) {

            if (posi - 1 > -1) {

                if (posj - 1 > -1) {
                    if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "wking") {
                        SetShahw(posi, posj, false, Cell,-1,-1);
                    }
                }
                if (posj + 1 < 8) {
                    if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "wking") {
                        SetShahw(posi, posj, false, Cell,- 1,- 1);
                    }
                }
                if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj) + ")").attr("name") == "wking") {
                    SetShahw(posi, posj, false, Cell,- 1,- 1);
                }
            }
            if (posi + 1 < 8) {
                if (posj - 1 > -1) {
                    if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "wking") {
                        SetShahw(posi, posj, false, Cell,- 1,- 1);
                    }
                }
                if (posj + 1 < 8) {
                    if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "wking") {
                        SetShahw(posi, posj, false, Cell,- 1,- 1);
                    }
                }
                if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj) + ")").attr("name") == "wking") {
                    SetShahw(posi, posj, false, Cell, -1,- 1);
                }
            }
            if (posj - 1 > -1) {
                if ($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "wking") {
                    SetShahw(posi, posj, false, Cell,- 1,- 1);
                }
            }
            if (posj + 1 < 8) {
                if ($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "wking") {
                    SetShahw(posi, posj, false, Cell,- 1, -1);
                }
            }
        }
    }
}

function ChekNKing(Cell) {
    if (($(Cell).attr("name") == "bladya") || ($(Cell).attr("name") == "wladya")) {
        ChekNLadya(Cell);
    }
    if (($(Cell).attr("name") == "bhorse") || ($(Cell).attr("name") == "whorse")) {
        ChekNHorse(Cell);
    }
    if (($(Cell).attr("name") == "bofficer") || ($(Cell).attr("name") == "wofficer")) {
        ChekNOfficer(Cell);
    }
    if (($(Cell).attr("name") == "bqueen") || ($(Cell).attr("name") == "wqueen")) {
        ChekNQueen(Cell);
    }
    if (($(Cell).attr("name") == "bpeshka") || ($(Cell).attr("name") == "wpeshka")) {
        ChekNPeshka(Cell);
    }

    if ($(Cell).attr("name") == "wking")  {
        clearshahw();
    }

    if ($(Cell).attr("name") == "bking") {
        clearshahb();
    }

}




    //переместить элемент
function GO(Cell, xfrom, yfrom, xto, yto, newfigure) {

    if (xfrom == undefined) {
        var i = $(Cell).parent().parent().children().index($(Cell).parent());
        var j = $(Cell).parent().children().index($(Cell));
    }
    else {
        var i = yto;
        var j = xto;
        SetPosition(i, j)
    }

    if (Cell == null) {
        Cell = $("tr:eq(" + yto + ")").find("td:eq(" + xto + ")");
    }
        clearshahw();
        clearshahb();
        
        //проверка можно ли ходить вставить
 
        if (Checkcell(i, j) == 1) {
            if (xto == undefined) {
                var obj = $("tr:eq(" + SelI + ")").find("td:eq(" + SelJ + ")");
            }
            else {
                var obj = $("tr:eq(" + yfrom + ")").find("td:eq(" + xfrom + ")");
            }
     
          //  if (jQuery.inArray($(Cell).attr("name"), black) > -1) CellBlack[jQuery.inArray($(Cell), CellBlack)] = null;
           // if (jQuery.inArray($(Cell).attr("name"), white) > -1) CellWhite[jQuery.inArray($(Cell), CellWhite)] = null;

            $(Cell).css("backgroundImage", "url(" + obj.attr("name") + ".png)");
            $(Cell).attr("name", obj.attr("name"));
            if (jQuery.inArray(obj.attr("name"), black) > -1) {
                for (h = 0; h < CellBlack.length/2; h++) {
                    if (CellBlack[h].parent().parent().children().index(CellBlack[h].parent()) == SelI)
                        if (CellBlack[h].parent().children().index(CellBlack[h]) == SelJ) {
                            bj = $("tr:eq(" + i + ")").find("td:eq(" + j + ")");
                            CellBlack[h] = bj;
                            break;
                        }
                }
            }
            if (jQuery.inArray(obj.attr("name"), white) > -1) {
                for (h = 0; h < CellWhite.length/2; h++) {
                    if (CellWhite[h].parent().parent().children().index(CellWhite[h].parent()) == SelI)
                        if (CellWhite[h].parent().children().index(CellWhite[h]) == SelJ) {
                            qj = $("tr:eq(" + i + ")").find("td:eq(" + j + ")");
                            CellWhite[h] = qj;
                            break;
                        }
                }
            }

            obj.attr("name", "hell")
            obj.css('border', '0px ');
            obj.css("backgroundImage", "");
            //  whoplay = !whoplay;
            whogo = !whogo;
            var who;
            clear();

            ChekNKing(Cell); //проверяем на шах    
            if (($(Cell).attr("name") == "wking"))
                WhiteShah = 0;
            if (($(Cell).attr("name") == "bking"))
                BlackShah = 0;


            var peshkawho = null;
            // когда пешка дошла до конца выбор кем станет
            if (($(Cell).attr("name") == "wpeshka") && (i == 0)) {
                if (newfigure == undefined) {
                    while (1) {
                        who = prompt('1-Слон \r\n 2-Конь \r\n 3-Ладья \r\n 4-Ферзь', 1)
                        if ((who >= 1) && (who <= 4))
                            break;
                    }
                }
                else
                {
                    if (newfigure == "bishop") who = 1;
                    if (newfigure == "knight") who = 2;
                    if (newfigure == "rook") who =3;
                    if (newfigure == "queen") who = 4;
                    }
                if (who == 1) {
                    $(Cell).css("backgroundImage", "url(wofficer.png)");
                    $(Cell).attr("name", "wofficer");
                    peshkawho = "bishop";
                }
                if (who == 2) {
                    $(Cell).css("backgroundImage", "url(whorse.png)");
                    $(Cell).attr("name", "whorse");
                    peshkawho = "knight";
                }
                if (who == 3) {
                    $(Cell).css("backgroundImage", "url(wladya.png)");
                    $(Cell).attr("name", "wladya");
                    peshkawho = "rook";
                }
                if (who == 4) {
                    $(Cell).css("backgroundImage", "url(wqueen.png)");
                    $(Cell).attr("name", "wqueen");
                    peshkawho = "queen";
                }
            }


            if (($(Cell).attr("name") == "bpeshka") && (i == 7)) {
                if (newfigure == undefined) {
                    while (1) {
                        who = prompt('1-Слон \r\n 2-Конь \r\n 3-Ладья \r\n 4-Ферзь', 1)
                        if ((who >= 1) && (who <= 4))
                            break;
                    }
                }
                else {
                    if (newfigure == "bishop") who = 1;
                    if (newfigure == "knight") who = 2;
                    if (newfigure == "rook") who = 3;
                    if (newfigure == "queen") who = 4;
                }
                if (who == 1) {
                    $(Cell).css("backgroundImage", "url(bofficer.png)");
                    $(Cell).attr("name", "bofficer");
                    peshkawho = "bishop";
                }
                if (who == 2) {
                    $(Cell).css("backgroundImage", "url(bhorse.png)");
                    $(Cell).attr("name", "bhorse");
                    peshkawho = "knight";
                }
                if (who == 3) {
                    $(Cell).css("backgroundImage", "url(bladya.png)");
                    $(Cell).attr("name", "bladya");
                    peshkawho = "rook";
                }
                if (who == 4) {
                    $(Cell).css("backgroundImage", "url(bqueen.png)");
                    $(Cell).attr("name", "bqueen");
                    peshkawho = "queen";
                }
            }

            if (xfrom != undefined) return; // выходим если нам прислали     

            if (peshkawho == null)
                socket.emit("makeMove",
                {
                    xfrom: SelJ,
                    yfrom: SelI,
                    xto: j,
                    yto: i,
                }
                    );
            else
                socket.emit("makeMove",
               {
                   xfrom: SelJ,
                   yfrom: SelI,
                   xto: j,
                   yto: i,
                   newfigure: peshkawho,
               }
                   );
            SelI = -1;
            SelJ = -1;

           

           
        }
        else {
            alert("Недопустимый ход")
        }
    }

    function cellClick(cll)
    {

        if (SelI == -1) {
            if ((jQuery.inArray($(cll).attr("name"), black) > -1) && (whoplay == 1) && (whogo == whoplay)) {
                SelBlack(cll);
            }
            else {
                if ((jQuery.inArray($(cll).attr("name"), white) > -1) && (whoplay == 0) && (whogo == whoplay)) {
                    SelWhite(cll);
                }
            }
        }
        else {
            if ((jQuery.inArray($(cll).attr("name"), black) > -1)) {
                SelBlack(cll);
            }
            else {
                if ((jQuery.inArray($(cll).attr("name"), white) > -1)) {
                    SelWhite(cll);
                }
                else {
                    if (($(cll).attr("name") == "hell") && (SelI != -1) && (SelJ != -1)) {
                        GO(cll, undefined, undefined, undefined, undefined, undefined);
                    }
                }
            }
       
        }
    }


    

