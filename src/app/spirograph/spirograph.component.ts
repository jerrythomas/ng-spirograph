import { Component, OnInit, ElementRef ,HostListener, Input} from '@angular/core';
import * as d3 from 'd3';
import { KEYCODES } from '../key-codes.enum';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-spirograph',
  templateUrl: './spirograph.component.html',
  styleUrls: ['./spirograph.component.css']
})
export class SpirographComponent implements OnInit {

  
  @Input() frame_radius = 250;
  @Input() pen_radius = 110;
  @Input() pen_dist = 50;

  R = 200;
  svg : any;
  r = 110;
  a = 50;
  delta = Math.round(100*Math.atan(1/Math.sqrt(this.R**2 - 1)))/100
  alpha = 0;
  data = [];
  count = 0;
  moveInterval: Subscription;
  paused:boolean = true;

  constructor(private elRef:ElementRef) {
    console.log(this.elRef.nativeElement);
  }

  @HostListener('window:keyup', ['$event'])
  toggleTimedCapture(event: KeyboardEvent) {
    if (   event.keyCode === KEYCODES.SPACE_BAR 
        || event.keyCode === KEYCODES.RETURN) {

      if (this.paused) {
        //this.moveInterval = timer(0, 1).subscribe(() => {
        //  this.add_point();
        //})
        this.generate()
      }
      else {
        //this.moveInterval.unsubscribe();
        this.svg.selectAll("path").remove();
      }
      this.paused = !this.paused
    }
  }
  approx_match(origin, other):boolean{
    return (   Math.abs(origin.x - other.x) <= 0.1 
            && Math.abs(origin.y - other.y) <= 0.1);
  }
  generate(){
    var data = [];
    var alpha = 0, cycles = 0, count = 0;
    var x, y;
    var point, origin;

    this.svg = d3.select(this.elRef.nativeElement).select("svg")
                 .attr('viewBox', "0 0 500 500")

    do {
      x = (this.R-this.pen_radius)*Math.cos(this.pen_radius*alpha/this.R) 
          + this.pen_dist*Math.cos((this.R-this.pen_radius)*alpha/this.R) +250;
      y = (this.R-this.pen_radius)*Math.sin(this.pen_radius*alpha/this.R) 
          - this.pen_dist*Math.sin((this.R-this.pen_radius)*alpha/this.R) +250;
      point = {x:x, y:y}
      data.push(point);
      if (alpha == 0) {
        origin = point
      }
      alpha += this.delta;
      cycles = alpha / 2*Math.PI
      count = count + 1
    } while (cycles < 5 || !this.approx_match(origin, point))
    console.log("Generated "+count +" points for "+cycles)
    console.log(data)
    var line = d3.line()
                 .x(function(d) {return d.x;})
                 .y(function(d) {return d.y;})
                 .curve(d3.curveNatural);
    var path = this.svg.append("path")
        .attr("d", line(data))
        .attr("stroke", "#ddd")
        .attr("stroke-width", "1")
        .attr("fill", "none")
        /*.attr("fill", "#F76C5E")
        .attr("fill-rule", "evenodd")*/;

      var totalLength = path.node().getTotalLength();
      console.log(totalLength)

      /*path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
          .duration(4000)
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0)
          //.on("end", );*/
  }
  deactivate(){
    this.svg.selectAll("path").attr("class", "old")
  }
  add_point(){
    var x, y
    
    x = (this.R-this.r)*Math.cos(this.r*this.alpha/this.R) 
        + this.a*Math.cos((this.R-this.r)*this.alpha/this.R)
    y = (this.R-this.r)*Math.sin(this.r*this.alpha/this.R) 
        - this.a*Math.sin((this.R-this.r)*this.alpha/this.R) 
    
    if (this.alpha == 0) {
      this.origin = {x:x, y:y}
    } else if (this.approx_match({x:x, y:y})) {
      console.log("match found ", this.count)
      this.moveInterval.unsubscribe();
      this.paused = true
    }
    
    this.count = this.count +1
    this.alpha = this.alpha + this.delta

    
    this.svg.selectAll("dot")
            .data([{x:x, y:y}])
            .enter()
            .append("circle")
            .attr("r", .5)
            .attr("fill","#333333")
            .attr("cx", function(d) { return d.x + 250; })
            .attr("cy", function(d) { return d.y + 250; })

  }

  ngOnInit() {
     
    this.svg = d3.select(this.elRef.nativeElement).select("svg")
                 .attr('viewBox', "0 0 500 500")
    //this.generate()
  }

}