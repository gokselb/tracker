import { Injectable } from '@angular/core';
import { Currency } from '@tts/models/currency.model';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  public currencies: Currency[] = [
    { code: 'TRY', name: 'Turkish Lira', sign: '₺' },
    { code: 'EUR', name: 'Euro', sign: '€' },
    { code: 'USD', name: 'Dollars', sign: '$' },
  ];
}
