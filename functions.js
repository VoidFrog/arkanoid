function draw(){
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
    grid.create_grid()
    bricks.draw_bricks()
    
    if(bricks.field_on){
        bricks.draw_field()
    }


    paddle.create()
}