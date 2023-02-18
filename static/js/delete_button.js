var modals = require("ep_etherpad-lite/static/js/pad_modals").padmodals

function sendDeletionRequest(){
  var myAuthorId = pad.getUserId();
  var padId = pad.getPadId();
  // Send chat message to send to the server
  var message = {
    type : 'ep_push2delete',
    action : 'deletePad',
    padId : padId
  }
  pad.collabClient.sendMessage(message);
  modals.showModal('deleted');
  
  // reload window, so that the current content is discarded:
  window.location.reload();
}

exports.documentReady = function(hook_name, args, cb) {
  $('#deletePadButton').click(function() {
    if(confirm('Möchtest Du dieses Pad wirklich löschen? Die Aktion kann nicht rückgängig gemacht werden.')) sendDeletionRequest()
  })
  cb()
}