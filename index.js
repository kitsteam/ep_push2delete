var eejs = require('ep_etherpad-lite/node/eejs')
var $ = require('ep_push2delete/node/cheerio');
//var $ = require('ep_etherpad-lite/node/cheerio');
var settings = require('ep_etherpad-lite/node/utils/Settings');


/*var pluginSettings = settings.ep_push2delete;
var deleteButton = pluginSettings.settingsDelete || false;
pluginSettings.settingsDelete = true;*/

/*
* Handle incoming delete requests from clients
*/
exports.handleMessage = function(hook_name, context, callback){
  var Pad = require('ep_etherpad-lite/node/db/Pad.js').Pad

  // Firstly ignore any request that aren't about chat
  var isDeleteRequest = false;
  if(context) {
    if(context.message && context.message){
      if(context.message.type === 'COLLABROOM'){
        if(context.message.data){
          if(context.message.data.type){
            if(context.message.data.type === 'ep_push2delete'){
              isDeleteRequest = true;
            }
          }
        }
      }
    }
  }
  if(!isDeleteRequest){
    callback(false);
    return false;
  }
  
  console.log('DELETION REQUEST!')

  var packet = context.message.data;
  /***
    What's available in a packet?
    * action -- The action IE chatPosition
    * padId -- The padId of the pad both authors are on
    ***/
  if(packet.action === 'deletePad'){
    var pad = new Pad(packet.padId)
    pad.remove(function(er) {
      if(er) console.warn('ep_push2delete', er)
      callback([null]);
    })
  }
}

exports.eejsBlock_editbarMenuRight = function(hook_name, args, cb) {
  //let hiddenState = "display: none !important;";
  /*if (settings.ep_push2delete) {
    if (!settings.ep_push2delete.disabledByDefault && !args.renderContext.req.url.match(/^\/(p\/r\..{16})/)) {
      hiddenState = "display: inline !important;";
    }
  }*/
  /*let hiddenState = "display: inline !important;";
  const ejsPath = 'ep_push2delete/templates/delete_button.ejs';
  args.content = eejs.require(ejsPath, {hidden: hiddenState}) + args.content;*/
  /*if(!args.renderContext.req.url.match(/^\/(p\/r\..{16})/)) {
    args.content = eejs.require('ep_push2delete/templates/delete_button.ejs') + args.content;
  }*/
  cb();
};

/*exports.expressCreateServer = (hookName, {app}, cb) => {
  app.get('/admin/delete', (req, res) => {
    res.send(eejs.require('ep_push2delete/templates/admin/delete.html', {errors: []}));
  });
  return cb();
};*/

/*exports.eejsBlock_adminMenu = (hookName, context, cb) => {
  const ul = $('<ul>').html(context.content);
  const pfx = ul.find('li a').attr('href').match(/^((?:\.\.\/)*)/)[1];
  ul.append(
      $('<li>').append(
          $('<a>')
              .attr('href', `${pfx}delete`)
              .attr('data-l10n-id', 'ep_adminpads2_manage-pads')
              .text('Löschbutton aktivieren')));
  context.content = ul.html();
  return cb();
};*/

exports.eejsBlock_adminMenu = (hookName, context, cb) => {
  /*const ul = $('<ul>').html(context.content);
  const pfx = ul.find('li a').attr('href').match(/^((?:\.\.\/)*)/)[1];
  ul.append(
      $('<li>').append(
          $('<a>')
              .attr('href', `${pfx}delete`)
              .attr('data-l10n-id', 'ep_adminpads2_manage-pads')
              .text('Löschbutton aktivieren')));
  context.content = ul.html();*/
  return cb();
};

exports.eejsBlock_mySettings.dropdown = function(hook_name, args, cb) {
  /*let checkedState = 'checked';
  if (settings.ep_push2delete) {
    if (settings.ep_push2delete.disabledByDefault) {
      checkedState = '';
    }
  }
  const ejsPath = 'ep_push2delete/templates/delete_entry.ejs';
  args.content += eejs.require(ejsPath, {checked: checkedState});*/
    
  let hiddenState = "display: inline !important;";
  const ejsPath = 'ep_push2delete/templates/delete_button.ejs';
  args.content += eejs.require(ejsPath, {hidden: hiddenState});
  return cb();
};

exports.eejsBlock_dd_view = (hookName, args, cb) => {
  /*const li = "<li><a href='#' onClick='$(\"#options-delete\").click();'>Löschbutton aktivieren</a></li>";
  args.content += li;*/
};


