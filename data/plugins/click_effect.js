/* -------------------
* Name: 页面点击特效
* Version: v1.0
* Author: 川上星林
* Date: 2023-8-6
* Mode: true
* Json: []
* ------------------- */

function clickEffect() {
    let balls = [];
    let longPressed = false;
    let longPress;
    let multiplier = 0;
    let width, height;
    let origin;
    let normal;
    let ctx;
    const colours = ["#F73859", "#14FFEC", "#0084FF", "#FF99FE", "#FAF15D", "#51cf66"];
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.setAttribute("style", "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;");
    canvas.setAttribute("id", "__ce_canvas");
    const pointer = document.createElement("span");
    pointer.classList.add("pointer");
    document.body.appendChild(pointer);

    if (canvas.getContext && window.addEventListener) {
        ctx = canvas.getContext("2d");
        updateSize();
        window.addEventListener('resize', updateSize, false);
        loop();
        window.addEventListener("mousedown", function (e) {
            pushBalls(randBetween(10, 20), e.clientX, e.clientY);
            document.body.classList.add("is-pressed");
            longPress = setTimeout(function () {
                document.body.classList.add("is-longpress");
                longPressed = true;
            }, 500);
        }, false);
        window.addEventListener("mouseup", function (e) {
            clearInterval(longPress);
            if (longPressed == true) {
                document.body.classList.remove("is-longpress");
                pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY);
                longPressed = false;
            }
            document.body.classList.remove("is-pressed");
        }, false);
        window.addEventListener("mousemove", function (e) {
            let x = e.clientX;
            let y = e.clientY;
            pointer.style.top = y + "px";
            pointer.style.left = x + "px";
        }, false);
    } else {
        console.log("canvas or addEventListener is unsupported!");
    }

    function updateSize() {
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.scale(2, 2);
        width = (canvas.width = window.innerWidth);
        height = (canvas.height = window.innerHeight);
        origin = {
            x: width / 2,
            y: height / 2
        };
        normal = {
            x: width / 2,
            y: height / 2
        };
    }

    class Ball {
        constructor(x = origin.x, y = origin.y) {
            this.x = x;
            this.y = y;
            this.angle = Math.PI * 2 * Math.random();
            this.shape = ["circle", "square", "triangle", "star"][Math.floor(Math.random() * 4)]; // Randomly choose a shape
            this.stroke = Math.random() < 0.5; // Randomly choose whether to stroke the shape
            if (longPressed == true) {
                this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
            } else {
                this.multiplier = randBetween(6, 12);
            }
            this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
            this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
            this.r = randBetween(8, 12) + 3 * Math.random();
            this.color = colours[Math.floor(Math.random() * colours.length)];
        }
        update() {
            if (this.shape === "circle") {
                this.x += this.vx - normal.x;
                this.y += this.vy - normal.y;
            } else if (this.shape === "square") {
                this.x += this.vx - normal.x;
                this.y += this.vy - normal.y;
            } else if (this.shape === "triangle") {
                this.x += this.vx - normal.x;
                this.y += this.vy - normal.y;
            } else if (this.shape === "star") {
                this.x += this.vx - normal.x;
                this.y += this.vy - normal.y;
            }
            normal.x = -2 / window.innerWidth * Math.sin(this.angle);
            normal.y = -2 / window.innerHeight * Math.cos(this.angle);
            this.r -= 0.3;
            this.vx *= 0.9;
            this.vy *= 0.9;
        }
    }

    function pushBalls(count = 1, x = origin.x, y = origin.y) {
        for (let i = 0; i < count; i++) {
            balls.push(new Ball(x, y));
        }
    }

    function randBetween(min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    function loop() {
        ctx.fillStyle = "rgba(255, 255, 255, 0)";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < balls.length; i++) {
            let b = balls[i];
            if (b.r < 0) continue;

            if (b.stroke) {
                ctx.strokeStyle = b.color;
                ctx.lineWidth = 4;
            } else {
                ctx.fillStyle = b.color;
            }

            if (b.shape === "circle") {
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
                if (b.stroke) {
                    ctx.stroke();
                } else {
                    ctx.fill();
                }
            } else if (b.shape === "square") {
                ctx.save();
                ctx.translate(b.x, b.y);
                ctx.rotate(b.angle);
                ctx.fillRect(-b.r, -b.r, b.r * 2, b.r * 2);
                if (b.stroke) {
                    ctx.strokeRect(-b.r, -b.r, b.r * 2, b.r * 2);
                }
                ctx.restore();
            } else if (b.shape === "triangle") {
                ctx.save();
                ctx.translate(b.x, b.y);
                ctx.rotate(b.angle);
                ctx.beginPath();
                ctx.moveTo(0, -b.r);
                ctx.lineTo(-b.r, b.r);
                ctx.lineTo(b.r, b.r);
                ctx.closePath();
                if (b.stroke) {
                    ctx.stroke();
                } else {
                    ctx.fill();
                }
                ctx.restore();
            } else if (b.shape === "star") {
                ctx.save();
                ctx.translate(b.x, b.y);
                ctx.rotate(b.angle);
                drawStar(0, 0, 5, b.r, b.r / 2, b.stroke);
                ctx.restore();
            }
            b.update();
        }
        if (longPressed == true) {
            multiplier += 0.2;
        } else if (!longPressed && multiplier >= 0) {
            multiplier -= 0.4;
        }
        removeBall();
        requestAnimationFrame(loop);
    }

    function drawStar(x, y, arms, outerRadius, innerRadius, stroke = false) {
        let angle = Math.PI / arms;

        ctx.beginPath();
        ctx.moveTo(x, y - outerRadius);

        for (let i = 0; i < 2 * arms; i++) {
            let r = i % 2 === 0 ? outerRadius : innerRadius;
            let xOffset = Math.cos(i * angle) * r;
            let yOffset = Math.sin(i * angle) * r;
            ctx.lineTo(x + xOffset, y + yOffset);
        }

        ctx.closePath();
        if (!stroke) {
            ctx.fill();
        } else {
            ctx.stroke();
        }
    }

    function removeBall() {
        for (let i = 0; i < balls.length; i++) {
            let b = balls[i];
            if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
                balls.splice(i, 1);
            }
        }
    }
}
function isInternationalHolidayToday() {
    const holidays = [
        { "holiday": "元旦", "date": "01-01" },
        { "holiday": "情人节", "date": "02-14" },
        { "holiday": "国际妇女节", "date": "03-08" },
        { "holiday": "愚人节", "date": "04-01" },
        { "holiday": "地球日", "date": "04-22" },
        { "holiday": "劳动节", "date": "05-01" },
        { "holiday": "世界环境日", "date": "06-05" },
        { "holiday": "国际瑜伽日", "date": "06-21" },
        { "holiday": "世界表情符号日", "date": "07-17" },
        { "holiday": "国际青年日", "date": "08-12" },
        { "holiday": "国际和平日", "date": "09-21" },
        { "holiday": "星柠上线N周年", "date": "10-03" },
        { "holiday": "世界教师节", "date": "10-05" },
        { "holiday": "万圣节", "date": "10-31" },
        { "holiday": "世界仁慈日", "date": "11-13" },
        { "holiday": "人权日", "date": "12-10" }
    ];    

    const today = new Date();
    const todayDate = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    for (const holiday of holidays) {
        if (holiday.date === todayDate) {
            return holiday;
        }
    }

    return null;
}

const holidayToday = isInternationalHolidayToday();

if (holidayToday) {
    const holidayName = holidayToday.holiday;
    clickEffect();
    $("body#body").append(`<div class="welcome wel"><div><p>今天是 ${holidayName}，节日快乐</p></div></div>`);
    setTimeout(() => { $(".welcome.wel").remove() }, 4700);
}

___opt_add([
    {
        "n": "点击特效",
        "d": "打开花样点击特效",
        "id": "_opt_click_effect",
        "f": "___ce_check()"
    }
]);
___ce_check();
function ___ce_check() {
    setTimeout(() => {
        if (___opt_get("_opt_click_effect")) {
            clickEffect();
        } else {
            $("#__ce_canvas").remove();
            $(".pointer").remove();
        } 
    }, 400);
}
