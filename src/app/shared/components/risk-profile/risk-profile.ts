import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-risk-profile',
    imports: [],
    templateUrl: './risk-profile.html',
    styleUrl: './risk-profile.css',
})
export class RiskProfile {

    @Input()
    value = 1;

    get circles(): number[] {
        return [1, 2, 3, 4, 5];
    }

}
