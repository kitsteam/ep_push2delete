'use strict';

const padcookie = require('ep_etherpad-lite/static/js/pad_cookie').padcookie;

const postAceInit = (hook, context) => {
  const $outer = $('iframe[name="ace_outer"]').contents().find('iframe');
  const $inner = $outer.contents().find('#innerdocbody');
  const delete_setting = {
    enable: () => {
      $inner.attr('delete', 'true');
      $inner.find('div').each(function () {
        $(this).attr('delete', 'true');
        $(this).find('div').each(function () {
          $(this).attr('delete', 'true');
        });
      });
    },
    disable: () => {
      $inner.attr('delete', 'false');
      $inner.find('div').each(function () {
        $(this).attr('delete', 'false');
        $(this).find('span').each(function () {
          $(this).attr('delete', 'false');
        });
      });
    },
  };
  /* init */
  if (padcookie.getPref('delete') === false) {
    //$('#options-delete').val();
    $('#options-delete').attr('checked', false);
    //$('#options-delete').attr('checked', false);
    //$('#deletePadButton').attr('style', 'display: none !important');
    $('#deletePadButton').attr('style', 'display: inline !important');
    delete_setting.disable();
  } else if (padcookie.getPref('delete') === true) {
    $('#options-delete').attr('checked', true);
    $('#deletePadButton').attr('style', 'display: inline !important');
    delete_setting.enable();
  }

  /*if ($('#options-delete').is(':checked')) {
      console.log("options delete is checked");
    delete_setting.enable();
  } else {
      console.log("options delete is not checked");
    delete_setting.disable();
  }*/

  /* on click */
  $('#options-delete').on('click', () => {
    if ($('#options-delete').is(':checked')) {
      padcookie.setPref('delete', true);
      delete_setting.enable();
    } else {
      padcookie.setPref('delete', false);
      delete_setting.disable();
    }
    /*if (window.browser.chrome)*/ window.location.reload();
  });
};
exports.postAceInit = postAceInit;
