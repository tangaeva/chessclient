var whoplay = 0 //Чей ход 0 - белый 1 черные
var SelI = -1;
var SelJ = -1;
var black = ["bladya", "bhorse", "bofficer", "bqueen", "bking", "bpeshka"]
var white = ["wladya", "whorse", "wofficer", "wqueen", "wking", "wpeshka"]
var WhiteShah = 0; //шах белым
var BlackShah = 0; //шах черным

var eat = { //позиции, куда может быть осуществлен ход
    t1: { I: -1, J: -1 },
    t2: { I: -1, J: -1 },
    t3: { I: -1, J: -1 },
    t4: { I: -1, J: -1 },
    t5: { I: -1, J: -1 },
    t6: { I: -1, J: -1 },
    t7: { I: -1, J: -1 },
    t8: { I: -1, J: -1 },
    t9: { I: -1, J: -1 },
    t10: { I: -1, J: -1 },
    t11: { I: -1, J: -1 },
    t12: { I: -1, J: -1 },
    t13: { I: -1, J: -1 },
    t14: { I: -1, J: -1 },
    t15: { I: -1, J: -1 },
    t16: { I: -1, J: -1 },
    t17: { I: -1, J: -1 },
    t18: { I: -1, J: -1 },
    t19: { I: -1, J: -1 },
    t20: { I: -1, J: -1 },
    t21: { I: -1, J: -1 },
    t22: { I: -1, J: -1 },
    t23: { I: -1, J: -1 },
    t24: { I: -1, J: -1 },
    t25: { I: -1, J: -1 },
    t26: { I: -1, J: -1 },
    t27: { I: -1, J: -1 }
};

var shahw = { //массив шах/мат
    t1: { I: -1, J: -1 },
    t2: { I: -1, J: -1 },
    t3: { I: -1, J: -1 },
    t4: { I: -1, J: -1 },
    t5: { I: -1, J: -1 },
    t6: { I: -1, J: -1 },
    t7: { I: -1, J: -1 },
    t8: { I: -1, J: -1 },
}

var shahb = { //массив шах/мат
    t1: { I: -1, J: -1 },
    t2: { I: -1, J: -1 },
    t3: { I: -1, J: -1 },
    t4: { I: -1, J: -1 },
    t5: { I: -1, J: -1 },
    t6: { I: -1, J: -1 },
    t7: { I: -1, J: -1 },
    t8: { I: -1, J: -1 },
}

function clearshahw()
{
    shahw.t1.I = -1;
    shahw.t1.J = -1;
    shahw.t2.I = -1;
    shahw.t2.J = -1;
    shahw.t3.I = -1;
    shahw.t3.J = -1;
    shahw.t4.I = -1;
    shahw.t4.J = -1;
    shahw.t5.I = -1;
    shahw.t5.J = -1;
    shahw.t6.I = -1;
    shahw.t6.J = -1;
    shahw.t7.I = -1;
    shahw.t7.J = -1;
    shahw.t8.I = -1;
    shahw.t8.J = -1;
    WhiteShah = 0;
}

function clearshahb() {
    shahb.t1.I = -1;
    shahb.t1.J = -1;
    shahb.t2.I = -1;
    shahb.t2.J = -1;
    shahb.t3.I = -1;
    shahb.t3.J = -1;
    shahb.t4.I = -1;
    shahb.t4.J = -1;
    shahb.t5.I = -1;
    shahb.t5.J = -1;
    shahb.t6.I = -1;
    shahb.t6.J = -1;
    shahb.t7.I = -1;
    shahb.t7.J = -1;
    shahb.t8.I = -1;
    shahb.t8.J = -1;
    BlackShah = 0;
}

function SelBlack(Cell) {
    var i = $(Cell).parent().parent().children().index($(Cell).parent());
    var j = $(Cell).parent().children().index($(Cell));

    if ((i == SelI) && (j == SelJ)) {
        $(Cell).css('border', '0px solid black ');
        clear();
        return;
    }

    if ((SelI == -1) && (SelJ == -1)) {
        $(Cell).css('border', '1px solid yellow');
        SelI = i;
        SelJ = j;
        Chek(Cell); //проверка выделение
        return;
    }
    GO(Cell);

}

function SelWhite(Cell) {
    var i = $(Cell).parent().parent().children().index($(Cell).parent());
    var j = $(Cell).parent().children().index($(Cell));

    if ((i == SelI) && (j == SelJ)) {
        $(Cell).css('border', '0px solid black ');
        clear();
        return;
    }
    if ((SelI == -1) && (SelJ == -1)) {
        $(Cell).css('border', '1px solid yellow');
        SelI = i;
        SelJ = j;
        Chek(Cell); //проверка выделение
        return;
    }
    GO(Cell);
}

