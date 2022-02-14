import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as $ from 'jquery'
import { TweenLite, TweenMax, Linear, Sine } from 'gsap';
import gsap from 'gsap';
import { FlowerComponent } from './flower/flower.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild("flower") flower: FlowerComponent;

  ngAfterViewInit(): void {
    setTimeout(() => {
      $("#back").fadeOut();
      $("#heart").fadeOut();
      gsap.registerPlugin(TweenLite, TweenMax, Linear, Sine);

      TweenLite.set("#content-section", { perspective: 600 })
      // TweenLite.set("#img", { xPercent: "-50%", yPercent: "-50%" })
      var total = 10;
      var warp = document.getElementById("content-section");
      var w = window.innerWidth;
      for (let i = 0; i < total; i++) {
        var Div = document.createElement('div');
        var size = "dot";
        TweenLite.set(Div, { attr: { class: size }, x: this.R(0, w), y: this.R(-200, -150), z: this.R(-200, 200) });
        warp?.appendChild(Div);
        this.animm(Div);
      }
    }, 2000)
  }

  animm(elm: any) {
    var h = window.innerHeight;
    TweenMax.to(elm, this.R(6, 15), { y: h + 100, ease: Linear.easeNone, repeat: -1, delay: -15 });
    TweenMax.to(elm, this.R(4, 8), { x: '+=100', rotationZ: this.R(0, 180), repeat: -1, yoyo: true, ease: Sine.easeInOut });
    TweenMax.to(elm, this.R(2, 8), { rotationX: this.R(0, 360), rotationY: this.R(0, 360), repeat: -1, yoyo: true, ease: Sine.easeInOut, delay: -5 });
  };

  R(min: any, max: any) { return min + Math.random() * (max - min) };

  next(current: string, next: string) {
    $("#" + current).fadeOut('slow');
    setTimeout(() => { $("#" + next).fadeIn('slow') }, 1000);
    if (next == 'step10') {
      $(".dot").fadeOut('slow');
      $("#back").fadeIn();
      $("#heart").fadeIn();
      setTimeout(() => {
        this.flower.init();
      }, 2000);
    }


  }
  title = 'a-vday';
}
