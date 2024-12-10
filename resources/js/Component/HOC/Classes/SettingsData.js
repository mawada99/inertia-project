export class SettingsData {
  constructor(settingsData) {
    this.localCurrency = settingsData.localCurrency;
    this.renewalDate = settingsData.renewalDate;
  }

  static shared;
}