//очистка после хода
function clear() {
 
    if (eat.t1.I != -1) {
        $("tr:eq(" + (eat.t1.I) + ")").find("td:eq(" + eat.t1.J + ")").css('border', '0px solid black')
    }
    if (eat.t2.I != -1) {
        $("tr:eq(" + (eat.t2.I) + ")").find("td:eq(" + eat.t2.J + ")").css('border', '0px solid black')
    }
    if (eat.t3.I != -1) {
        $("tr:eq(" + (eat.t3.I) + ")").find("td:eq(" + eat.t3.J + ")").css('border', '0px solid black')
    }
    if (eat.t4.I != -1) {
        $("tr:eq(" + (eat.t4.I) + ")").find("td:eq(" + eat.t4.J + ")").css('border', '0px solid black')
    }
    if (eat.t5.I != -1) {
        $("tr:eq(" + (eat.t5.I) + ")").find("td:eq(" + eat.t5.J + ")").css('border', '0px solid black')
    }
    if (eat.t6.I != -1) {
        $("tr:eq(" + (eat.t6.I) + ")").find("td:eq(" + eat.t6.J + ")").css('border', '0px solid black')
    }
    if (eat.t7.I != -1) {
        $("tr:eq(" + (eat.t7.I) + ")").find("td:eq(" + eat.t7.J + ")").css('border', '0px solid black')
    }
    if (eat.t8.I != -1) {
        $("tr:eq(" + (eat.t8.I) + ")").find("td:eq(" + eat.t8.J + ")").css('border', '0px solid black')
    }
    if (eat.t9.I != -1) {
        $("tr:eq(" + (eat.t9.I) + ")").find("td:eq(" + eat.t9.J + ")").css('border', '0px solid black')
    }
    if (eat.t10.I != -1) {
        $("tr:eq(" + (eat.t10.I) + ")").find("td:eq(" + eat.t10.J + ")").css('border', '0px solid black')
    }
    if (eat.t11.I != -1) {
        $("tr:eq(" + (eat.t11.I) + ")").find("td:eq(" + eat.t11.J + ")").css('border', '0px solid black')
    }
    if (eat.t12.I != -1) {
        $("tr:eq(" + (eat.t12.I) + ")").find("td:eq(" + eat.t12.J + ")").css('border', '0px solid black')
    }
    if (eat.t13.I != -1) {
        $("tr:eq(" + (eat.t13.I) + ")").find("td:eq(" + eat.t13.J + ")").css('border', '0px solid black')
    }
    if (eat.t14.I != -1) {
        $("tr:eq(" + (eat.t14.I) + ")").find("td:eq(" + eat.t14.J + ")").css('border', '0px solid black')
    }
    if (eat.t15.I != -1) {
        $("tr:eq(" + (eat.t15.I) + ")").find("td:eq(" + eat.t15.J + ")").css('border', '0px solid black')
    }
    if (eat.t16.I != -1) {
        $("tr:eq(" + (eat.t16.I) + ")").find("td:eq(" + eat.t16.J + ")").css('border', '0px solid black')
    }
    if (eat.t17.I != -1) {
        $("tr:eq(" + (eat.t17.I) + ")").find("td:eq(" + eat.t17.J + ")").css('border', '0px solid black')
    }
    if (eat.t18.I != -1) {
        $("tr:eq(" + (eat.t18.I) + ")").find("td:eq(" + eat.t18.J + ")").css('border', '0px solid black')
    }
    if (eat.t19.I != -1) {
        $("tr:eq(" + (eat.t19.I) + ")").find("td:eq(" + eat.t19.J + ")").css('border', '0px solid black')
    }
    if (eat.t20.I != -1) {
        $("tr:eq(" + (eat.t20.I) + ")").find("td:eq(" + eat.t20.J + ")").css('border', '0px solid black')
    }
    if (eat.t21.I != -1) {
        $("tr:eq(" + (eat.t21.I) + ")").find("td:eq(" + eat.t21.J + ")").css('border', '0px solid black')
    }
    if (eat.t22.I != -1) {
        $("tr:eq(" + (eat.t22.I) + ")").find("td:eq(" + eat.t22.J + ")").css('border', '0px solid black')
    }
    if (eat.t23.I != -1) {
        $("tr:eq(" + (eat.t23.I) + ")").find("td:eq(" + eat.t23.J + ")").css('border', '0px solid black')
    }
    if (eat.t24.I != -1) {
        $("tr:eq(" + (eat.t24.I) + ")").find("td:eq(" + eat.t24.J + ")").css('border', '0px solid black')
    }
    if (eat.t25.I != -1) {
        $("tr:eq(" + (eat.t25.I) + ")").find("td:eq(" + eat.t25.J + ")").css('border', '0px solid black')
    }
    if (eat.t26.I != -1) {
        $("tr:eq(" + (eat.t26.I) + ")").find("td:eq(" + eat.t26.J + ")").css('border', '0px solid black')
    }
    if (eat.t27.I != -1) {
        $("tr:eq(" + (eat.t27.I) + ")").find("td:eq(" + eat.t27.J + ")").css('border', '0px solid black')
    }
    eat.t1.I = -1;
    eat.t1.J = -1;
    eat.t2.I = -1;
    eat.t2.J = -1;
    eat.t3.I = -1;
    eat.t3.J = -1;
    eat.t4.I = -1;
    eat.t4.J = -1;
    eat.t5.I = -1;
    eat.t5.J = -1;
    eat.t6.I = -1;
    eat.t6.J = -1;
    eat.t7.I = -1;
    eat.t7.J = -1;
    eat.t8.I = -1;
    eat.t8.J = -1;
    eat.t9.I = -1;
    eat.t9.J = -1;
    eat.t10.I = -1;
    eat.t10.J = -1;
    eat.t11.I = -1;
    eat.t11.J = -1;
    eat.t12.I = -1;
    eat.t12.J = -1;
    eat.t13.I = -1;
    eat.t13.J = -1;
    eat.t14.I = -1;
    eat.t14.J = -1;
    eat.t15.I = -1;
    eat.t15.J = -1;
    eat.t16.I = -1;
    eat.t16.J = -1;
    eat.t17.I = -1;
    eat.t17.J = -1;
    eat.t18.I = -1;
    eat.t18.J = -1;
    eat.t19.I = -1;
    eat.t19.J = -1;
    eat.t20.I = -1;
    eat.t20.J = -1;
    eat.t21.I = -1;
    eat.t21.J = -1;
    eat.t22.I = -1;
    eat.t22.J = -1;
    eat.t23.I = -1;
    eat.t23.J = -1;
    eat.t24.I = -1;
    eat.t24.J = -1;
    eat.t25.I = -1;
    eat.t25.J = -1;
    eat.t26.I = -1;
    eat.t26.J = -1;

    SelI = -1;
    SelJ = -1;
}



