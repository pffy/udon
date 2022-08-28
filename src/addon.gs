// Ramen.gs
// git: https://github.com/pffy/ramen
// license: https://unlicense.org/


// loads menus based on locale
function onOpen() {

  const ui = SpreadsheetApp.getUi();
  const cc = getLocale();

  ui.createMenu(msgs[cc].theTopMenu)
      .addItem(msgs[cc].theFirstString, 'menuItem1')
      .addSeparator()
      .addSubMenu(ui.createMenu(msgs[cc].theFirstSubMenu)
          .addItem(msgs[cc].theSecondString, 'menuItem2'))
      .addToUi();
}

// returns locale if strings available; otherwise, the default locale
function getLocale() {
  
  const default_locale = 'en_US';
  const cc = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetLocale();
  
  if(!msgs[cc]) {
    Logger.log('%s locale not available yet,', cc);
    return default_locale;
  }

  return cc;
}



// displays first message from locale
function menuItem1() {
  const cc = getLocale();
  SpreadsheetApp.getUi()
     .alert(msgs[cc].theFirstMsg);
}

// displays second message from locale
function menuItem2() {
  const cc = getLocale();
  SpreadsheetApp.getUi()
     .alert(msgs[cc].theSecondMsg);
}
