import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'app-kenteken-search-bar',
    templateUrl: './kenteken-search-bar.component.html',
    styleUrls: ['./kenteken-search-bar.component.scss'],
    animations: [AppComponent.animations]
})
export class KentekenSearchBarComponent implements OnInit {
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    invalidKenteken = false;
    kentekenForm = this.formbuilder.group({
        kenteken: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    });

    constructor(private formbuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
    }

    async submitKenteken() {
        // returns the kenteken in an Full Uppercase string
        if (this.kentekenForm.valid) {
            this.invalidKenteken = false;
            this.notify.emit(this.kentekenForm.get('kenteken').value.toString().toUpperCase());
        } else {
            this.invalidKenteken = true;
        }
    }

}
