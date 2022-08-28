/* test2.gs */

// test: locale WITHOUT available key-value strings
function test_getLocale_withoutKeyValueStrings() {

  // IMPORTANT! Changing to a different locale closes/restarts spreadsheet

  const test_locale = 'el_GR';
  SpreadsheetApp.getActiveSpreadsheet().setSpreadsheetLocale(test_locale);

  // el_GR is not available yet
  // en_US is available
  Logger.log('%s is available', getLocale());
}

// test: locale WITH key-value strings available
function test_getLocale_withKeyValueStrings() {

  // IMPORTANT! Changing to a different locale closes/restarts spreadsheet  

  const test_locale = 'fr_FR';
  SpreadsheetApp.getActiveSpreadsheet().setSpreadsheetLocale(test_locale);

  // fr_FR is available
  Logger.log('%s is available', getLocale());
}
