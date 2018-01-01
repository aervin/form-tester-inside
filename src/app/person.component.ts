import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    NgZone,
    OnInit,
    ChangeDetectorRef,
    ViewChild,
    ElementRef,
} from "@angular/core";
import { User } from "./app.component";

export type PersonField = "nameFirst" | "nameLast" | "email";

@Component({
    selector: "app-person",
    template: `
        <div class="wrapper__person">

            <input  #nameFirstElement
                    [class.red]="!isValid(data.nameFirst)"
                    [(ngModel)]="data.nameFirst"
                    (change)="handleUserInput($event, 'nameFirst')" />

            <input [class.red]="!isValid(data.nameLast)" [(ngModel)]="data.nameLast" (change)="handleUserInput($event, 'nameLast')" />
            <input [class.red]="!isValid(data.email)" [(ngModel)]="data.email" (change)="handleUserInput($event, 'email')" />
        </div>
    `,
    styles: [
        `
            input.red {
                border: 2px solid red;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PersonComponent {
    @Input() public data: User;
    @Output() public update: EventEmitter<User> = new EventEmitter();

    constructor() {}

    public handleUserInput(event: KeyboardEvent, field: PersonField): void {
        this.update.emit({
            ...this.data,
            [field]: (event.target as HTMLInputElement).value,
        });
    }

    public isValid(value: string): boolean {
        return /x/g.test(value) || !/e/g.test(value);
    }
}
