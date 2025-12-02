import { Component } from '@angular/core';
import {PageTitleService} from '../../core/services/page-title.service';

@Component({
  selector: 'app-wallet-creation',
  imports: [],
  templateUrl: './wallet-creation.html',
  styleUrl: './wallet-creation.css',
})
export class WalletCreation {
    constructor(private pageTitleService: PageTitleService) {}

    ngOnInit() {
        this.pageTitleService.setPageTitle('Wallet Creation');
    }
}