function  Checkcell(i,j)
{
    if ((eat.t1.I == i) && (eat.t1.J==j)) {
        return 1;
    }
    if ((eat.t2.I == i) && (eat.t2.J == j)) {
        return 1;
    }
    if ((eat.t3.I == i) && (eat.t3.J == j)) {
        return 1;
    }
    if ((eat.t4.I == i) && (eat.t4.J == j)) {
        return 1;
    }
    if ((eat.t5.I == i) && (eat.t5.J == j)) {
        return 1;
    }
    if ((eat.t6.I == i) && (eat.t6.J == j)) {
        return 1;
    }
    if ((eat.t7.I == i) && (eat.t7.J == j)) {
        return 1;
    }
    if ((eat.t8.I == i) && (eat.t8.J == j)) {
        return 1;
    }
    if ((eat.t9.I == i) && (eat.t9.J == j)) {
        return 1;
    }
    if ((eat.t10.I == i) && (eat.t10.J == j)) {
        return 1;
    }
    if ((eat.t11.I == i) && (eat.t11.J == j)) {
        return 1;
    }
    if ((eat.t12.I == i) && (eat.t12.J == j)) {
        return 1;
    }
    if ((eat.t13.I == i) && (eat.t13.J == j)) {
        return 1;
    }
    if ((eat.t14.I == i) && (eat.t14.J == j)) {
        return 1;
    }
    if ((eat.t15.I == i) && (eat.t15.J == j)) {
        return 1;
    }
    if ((eat.t16.I == i) && (eat.t16.J == j)) {
        return 1;
    }
    if ((eat.t17.I == i) && (eat.t17.J == j)) {
        return 1;
    }
    if ((eat.t18.I == i) && (eat.t18.J == j)) {
        return 1;
    }
    if ((eat.t19.I == i) && (eat.t19.J == j)) {
        return 1;
    }
    if ((eat.t20.I == i) && (eat.t20.J == j)) {
        return 1;
    }
    if ((eat.t21.I == i) && (eat.t21.J == j)) {
        return 1;
    }
    if ((eat.t22.I == i) && (eat.t22.J == j)) {
        return 1;
    }
    if ((eat.t23.I == i) && (eat.t23.J == j)) {
        return 1;
    }
    if ((eat.t24.I == i) && (eat.t24.J == j)) {
        return 1;
    }
    if ((eat.t25.I == i) && (eat.t25.J == j)) {
        return 1;
    }
    if ((eat.t26.I == i) && (eat.t26.J == j)) {
        return 1;
    }
    if ((eat.t27.I == i) && (eat.t27.J == j)) {
        return 1;
    }
    return 0;
} // если 1 ходить можно, 0 нельзя




function SetShahb(i, j) {
    if (BlackShah == 0) {
        BlackShah = 1;
        alert("Шах белым");
    }
    if ((shahb.t1.I == -1) || (shahb.t1.I==i) && (shahb.t1.J==j)) {
        shahb.t1.I = i;
        shahb.t1.J = j;
        return;
    }
    if ((shahb.t2.I == -1)|| (shahb.t2.I==i) && (shahb.t2.J==j)) {
        shahb.t2.I = i;
        shahb.t2.J = j;
        return
    }

    if ((shahb.t3.I == -1)|| (shahb.t3.I==i) && (shahb.t3.J==j)) {
        shahb.t3.I = i;
        shahb.t3.J = j;
        return;
    }

    if ((shahb.t4.I == -1)|| (shahb.t4.I==i) && (shahb.t4.J==j)) {
        shahb.t4.I = i;
        shahb.t4.J = j;
        return;
    }

    if ((shahb.t5.I == -1)|| (shahb.t5.I==i) && (shahb.t5.J==j)) {
        shahb.t5.I = i;
        shahb.t5.J = j;
        return;
    }

    if ((shahb.t6.I == -1)|| (shahb.t6.I==i) && (shahb.t6.J==j)) {
        shahb.t6.I = i;
        shahb.t6.J = j;
        return;
    }

    if ((shahb.t7.I == -1)|| (shahb.t7.I==i) && (shahb.t7.J==j)) {
        shahb.t7.I = i;
        shahb.t7.J = j;
        return;
    }
    if ((shahb.t8.I == -1)|| (shahb.t8.I==i) && (shahb.t8.J==j)) {
        shahb.t8.I = i;
        shahb.t8.J = j;
        return;
    }
}
function SetShahw(i, j) {
    if (WhiteShah == 0) {
        WhiteShah = 1;
        alert("Шах белым");
    }
    if ((shahw.t1.I == -1) || (shahw.t1.I==i) && (shahw.t1.J==j)) {
        shahw.t1.I = i;
        shahw.t1.J = j;
        return;
    }
    if ((shahw.t2.I == -1)|| (shahw.t2.I==i) && (shahw.t2.J==j)) {
        shahw.t2.I = i;
        shahw.t2.J = j;
        return
    }

    if ((shahw.t3.I == -1)|| (shahw.t3.I==i) && (shahw.t3.J==j)) {
        shahw.t3.I = i;
        shahw.t3.J = j;
        return;
    }

    if ((shahw.t4.I == -1)|| (shahw.t4.I==i) && (shahw.t4.J==j)) {
        shahw.t4.I = i;
        shahw.t4.J = j;
        return;
    }

    if ((shahw.t5.I == -1)|| (shahw.t5.I==i) && (shahw.t5.J==j)) {
        shahw.t5.I = i;
        shahw.t5.J = j;
        return;
    }

    if ((shahw.t6.I == -1)|| (shahw.t6.I==i) && (shahw.t6.J==j)) {
        shahw.t6.I = i;
        shahw.t6.J = j;
        return;
    }

    if ((shahw.t7.I == -1)|| (shahw.t7.I==i) && (shahw.t7.J==j)) {
        shahw.t7.I = i;
        shahw.t7.J = j;
        return;
    }
    if ((shahw.t8.I == -1)|| (shahw.t8.I==i) && (shahw.t8.J==j)) {
        shahw.t8.I = i;
        shahw.t8.J = j;
        return;
    }
}

