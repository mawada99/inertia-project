export class Globals {
  static user;
  static settings;
  static branch;
  static supportedTransactionType = [
    "PKM",
    "BMT",
    "RITS",
    "RTS",
    "OTR",
    "RTRN",
    "BMR",
    "HTR",
    "OTD",
    "PRP",
    "STD",
    "RCV",
  ];

  static setUser(user) {
    this.user = user;
  }
}
