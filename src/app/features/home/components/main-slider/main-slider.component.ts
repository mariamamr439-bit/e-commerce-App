import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-main-slider',
  imports: [RouterLink],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainSliderComponent {
}
