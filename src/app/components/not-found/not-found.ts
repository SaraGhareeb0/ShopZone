import { RouterModule } from '@angular/router';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import lottie from 'lottie-web';


@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})



export class NotFound implements AfterViewInit {

  @ViewChild('lottieContainer', { static: true })
  container!: ElementRef;

  ngAfterViewInit() {
    lottie.loadAnimation({
      container: this.container.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'animations/kitty.json'
    });
  }
}