function InShanb(i,j)
{
    if ((shahb.t1.I==i) && (shahb.t1.J==j))
    {
        return 1;
    }
    if ((shahb.t2.I==i) && (shahb.t2.J==j))
    {
        return 1;
    }
    if ((shahb.t3.I==i) && (shahb.t3.J==j))
    {
        return 1;
    }
    if ((shahb.t4.I==i) && (shahb.t4.J==j))
    {
        return 1;
    }
    if ((shahb.t5.I==i) && (shahb.t5.J==j))
    {
        return 1;
    }
    if ((shahb.t6.I==i) && (shahb.t6.J==j))
    {
        return 1;
    }
    if ((shahb.t7.I==i) && (shahb.t7.J==j))
    {
        return 1;
    }
    if ((shahb.t8.I==i) && (shahb.t8.J==j))
    {
        return 1;
    }
    return 0;
}

function InShanw(i,j)
{
    if ((shahw.t1.I==i) && (shahw.t1.J==j))
    {
        return 1;
    }
    if ((shahw.t2.I==i) && (shahw.t2.J==j))
    {
        return 1;
    }
    if ((shahw.t3.I==i) && (shahw.t3.J==j))
    {
        return 1;
    }
    if ((shahw.t4.I==i) && (shahw.t4.J==j))
    {
        return 1;
    }
    if ((shahw.t5.I==i) && (shahw.t5.J==j))
    {
        return 1;
    }
    if ((shahw.t6.I==i) && (shahw.t6.J==j))
    {
        return 1;
    }
    if ((shahw.t7.I==i) && (shahw.t7.J==j))
    {
        return 1;
    }
    if ((shahw.t8.I==i) && (shahw.t8.J==j))
    {
        return 1;
    }
    return 0;
}
// подсветка и проверка ходов
function SetPosition(i,j)
{
    if (eat.t1.I == -1) {
        eat.t1.I = i;
        eat.t1.J = j;
        return;
    }
      if (eat.t2.I == -1) {
            eat.t2.I = i;
            eat.t2.J = j;
            return
        }

            if (eat.t3.I == -1) {
                eat.t3.I = i;
                eat.t3.J = j;
                return;
            }
 
                if (eat.t4.I == -1) {
                    eat.t4.I = i;
                    eat.t4.J = j;
                    return;
                }
     
                    if (eat.t5.I == -1) {
                        eat.t5.I = i;
                        eat.t5.J = j;
                        return;
                    }
        
                        if (eat.t6.I == -1) {
                            eat.t6.I = i;
                            eat.t6.J = j;
                            return;
                        }
              
                            if (eat.t7.I == -1) {
                                eat.t7.I = i;
                                eat.t7.J = j;
                                return;
                            }
                            if (eat.t8.I == -1) {
                                eat.t8.I = i;
                                eat.t8.J = j;
                                return;
                            }

                            if (eat.t9.I == -1) {
                                eat.t9.I = i;
                                eat.t9.J = j;
                                return;
                            }
                            if (eat.t10.I == -1) {
                                eat.t10.I = i;
                                eat.t10.J = j;
                                return
                            }

                            if (eat.t11.I == -1) {
                                eat.t11.I = i;
                                eat.t11.J = j;
                                return;
                            }

                            if (eat.t12.I == -1) {
                                eat.t12.I = i;
                                eat.t12.J = j;
                                return;
                            }

                            if (eat.t13.I == -1) {
                                eat.t13.I = i;
                                eat.t13.J = j;
                                return;
                            }

                            if (eat.t14.I == -1) {
                                eat.t14.I = i;
                                eat.t14.J = j;
                                return;
                            }

                            if (eat.t15.I == -1) {
                                eat.t15.I = i;
                                eat.t15.J = j;
                                return;
                            }
                            if (eat.t16.I == -1) {
                                eat.t16.I = i;
                                eat.t16.J = j;
                                return;
                            }
                            if (eat.t17.I == -1) {
                                eat.t17.I = i;
                                eat.t17.J = j;
                                return;
                            }
                            if (eat.t18.I == -1) {
                                eat.t18.I = i;
                                eat.t18.J = j;
                                return;
                            }

                            if (eat.t19.I == -1) {
                                eat.t19.I = i;
                                eat.t19.J = j;
                                return;
                            }
                            if (eat.t20.I == -1) {
                                eat.t20.I = i;
                                eat.t20.J = j;
                                return
                            }

                            if (eat.t21.I == -1) {
                                eat.t21.I = i;
                                eat.t21.J = j;
                                return;
                            }

                            if (eat.t22.I == -1) {
                                eat.t22.I = i;
                                eat.t22.J = j;
                                return;
                            }

                            if (eat.t23.I == -1) {
                                eat.t23.I = i;
                                eat.t23.J = j;
                                return;
                            }

                            if (eat.t24.I == -1) {
                                eat.t24.I = i;
                                eat.t24.J = j;
                                return;
                            }

                            if (eat.t25.I == -1) {
                                eat.t25.I = i;
                                eat.t25.J = j;
                                return;
                            }
                            if (eat.t26.I == -1) {
                                eat.t26.I = i;
                                eat.t26.J = j;
                                return;
                            }
                            if (eat.t27.I == -1) {
                                eat.t27.I = i;
                                eat.t27.J = j;
                                return;
                            }
}

