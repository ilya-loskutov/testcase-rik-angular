import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    let telephoneNumberAsString = value.toString();
    let transformedValue: string = '';
    for (let i = 0; i < telephoneNumberAsString.length; i++) {
      let prependedCharacter: string = '';
      if (i === 0) {
        prependedCharacter = '+';
      }
      else if (i === 1) {
        prependedCharacter = '(';;
      }
      else if (i === 4) {
        prependedCharacter = ')';
      }
      else if (i === 7) {
        prependedCharacter = '-';
      }
      else if (i === 9) {
        prependedCharacter = '-';
      }
      transformedValue += `${prependedCharacter}${telephoneNumberAsString[i]}`
    }
    return transformedValue;
  }
}
