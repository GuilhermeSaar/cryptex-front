import { Component } from '@angular/core';
import { MatInputModule } from  '@angular/material/input' ;
import { MatFormFieldModule } from  '@angular/material/form-field' ;
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms' ;
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule, MatCardContent, MatCardHeader} from '@angular/material/card';



@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCardHeader,
    MatCardContent,
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {

  form = new FormGroup({
    crypto: new FormControl(''),
    type: new FormControl(''),
    amountUsd: new FormControl(''),
    price: new FormControl(''),
    amountCrypto: new FormControl('')
  });
}
