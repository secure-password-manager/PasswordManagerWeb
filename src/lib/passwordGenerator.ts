interface passwordProps {
  includeUpper : boolean;
  includeLower : boolean;
  includeSymbol : boolean;
  includeNumber : boolean;
}

interface characterProps {
  _upperCase : string;
  _lowerCase : string;
  _symbols : string;
  _numbers : string;
}

export default class PasswordGenerator {
  private _characters : characterProps = {
    _upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    _lowerCase: "abcdefghijklmnopqrstuvwxyz",
    _symbols: "!@#$%^&*",
    _numbers: "0123456789",
  };
  private _passwordLen : number = 12;
  private _upperCase : boolean;
  private _lowerCase : boolean;
  private _symbols : boolean;
  private _numbers : boolean;

  constructor(passwordProps : passwordProps, pwdLength ?: number) {
    const { includeUpper, includeLower, includeSymbol, includeNumber } =
      passwordProps;
    if (pwdLength) this.passwordLength = pwdLength;
    this.includeUpper = includeUpper;
    this.includeLower = includeLower;
    this.includeSymbol = includeSymbol;
    this.includeNumber = includeNumber;
  }

  set includeUpper(includeUpper : boolean) {
    this._upperCase = includeUpper;
  }

  set includeLower(includeLower : boolean) {
    this._lowerCase = includeLower;
  }

  set includeSymbol(includeSymbol : boolean) {
    this._symbols = includeSymbol;
  }

  set includeNumber(includeNumber : boolean) {
    this._numbers = includeNumber;
  }

  set passwordLength(length : number) {
    this._passwordLen = length;
  }

  private _passwordChars() : string {
    let pwChars = ""
    for (const key in this._characters){
      if (this[key]) pwChars += this._characters[key];
    }
    return pwChars;
  }

  private _getRandomIntInclusive(min : number, max : number) : number {
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    const randomNumber = randomBuffer[0] / (0xffffffff + 1);

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(randomNumber * (max - min + 1)) + min;
  }

  getRandomPassword() : string {
    let password = "";
    const selectedChars = this._passwordChars();

    if (selectedChars.length) {
      for (let i = 0; i < this._passwordLen; i++) {
        password +=
          selectedChars[
            this._getRandomIntInclusive(0, selectedChars.length - 1)
          ];
      }
    }
    return password;
  }
}

