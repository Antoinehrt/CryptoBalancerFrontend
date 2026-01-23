import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AssetService} from '../../../core/services/asset/asset.service';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {AssetDto} from '../../../core/dto/asset.dto';

@Component({
    selector: 'app-add-asset-form',
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        MatInput,
        MatButton
    ],
    templateUrl: './add-asset-form.html',
    styleUrl: './add-asset-form.css',
})
export class AddAssetForm {
    private _fb = inject(FormBuilder);
    private _assetService = inject(AssetService);

    assetForm: FormGroup;
    symbols?: string[];

    @Output()
    formSubmit = new EventEmitter<AssetDto>();

    constructor() {
        this.assetForm = this._fb.group({
            symbol: ['', Validators.required],
            amount: ['', [Validators.required, Validators.min(0.00001)]]
        });

        this._assetService.getAllSymbols().subscribe(symbols => this.symbols = symbols);
    }

    protected onSubmit() {
        if (this.assetForm.valid){
            this.formSubmit.emit(this.assetForm.value);
            this.assetForm.reset();
        }
    }
}
