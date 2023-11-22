interface passwordProps {
  includeUpper : boolean;
  includeLower : boolean;
  includeSymbol : boolean;
  includeNumber : boolean;
}

export default class PasswordGenerator {
  characters : string = "";
  passwordLen : number = 12;

  constructor(passwordProps : passwordProps, pwdLength ?: number) {
    const { includeUpper, includeLower, includeSymbol, includeNumber } =
      passwordProps;
    if (pwdLength) this.passwordLength = pwdLength;
    this.upperCase = includeUpper;
    this.lowerCase = includeLower;
    this.symbols = includeSymbol;
    this.number = includeNumber;
  }

  set upperCase(isUpperCase : boolean) {
    if (isUpperCase) {
      this.characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
  }

  set lowerCase(isLowerCase : boolean) {
    if (isLowerCase) {
      this.characters += "abcdefghijklmnopqrstuvwxyz";
    }
  }

  set symbols(isSymbol : boolean) {
    if (isSymbol) {
      this.characters += "!@#$%^&*";
    }
  }

  set number(isNumeric : boolean) {
    if (isNumeric) {
      this.characters += "0123456789";
    }
  }

  set passwordLength(length : number) {
    this.passwordLen = length;
  }

  private _getRandomInteger(min : number, max : number) : number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomPassword() : string {
    let password = "";
    if (this.characters.length) {
      for (let i = 0; i < this.passwordLen; i++) {
        password +=
          this.characters[
            this._getRandomInteger(0, this.characters.length - 1)
          ];
      }
    }
    return password;
  }
}

