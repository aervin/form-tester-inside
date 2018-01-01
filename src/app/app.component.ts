import { Component } from "@angular/core";
import { USERS } from "./users";

@Component({
    selector: "app-root",
    template: `
        <span>{{ users[0].nameFirst }}</span>
        <span>{{ users[0].nameLast }}</span>
        <span>{{ users[0].email }}</span>
        <ng-container *ngFor="let person of users">
            <app-person [data]="person" (update)="updateModel($event)"></app-person>
        </ng-container>
    `,
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    private users: User[] = USERS;

    public updateModel(newUserData: User): void {
        this.users = this.users.map(
            (u: User) => (u.id === newUserData.id ? newUserData : u)
        );
    }
}

export interface User {
    id: string;
    nameFirst: string;
    nameLast: string;
    email: string;
}
