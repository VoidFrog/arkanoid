"use strict";

function draw(){
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
    display_ctx.clearRect(0,0, window.innerWidth, window.innerHeight)

    ctx.fillStyle = "rgb(0,0,0)"
    ctx.fillRect(0,0, window.innerWidth, window.innerHeight)

    bricks.draw_sprites()
    bricks.draw_selected_bricks()
    grid.create_grid()
    
    if(bricks.field_on){
        bricks.draw_field()
    }

    sprite_loader.render_sprites()
    sprite_loader.highlight_selected_block()

    paddle.create()
}


function zoom_detection(){
    let px_ratio = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;

    window.addEventListener('resize', function(e){
        let newPx_ratio = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;
        window.devicePixelRatio = px_ratio

        if(newPx_ratio != px_ratio){
            px_ratio = newPx_ratio;
            console.log("zooming");
            return true;
        }
        else{
            console.log("just resizing");
            return false;
        }
    })
}

