/* test-comma-semicolon.gs */

// name     : test-comma-semicolon.gs
// git      : https://github.com/pffy/udon
// author   : The Pffy Authors https://pffy.dev
// license  : https://unlicense.org/

// standalone Google Apps Script designed to test function delimiters per locale
// copies basis document, converts to another locale, checks FORMULA for delimiter
// USAGE: 1. create basis doc. 2, copy/paste doc URL. 3. Run `test___delimiter()`

function test___delimiter() {
  
  const ss = SpreadsheetApp.openById(getBasisId());
  const sht = ss.getActiveSheet();

  // the basis document
  delimiter(sht);

  const obj = {};
  const locales = codes();

  locales.forEach(function(locale){
    s = ss.copy(locale + ' : ' + ss.getName());
    s.setSpreadsheetLocale(locale);
    d = delimiter(s.getActiveSheet());
    obj[locale] = d;
    console.log('The function delimiter for "%s" is %s', locale, d);    
  });

  // provides codes and delimiters and key-value pairs
  console.log(obj);
}

function delimiter(sht) {

  // param: sht, any Sheet within a Spreadsheet

  // show locale in A1
  
  sht.getRange('A1').setValue(sht.getParent().getSpreadsheetLocale());

  // show function delimiter in B1

  const f = sht.getRange('A4').getFormula();

  const re_comma = /[,]/;
  const re_semicolon = /[;]/;
  const out = sht.getRange('B1');

  if(f.match(re_comma)) {
    out.setValue('COMMA');
    return 'COMMA';
  } else if(f.match(re_semicolon)) {
    out.setValue('SEMICOLON');
    return 'SEMICOLON';
  }
}


function getBasisId() {

  // creating your own basis document is simple
  // the basis document is a reference point for locale conversion
  // locale: en_US
  // A1 - __BLANK__ displays locale code (e.g., en_US)
  // B1 - __BLANK__ displays COMMA or SEMICOLON
  // A2 - 'https://google.com
  // A3 - 'Google
  // A4 - =HYPERLINK(A2,A3)

  const url = 'https://docs.google.com/spreadsheets/d/[YOUR_GOOGLESHEETS_ID_HERE]/edit#gid=0';
  const re = /d\/(.*)\/edit/;
  return url.match(re)[1];
}

function codes() {
  return `
es_AR
hy_AM
en_AU
az_AZ
be_BY
es_BO
pt_BR
bg_BG
en_CA
fr_CA
es_CL
zh_CN
es_CO
hr_HR
cs_CZ
da_DK
es_EC
ar_EG
fi_FI
fr_FR
ka_GE
de_DE
el_GR
zh_HK
hu_HU
hi_IN
bn_IN
gu_IN
kn_IN
ml_IN
mr_IN
pa_IN
ta_IN
te_IN
in_ID
en_IE
he_IL
it_IT
ja_JP
kk_KZ
lv_LV
lt_LT
es_MX
mn_MN
my_MM
nl_NL
no_NO
nn_NO
es_PY
fil_PH
pl_PL
pt_PT
ro_RO
ru_RU
sr_RS
sk_SK
sl_SL
ko_KR
es_ES
ca_ES
sv_SE
de_CH
zh_TW
th_TH
tr_TR
uk_UA
en_GB
cy_GB
en_US
es_UY
es_VE
vi_VN
`.trim().split(/\s/);
}
