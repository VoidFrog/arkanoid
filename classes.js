class Paddle {
    constructor(){
        this.width = 200
        this.x = window.innerWidth/2 - this.width/2
        this.height = 20
        this.y = window.innerHeight - this.height - 20
        this.velocity = 0
        this.controls()
    }

    create(){
        this.move()

        ctx.beginPath()
        ctx.fillStyle = "#000000"
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.closePath()
    }

    controls(){
        let _this = this

        document.addEventListener('keydown', function(e){
            let key = e.code
            //console.log(key, e)

            if(key == 'KeyA'){
                _this.velocity = -5
            }
            else if(key == 'KeyD'){
                console.log("d")
                _this.velocity = 5
            }

        })
        document.addEventListener('keyup', function(e){
            let key = e.code

            if(key == 'KeyA'){
                _this.velocity += 5
            }
            else if(key == 'KeyD'){
                console.log("d")
                _this.velocity -= 5
            }
        })
    }

    move(){
        this.velocity = ((this.velocity > 5) ? this.velocity = 5 : this.velocity = this.velocity)
        this.velocity = ((this.velocity < -5) ? this.velocity = -5 : this.velocity = this.velocity)
        
        this.x += this.velocity 
    }
}

class Brick {
    constructor(x, y){
        this.width = grid.horizontal_spacing-2
        this.height = grid.vertical_spacing-2 
        this.x = x
        this.y = y
        this.bricks = []
        this.create_brick()

        this.field_x_start;
        this.field_y_start;

        this.field_x_end;
        this.field_y_end;

        this.field_on = null;
    }

    create_brick(){
        let _this = this

        window.addEventListener('click', function(e){
            let x = e.clientX 
            let y = e.clientY 

            let horizontal_block = Math.floor(x/grid.horizontal_spacing)
            let vertical_block = Math.floor(y/grid.vertical_spacing)

            let coordinates = {
                x: horizontal_block*grid.horizontal_spacing,
                y: vertical_block*grid.vertical_spacing
            }

            _this.bricks.push(coordinates)
        })

        window.addEventListener('mousedown', function(e){
            _this.field_x_start = e.clientX
            _this.field_y_start = e.clientY

            _this.field_x_end = e.clientX
            _this.field_y_end = e.clientY

            _this.field_on = true 
        })
        window.addEventListener('mousemove', function(e){
            _this.field_x_end = e.clientX
            _this.field_y_end = e.clientY

        })
        window.addEventListener('mouseup', function(e){
            _this.field_on = false

            
        })
    }

    draw_bricks(){
        for(let brick of this.bricks){
            ctx.fillRect(brick.x, brick.y, this.width, this.height)
        }
    }

    draw_field(){
        let width = this.field_x_end - this.field_x_start 
        let height = this.field_y_end - this.field_y_start

        ctx.fillStyle = "rgba(25,55,155, 0.3)"
        ctx.fillRect(this.field_x_start, this.field_y_start, width, height)
    }
}

class Grid {
    constructor(){
        //pion
        this.vertical_lines = []
        this.vertical_lines_number = 20
        this.vertical_spacing = window.innerHeight/this.vertical_lines_number
        //poziom
        this.horizontal_lines = []
        this.horizontal_lines_number = 15
        this.horizontal_spacing = window.innerWidth/this.horizontal_lines_number
    }

    create_grid(){  
        ctx.strokeStyle = "#000000"

        for(let i = 0; i < this.horizontal_lines_number; i++){
            ctx.moveTo(this.horizontal_spacing*i, 0)
            ctx.lineTo(this.horizontal_spacing*i, window.innerWidth)
            ctx.stroke()
        }

        for(let i = 0; i < this.vertical_lines_number; i++){
            ctx.moveTo(0, this.vertical_spacing*i)
            ctx.lineTo(window.innerWidth, this.vertical_spacing*i)
            ctx.stroke()
        }
    }
}

