"use strict";

function draw(){
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
    ctx.fillStyle = "rgb(0,0,0)"
    ctx.fillRect(0,0, window.innerWidth, window.innerHeight)

    bricks.draw_bricks()
    grid.create_grid()
    
    if(bricks.field_on){
        bricks.draw_field()
    }


    paddle.create()
}