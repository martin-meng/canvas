/*--------------------上面部分主要是对画板的设置--------------------*/
var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

var lineWidth = 5



autoSetCanvas(yyy)
listenToUser(yyy)







/*--------------------------↓下面部分主要是橡皮擦设置---------------------------------*/

var eraserEnabled = false
var bdActionsEnabled = false
/*
eraser.onclick = function () {
    //将变量转化至反向值
    // eraserEnabled = !eraserEnabled
    eraserEnabled = true
    actions.className = 'actions x'
}

brush.onclick = function () {
    eraserEnabled = false
    actions.className = 'actions'
}
*/
    pen.onclick = function(){
        eraserEnabled = false
        pen.classList.add('active')
        eraser.classList.remove('active')

    }

    eraser.onclick = function(){
        eraserEnabled = true
        eraser.classList.add('active')
        pen.classList.remove('active')
    }

    xihuabi.onclick = function(){
        lineWidth = 5
        bdActionsEnabled = false
        xihuabi.classList.add('active')
        cuhuabi.classList.remove('active')

    }

    cuhuabi.onclick = function(){
        lineWidth = 15
        bdActionsEnabled = true
        cuhuabi.classList.add('active')
        xihuabi.classList.remove('active')
    }

    clear.onclick = function(){
        //清除canvas的画板内容
        //var context = canvas.getContext('2d'); 最前面声明了 所以去掉了
        context.clearRect(0, 0, yyy.width, yyy.height);
        pen.classList.add('active')
        eraserEnabled = false
        eraser.classList.remove('active')

    }

    save.onclick = function(){
        var url = yyy.toDataURL("image/png")
        console.log(url)
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = '我的画'
        a.target = '_blank'
        a.click()

    }



    black.onclick = function(){
        context.strokeStyle = 'black'
        black.classList.add('active')
        red.classList.remove('active')
        green.classList.remove('active')
        blue.classList.remove('active')
    }

    red.onclick = function(){
        context.strokeStyle = 'red'
        red.classList.add('active')
        black.classList.remove('active')        
        green.classList.remove('active')
        blue.classList.remove('active')

    }
    green.onclick = function(){
        context.strokeStyle = 'green'
        green.classList.add('active')
        black.classList.remove('active')
        red.classList.remove('active')
        blue.classList.remove('active')
    }

    blue.onclick = function(){
        context.strokeStyle = 'blue'
        blue.classList.add('active')
        black.classList.remove('active')           
        red.classList.remove('active')
        green.classList.remove('active')
    }

/*--------------------------------自动设置窗口------------------------------------*/
function autoSetCanvas(canvas) {
    //获取屏幕宽度
    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

/*------------------------------------↓ 画线-------------------------------------------*/

function drawLine(x1, y1, x2, y2) {
    context.beginPath()

    context.lineWidth = lineWidth
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}


/*-------------------------------↓下面部分主要是监听用户事件---------------------------------*/
function listenToUser(canvas) {

    /*       
    context.fillStyle = 'blue';
    context.fillRect(10,10,100,100);    
    context.strokeStyle = 'white';
    context.strokeRect(10,10,100,100)

    context.fillStyle = 'red';
    context.beginPath();
    context.moveTo(240,240);
    context.lineTo(300,240);
    context.lineTo(300,300);
    context.fill()

    //如何画一个圆弧
    //如果这里不写描边颜色，则以最后一次的描边颜色设置，填充也是如此。
    context.fillStyle = 'red'
    context.strokeStyle = 'white'
    context.beginPath()
    //绘画区域,以x轴方向500，y方向300为坐标，以100单位为半径，以(π/180)*你想要的度数为起点，0度的起点在3点方向，以(π/180)*你想要的度数为终点画圆。
    context.arc(500,300,100,Math.PI/180*270,Math.PI/180*0) 
    context.stroke()
    */


    function drawCircle(x, y, radius) {
        context.beginPath()
        //绘画区域,以x轴方向500，y方向300为坐标，以100单位为半径，以(π/180)*你想要的度数为起点，0度的起点在3点方向，以(π/180)*你想要的度数为终点画圆。
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fill()
    }
    //声明是否在画
    var using = false
    var lastPoint = { x: undefined, y: undefined }


        /*------------------------------- ↓if包裹是特性检测 ---------------------------------*/
    if (document.body.ontouchstart !== undefined) {

        //触屏设备
        /*-------------------------------↓下面部分主要是移动端手指事件---------------------------------*/

        canvas.ontouchstart = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    x: x,
                    y: y
                }
                // drawCircle(x,y,0)
            }
        }
        canvas.ontouchmove = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            // drawCircle(x,y,0)
            //要实时更新上一个点的位置。
            if (!using) { return }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = { x: x, y: y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
                // drawCircle(x,y,0)
            }
        }
        canvas.ontouchend = function () {
            using = false

        }
    } else {
        //非触屏设备
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    x: x,
                    y: y
                }
                // drawCircle(x,y,0)
            }
        }

        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            // drawCircle(x,y,0)
            //要实时更新上一个点的位置。
            if (!using) { return }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = { x: x, y: y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
                // drawCircle(x,y,0)
            }
        }
        canvas.onmouseup = function (aaa) {
            using = false
        }

    }
}
