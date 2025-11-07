import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TransactionService } from '../../core/service/transaction.service';
import { TransactionPayload } from '../../core/service/models/TransactionPayload';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private fb = inject(FormBuilder);
  private transactionService = inject(TransactionService);

  transactionForm = this.fb.group({
    crypto: [0, [Validators.required]],
    orderType: ['', [Validators.required]],
    amountUsd: [0, [Validators.required, Validators.min(0.01)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    cryptoAmount: [0, [Validators.required, Validators.min(0.00000001)]],
  });

  orderTypes = [
    { value: 'COMPRA', label: 'Compra' },
    { value: 'VENDA', label: 'Venda' },
  ];

  popularCryptos = ['BTC', 'ETH', 'BNB', 'SOL', 'ADA', 'XRP', 'DOGE', 'DOT'];

  onSubmit() {
    if (this.transactionForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    const formValue = this.transactionForm.value;
    const payload: TransactionPayload = {
      order: formValue.orderType as 'COMPRA' | 'VENDA',
      crypto: formValue.crypto || 0,
      priceCrypto: formValue.price || 0,
      amountUsd: formValue.amountUsd || 0,
    };

    this.transactionService.registerTransaction(payload).subscribe({
      next: (response) => {
        console.log('Transação registrada com sucesso:', response);
        alert('Transação registrada com sucesso!');
        this.transactionForm.reset({
          crypto: 0,
          orderType: '',
          amountUsd: 0,
          price: 0,
          cryptoAmount: 0,
        });
      },
      error: (err) => {
        console.error('Erro ao registrar transação:', err);
        alert('Erro ao registrar transação. Tente novamente.');
      },
    });
  }

  private markFormGroupTouched() {
    Object.keys(this.transactionForm.controls).forEach((key) => {
      const control = this.transactionForm.get(key);
      control?.markAsTouched();
    });
  }

  onCryptoChange() {
    // Pode adicionar lógica para buscar preço atual da cripto
  }

  calculateCryptoAmount() {
    const amountUsd = this.transactionForm.get('amountUsd')?.value || 0;
    const price = this.transactionForm.get('price')?.value || 0;

    if (price > 0 && amountUsd > 0) {
      const cryptoAmount = amountUsd / price;
      this.transactionForm.patchValue({
        cryptoAmount: parseFloat(cryptoAmount.toFixed(8)),
      });
    }
  }

  calculateAmountUsd() {
    const price = this.transactionForm.get('price')?.value || 0;
    const cryptoAmount = this.transactionForm.get('cryptoAmount')?.value || 0;

    if (price > 0 && cryptoAmount > 0) {
      const amountUsd = price * cryptoAmount;
      this.transactionForm.patchValue({
        amountUsd: parseFloat(amountUsd.toFixed(2)),
      });
    }
  }
}

