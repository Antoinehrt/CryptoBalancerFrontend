import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-risk-profile',
    imports: [
        NgForOf
    ],
  templateUrl: './risk-profile.html',
  styleUrl: './risk-profile.css',
})
export class RiskProfile {

    @Input()
    value = 1;

    get circles(): number[]{
        return [1, 2, 3, 4, 5];
    }

}