function ChekPeshka(Cell) {
    var posi = $(Cell).parent().parent().children().index($(Cell).parent());
    var posj = $(Cell).parent().children().index($(Cell));

    //проверка пешки для белых
    if (jQuery.inArray($(Cell).attr("name"), white) > -1) {
        if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + posj + ")").attr("name") == "hell") {
            $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + posj + ")").css('border', '1px solid blue')
            eat.t1.I = posi - 1;
            eat.t1.J = posj;
            if ((posi == 6) && ($("tr:eq(" + (posi - 2) + ")").find("td:eq(" + posj + ")").attr("name") == "hell")) {
                $("tr:eq(" + (posi - 2) + ")").find("td:eq(" + posj + ")").css('border', '1px solid blue')
                eat.t2.I = posi - 2;
                eat.t2.J = posj;
            }
        }
        if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), black) > -1) {
            $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '1px solid red')
            eat.t3.I = posi - 1;
            eat.t3.J = posj - 1;
        }
        if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), black) > -1) {
            $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '1px solid red')
            eat.t4.I = posi - 1;
            eat.t4.J = posj + 1;
        }
    }

    //проверка пешки для черных
    if (jQuery.inArray($(Cell).attr("name"), black) > -1) {
        if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + posj + ")").attr("name") == "hell") {
            $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + posj + ")").css('border', '1px solid blue')
            eat.t1.I = posi + 1;
            eat.t1.J = posj;
            if ((posi == 1) && ($("tr:eq(" + (posi + 2) + ")").find("td:eq(" + posj + ")").attr("name") == "hell")) {
                $("tr:eq(" + (posi + 2) + ")").find("td:eq(" + posj + ")").css('border', '1px solid blue')
                eat.t2.I = posi + 2;
                eat.t2.J = posj;
            }
        }
        if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), white) > -1) {
            $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '1px solid red')
            eat.t3.I = posi + 1;
            eat.t3.J = posj - 1;
        }
        if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), white) > -1) {
            $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '1px solid red')
            eat.t4.I = posi + 1;
            eat.t4.J = posj + 1;
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

function ChekKing(Cell) {
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
                if (((cv==0) && (InShanw(posi - 1,posj - 1)==0)) || (cv==1) && (InShanb((posi - 1,posj - 1)==0)))
                {
                    $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid blue');
                    SetPosition(posi - 1, posj - 1);
                }
            }
        }
            if (posj + 1 < 8) {
                if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "hell") {
                    if (((cv==0) && (InShanw(posi - 1,posj + 1)==0)) || (cv==1) && (InShanb((posi - 1,posj + 1)==0)))
                    {
                        $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid blue');
                        SetPosition(posi - 1, posj + 1);
                    }
                }
            }
                if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj ) + ")").attr("name") == "hell") {
                    if (((cv==0) && (InShanw(posi - 1,posj )==0)) || (cv==1) && (InShanb((posi - 1,posj)==0)))
                    {
                        $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj ) + ")").css('border', '2px solid blue');
                        SetPosition(posi - 1, posj );
                    }
            }
    }
    if (posi + 1 < 8) {
        if (posj - 1 > -1) {
            if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "hell") {
                if (((cv==0) && (InShanw(posi + 1,posj - 1)==0)) || (cv==1) && (InShanb((posi + 1,posj - 1)==0)))
                {
                    $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid blue');
                    SetPosition(posi + 1, posj - 1);
                }
            }
        }
        if (posj + 1 < 8) {
            if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "hell") {
                if (((cv==0) && (InShanw(posi + 1,posj + 1)==0)) || (cv==1) && (InShanb((posi + 1,posj + 1)==0)))
                {
                    $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid blue');
                    SetPosition(posi + 1, posj + 1);
                }
            }
        }
            if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj) + ")").attr("name") == "hell") {
                if (((cv==0) && (InShanw(posi + 1,posj)==0)) || (cv==1) && (InShanb((posi + 1,posj)==0)))
                {
                    $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj) + ")").css('border', '2px solid blue');
                    SetPosition(posi + 1, posj);
                }
        }
    }
    if (posj - 1 > -1) {
        if ($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "hell") {
            if (((cv==0) && (InShanw(posi,posj - 1)==0)) || (cv==1) && (InShanb((posi,posj - 1)==0)))
            {
                $("tr:eq(" + (posi) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid blue');
                SetPosition(posi, posj - 1);
            }
        }
    }
    if (posj + 1 < 8) {
        if ($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "hell") {
            if (((cv==0) && (InShanw(posi,posj + 1)==0)) || (cv==1) && (InShanb((posi, posj + 1)==0)))
            {
                $("tr:eq(" + (posi) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid blue');
                SetPosition(posi, posj + 1);
            }
        }
    }

    //если ты белый
    if (cv == 0) {
        if (posi - 1 > -1) {

            if (posj - 1 > -1) {
                if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), black) > -1) {
                    $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid red');
                    SetPosition(posi - 1, posj - 1);
                }
            }
            if (posj + 1 < 8) {
                if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), black) > -1) {
                    $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid red');
                    SetPosition(posi - 1, posj + 1);
                }
            }
            if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj) + ")").attr("name"), black) > -1) {
                $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj) + ")").css('border', '2px solid red');
                SetPosition(posi - 1, posj);
            }
        }
        if (posi + 1 < 8) {
            if (posj - 1 > -1) {
                if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), black) > -1) {
                    $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid red');
                    SetPosition(posi + 1, posj - 1);
                }
            }
            if (posj + 1 < 8) {
                if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), black) > -1) {
                    $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid red');
                    SetPosition(posi + 1, posj + 1);
                }
            }
            if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj) + ")").attr("name"), black) > -1) {
                $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj) + ")").css('border', '2px solid red');
                SetPosition(posi + 1, posj);
            }
        }
        if (posj - 1 > -1) {
            if (jQuery.inArray($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), black) > -1) {
                $("tr:eq(" + (posi) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid red');
                SetPosition(posi, posj - 1);
            }
        }
        if (posj + 1 < 8) {
            if (jQuery.inArray($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), black) > -1) {
                $("tr:eq(" + (posi) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid red');
                SetPosition(posi, posj + 1);
            }
        }

    }
    else { //если ты черный
        if (posi - 1 > -1) {

            if (posj - 1 > -1) {
                if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), white) > -1) {
                    $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid red');
                    SetPosition(posi - 1, posj - 1);
                }
            }
            if (posj + 1 < 8) {
                if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), white) > -1) {
                    $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid red');
                    SetPosition(posi - 1, posj + 1);
                }
            }
            if (jQuery.inArray($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj) + ")").attr("name"), white) > -1) {
                $("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj) + ")").css('border', '2px solid red');
                SetPosition(posi - 1, posj);
            }
        }
        if (posi + 1 < 8) {
            if (posj - 1 > -1) {
                if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), white) > -1) {
                    $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid red');
                    SetPosition(posi + 1, posj - 1);
                }
            }
            if (posj + 1 < 8) {
                if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), white) > -1) {
                    $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid red');
                    SetPosition(posi + 1, posj + 1);
                }
            }
            if (jQuery.inArray($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj) + ")").attr("name"), white) > -1) {
                $("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj) + ")").css('border', '2px solid red');
                SetPosition(posi + 1, posj);
            }
        }
        if (posj - 1 > -1) {
            if (jQuery.inArray($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj - 1) + ")").attr("name"), white) > -1) {
                $("tr:eq(" + (posi) + ")").find("td:eq(" + (posj - 1) + ")").css('border', '2px solid red');
                SetPosition(posi, posj - 1);
            }
        }
        if (posj + 1 < 8) {
            if (jQuery.inArray($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj + 1) + ")").attr("name"), white) > -1) {
                $("tr:eq(" + (posi) + ")").find("td:eq(" + (posj + 1) + ")").css('border', '2px solid red');
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
        ChekKing(Cell);
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
            SetShahb(posi - 1, posj);
            if ((posi == 6) && ($("tr:eq(" + (posi - 2) + ")").find("td:eq(" + posj + ")").attr("name") == "bking")) {
                SetShahb(posi - 1, posj);
            }
        }
    }

    //проверка пешки для черных
    if (jQuery.inArray($(Cell).attr("name"), black) > -1) {
        if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + posj + ")").attr("name") == "wking") {
            SetShahw(posi + 1, posj);
            if ((posi == 1) && ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + posj + ")").attr("name") == "wking")) {
                SetShahw(posi + 2, posj);
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
        CheckNearKing($("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj) + ")"),cv);
        i = i + 1;
    }

    if (!((posi - i) < 0)) {
        //если враждебная
        if (cv == 0) {
            if ($("tr:eq(" + (posi - i) + ")").find("td:eq(" + posj + ")").attr("name") == "bking") {
                alert("Шах Черным");
                SetShahb(posi - (i-1), posj);
                if (($("tr:eq(" + (posi - (i+1)) + ")").find("td:eq(" + posj + ")").attr("name")=="hell") && (posi - (i+1)>-1))
                SetShahb(posi - (i+1), posj);
            }
        }
        else {
            if ($("tr:eq(" + (posi - i) + ")").find("td:eq(" + posj + ")").attr("name") == "wking") {
                alert("Шах белым");
                SetShahw(posi - (i-1), posj);
                if (($("tr:eq(" + (posi - (i+1)) + ")").find("td:eq(" + posj + ")").attr("name")=="hell") && (posi - (i+1)>-1))
                SetShahw(posi - (i+1), posj);
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
                alert("Шах черным");
                SetShahb(posi + (i-1), posj);
                if (($("tr:eq(" + (posi + i+1) + ")").find("td:eq(" + posj + ")").attr("name")=="hell")&&((posi + i+1)<8))
                    SetShahb(posi + i+1, posj);
            }
        }
        else {
            if ($("tr:eq(" + (posi + i) + ")").find("td:eq(" + posj + ")").attr("name") == "wking") {
                alert("Шах белым");
                SetShahw(posi + (i-1), posj);
                if (($("tr:eq(" + (posi + i+1) + ")").find("td:eq(" + posj + ")").attr("name")=="hell")&&((posi + i+1)<8))
                    SetShahw(posi + i+1, posj);
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
                alert("Шах черным");
                SetShahb(posi, posj + (i-1));
                if (($("tr:eq(" + posi + ")").find("td:eq(" + (posj + i+1) + ")").attr("name")=="hell") && ((posj + i)<8))
                    SetShahb(posi, (posj + i+1));
            }
        }
        else {
            if ($("tr:eq(" + posi + ")").find("td:eq(" + (posj + i) + ")").attr("name") == "wking") {
                alert("Шах белым");
                SetShahw(posi, posj + (i-1));
                if (($("tr:eq(" + posi + ")").find("td:eq(" + (posj + i+1) + ")").attr("name")=="hell") && ((posj + i)<8))
                    SetShahw(posi, (posj + i+1));
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
                alert("Шах черным");
                SetShahb(posi, (posj - (i-1)));
                if (($("tr:eq(" + posi + ")").find("td:eq(" + (posj - i-1) + ")").attr("name")=="hell")&&((posj - i-1)>-1))
                    SetShahb(posi, (posj - i-1));
            }
        }
        else {
            if ($("tr:eq(" + posi + ")").find("td:eq(" + (posj - i) + ")").attr("name") == "wking") {
                alert("Шах белым");
                SetShahw(posi, posj - (i-1));
                if (($("tr:eq(" + posi + ")").find("td:eq(" + (posj - i-1) + ")").attr("name")=="hell")&&((posj - i-1)>-1))
                    SetShahw(posi, (posj - i-1));
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
                    alert("Шах белым");
                    SetShahb(posi + 2, posj - 1);
                }
            }
            if (posj + 1 <= 7) {
                if ($("tr:eq(" + (posi + 2) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "bking") {
                    alert("Шах белым");
                    SetShahb(posi + 2, posj + 1);
                }
            }
        }
        
        if (posi - 2 > -1) {
            if (posj - 1 > -1) {
                if ($("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "bking") {
                    alert("Шах белым");
               SetShahb(posi - 2, posj - 1);
                }
            }
            if (posj + 1 < 8) {
                if ($("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "bking") {
                    alert("Шах белым");
                    SetShahb(posi - 2, posj + 1);
                }
            }
        }

        if (posi-1>-1)     {
            if (posj +2 <8)
            {
                if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 2) + ")").attr("name") == "bking") {
                    alert("Шах белым");
                   SetShahb(posi - 1, posj + 2);
                }
            }

            if (posj - 2 >-1)          {
                if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 2) + ")").attr("name") == "bking") {
                    alert("Шах белым");
                    SetShahb(posi - 1, posj - 2);
                }
            }
        }

        if (posi+1<8)        {
            if (posj +2 <8)            {
                if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 2) + ")").attr("name") == "bking") {
                    alert("Шах белым");
                    SetShahb(posi + 1, posj + 2);
                }
            }
            if (posj - 2 > -1) {
                if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 2) + ")").attr("name") == "bking") {
                    alert("Шах белым");
                    SetShahb(posi + 1, posj - 2);
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
                    alert("Шах черным");
                    SetShahw(posi + 2, posj - 1);
                }
            }
            if (posj + 1 <= 7) {
                if ($("tr:eq(" + (posi + 2) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "wking") {
                    alert("Шах черным");
                    SetShahw(posi + 2, posj + 1);
                }
            }
        }
        
        if (posi - 2 > -1) {
            if (posj - 1 > -1) {
                if ($("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "wking") {
                    alert("Шах черным");
                    SetShahw(posi - 2, posj - 1);
                }
            }
            if (posj + 1 < 8) {
                if ($("tr:eq(" + (posi - 2) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "wking") {
                    alert("Шах черным");
                    SetShahw(posi - 2, posj + 1);
                }
            }
        }

        if (posi-1>-1)     {
            if (posj +2 <8)
            {
                if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 2) + ")").attr("name") == "wking") {
                    alert("Шах черным");
                    SetShahw(posi - 1, posj + 2);
                }
            }

            if (posj - 2 >-1)          {
                if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 2) + ")").attr("name") == "wking") {
                    alert("Шах черным");
                    SetShahw(posi - 1, posj - 2);
                }
            }
        }

        if (posi+1<8)        {
            if (posj +2 <8)            {
                if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 2) + ")").attr("name") == "wking") {
                    alert("Шах черным");
                    SetShahw(posi + 1, posj + 2);
                }
            }
            if (posj - 2 > -1) {
                if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 2) + ")").attr("name") == "wking") {
                    alert("Шах черным");
                    SetShahw(posi + 1, posj - 2);
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
                alert("Шах черным");
                SetShahb(posi - (i-1), (posj - (i-1)));
                if (($("tr:eq(" + (posi - i-1) + ")").find("td:eq(" + (posj - i-1) + ")").attr("name")=="hell")&& ((posi - i-1)>-1)&& ((posj - i-1)>-1) )
                    SetShahb(posi - i-1, (posj - i-1));
            }
        }
        else {
            if ($("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj - i) + ")").attr("name") == "wking") {
                alert("Шах белым");
                SetShahw(posi - (i-1), (posj - (i-1)));
                if (($("tr:eq(" + (posi - i-1) + ")").find("td:eq(" + (posj - i-1) + ")").attr("name")=="hell")&& ((posi - i-1)>-1)&& ((posj - i-1)>-1) )
                    SetShahw(posi - i-1, (posj - i-1));
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
                alert("Шах черным");
                SetShahb(posi + (i - 1), posj + (i - 1));
                if (($("tr:eq(" + (posi + i+1) + ")").find("td:eq(" + (posj + i+1) + ")").attr("name")=="hell")&&((posi + i+1)<8)&&((posj + i+1)<8))
                    SetShahb(posi + i+1, posj + i+1);
            }
        }
        else {
            if ($("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj + i) + ")").attr("name") == "wking") {
                alert("Шах белым");
                SetShahw(posi + (i - 1), posj + (i - 1));
                if (($("tr:eq(" + (posi + i+1) + ")").find("td:eq(" + (posj + i+1) + ")").attr("name")=="hell")&&((posi + i+1)<8)&&((posj + i+1)<8))
                    SetShahw(posi + i+1, posj + i+1);
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
                alert("Шах черным");
                SetShahb((posi - (i - 1)), (posj + (i - 1)));
                if (($("tr:eq(" + (posi - i-1) + ")").find("td:eq(" + (posj + i+1) + ")").attr("name")=="hell")&&((posi - i-1)>-1)&&((posj + i+1)<8))
                    SetShahb((posi - i-1), (posj + i+1));
            }
        }
        else {
            if ($("tr:eq(" + (posi - i) + ")").find("td:eq(" + (posj + i) + ")").attr("name") == "wking") {
                alert("Шах белым");
                SetShahw((posi - (i - 1)), (posj + (i - 1)));
                if (($("tr:eq(" + (posi - i-1) + ")").find("td:eq(" + (posj + i+1) + ")").attr("name")=="hell")&&((posi - i-1)>-1)&&((posj + i+1)<8))
                    SetShahw((posi - i-1), (posj + i+1));
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
                alert("Шах черным");
                SetShahb((posi + (i - 1)), (posj - (i - 1)));
                if (($("tr:eq(" + (posi + i+1) + ")").find("td:eq(" + (posj - i-1) + ")").attr("name")=="hell")&&((posi + i+1)<8)&&((posj - i-1)>-1))
                    SetShahb((posi + i+1), (posj - i-1));
            }
        }
        else {
            if ($("tr:eq(" + (posi + i) + ")").find("td:eq(" + (posj - i) + ")").attr("name") == "wking") {
                alert("Шах белым");
                SetShahw((posi + (i - 1)), (posj - (i - 1)));
                if (($("tr:eq(" + (posi + i+1) + ")").find("td:eq(" + (posj - i-1) + ")").attr("name")=="hell")&&((posi + i+1)<8)&&((posj - i-1)>-1))
                    SetShahw((posi + i+1), (posj - i-1));
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
                    SetShahb(posi, posj);
                }
            }
            if (posj + 1 < 8) {
                if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "bking") {
                    SetShahb(posi, posj);
                }
            }
            if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj) + ")").attr("name") == "bking") {
                SetShahb(posi, posj);
            }
        }
        if (posi + 1 < 8) {
            if (posj - 1 > -1) {
                if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "bking") {
                    SetShahb(posi, posj);
                }
            }
            if (posj + 1 < 8) {
                if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "bking") {
                    SetShahb(posi, posj);
                }
            }
            if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj) + ")").attr("name") == "bking") {
                SetShahb(posi, posj);
            }
        }
        if (posj - 1 > -1) {
            if ($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "bking") {
                SetShahb(posi, posj);
            }
        }
        if (posj + 1 < 8) {
            if ($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "bking") {
                SetShahb(posi, posj);
            }
        }

    }
    else { //если ты черный
        if (posi - 1 > -1) {

            if (posi - 1 > -1) {

                if (posj - 1 > -1) {
                    if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "wking") {
                        SetShahw(posi, posj);
                    }
                }
                if (posj + 1 < 8) {
                    if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "wking") {
                        SetShahw(posi, posj);
                    }
                }
                if ($("tr:eq(" + (posi - 1) + ")").find("td:eq(" + (posj) + ")").attr("name") == "wking") {
                    SetShahw(posi, posj);
                }
            }
            if (posi + 1 < 8) {
                if (posj - 1 > -1) {
                    if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "wking") {
                        SetShahw(posi, posj);
                    }
                }
                if (posj + 1 < 8) {
                    if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "wking") {
                        SetShahw(posi, posj);
                    }
                }
                if ($("tr:eq(" + (posi + 1) + ")").find("td:eq(" + (posj) + ")").attr("name") == "wking") {
                    SetShahw(posi, posj);
                }
            }
            if (posj - 1 > -1) {
                if ($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj - 1) + ")").attr("name") == "wking") {
                    SetShahw(posi, posj);
                }
            }
            if (posj + 1 < 8) {
                if ($("tr:eq(" + (posi) + ")").find("td:eq(" + (posj + 1) + ")").attr("name") == "wking") {
                    SetShahw(posi, posj);
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
function GO(Cell) {      
    var i = $(Cell).parent().parent().children().index($(Cell).parent());
    var j = $(Cell).parent().children().index($(Cell));
    //проверка можно ли ходить вставить
 
    if (Checkcell(i,j) == 1) {
        var obj = $("tr:eq(" + SelI + ")").find("td:eq(" + SelJ + ")");
        clear();
        
        $(Cell).css("backgroundImage", "url("+obj.attr("name") + ".png)");
        $(Cell).attr("name", obj.attr("name"));
        obj.attr("name", "hell")
        obj.css('border', '0px ');
        obj.css("backgroundImage", "");
        whoplay = !whoplay;
        var who;

        // когда пешка дошла до конца выбор кем станет
        if (($(Cell).attr("name") == "wpeshka") && (i == 0)) {
            while (1) {
                who = prompt('1-Слон \r\n 2-Конь \r\n 3-Ладья \r\n 4-Ферзь', 1)
                if ((who >= 1) && (who <= 4))
                    break;
            }
            if (who == 1) {
                $(Cell).css("backgroundImage", "url(wofficer.png)");
                $(Cell).attr("name", "wofficer");
            }
            if (who == 2) {
                $(Cell).css("backgroundImage", "url(whorse.png)");
                $(Cell).attr("name", "whorse");
            }
            if (who == 3) {
                $(Cell).css("backgroundImage", "url(wladya.png)");
                $(Cell).attr("name", "wladya");
            }
            if (who == 4) {
                $(Cell).css("backgroundImage", "url(wqueen.png)");
                $(Cell).attr("name", "wqueen");
            }
        }

        if (($(Cell).attr("name") == "bpeshka") && (i == 7)) {
            while (1) {
                who = prompt('1-Слон \r\n 2-Конь \r\n 3-Ладья \r\n 4-Ферзь', 1)
                if ((who >= 1) && (who <= 4))
                    break;
            }
            if (who == 1) {
                $(Cell).css("backgroundImage", "url(bofficer.png)");
                $(Cell).attr("name", "bofficer");
            }
            if (who == 2) {
                $(Cell).css("backgroundImage", "url(bhorse.png)");
                $(Cell).attr("name", "bhorse");
            }
            if (who == 3) {
                $(Cell).css("backgroundImage", "url(bladya.png)");
                $(Cell).attr("name", "bladya");
            }
            if (who == 4) {
                $(Cell).css("backgroundImage", "url(bqueen.png)");
                $(Cell).attr("name", "bqueen");
            }
        }

        ChekNKing(Cell); //проверяем на шах 
        //сюда проверка на мат

        if (shahb.t8.I!=-1)
            alert("Шах и мат черным \r\n Победили белые");
        if(shahw.t8.I!=-1)
            alert("Шах и мат белым \r\n Победили черные");
    }
    else {
        alert("Недопустимый ход")
    }
}

function cellClick(cll)
{

    if (SelI == -1) {
        if ((jQuery.inArray($(cll).attr("name"), black) > -1) && (whoplay == 1)) {
            SelBlack(cll);
        }
        else {
            if ((jQuery.inArray($(cll).attr("name"), white) > -1) && (whoplay == 0)) {
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
                    GO(cll);
                }
            }
        }
       
    }
}


