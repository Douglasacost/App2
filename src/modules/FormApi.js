import $ from 'jquery';
import { Map, fromJS, List } from 'immutable';

const sharepointUrl = _spPageContextInfo.webAbsoluteUrl;

function formApi() {
  this.getData = function(url, listname, fields, formId, form, callback) {
    let mapped = Map({});
    let filteredData = Map({});
    let id = formId;
    let keysNames = [];
    fields.map(function(key){
        let val = firstToUpper(key);
        keysNames.push(val);
    });
    $.ajax({
        url: url + "/_api/web/lists/getbytitle('" + listname + "')/items(" + id + ")",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
			// Returning the results
            let listData = Map(data.d);
            keysNames.map(function(key){
                let value = listData.get(key);
                filteredData = filteredData.set(key, value);
            });
            filteredData.map(function(value, key){
                let lowKey = firstToLower(key);
                mapped = mapped.set(lowKey, value); 
            });
            callback(form, mapped);
		},
		error: function (data) {
			failure(data);
		}
    });
  }
  this.getDataList = function(url, listname, form, input, callback) {
      $.ajax({
        url: url + "/_api/web/lists/getbytitle('" + listname + "')/items",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            console.log(data); // Returns JSON collection of the results
            let listData = List(data.d.results);
            callback(form, input, listData);
        },
        error: function (data) {
            failure(data);
        }
    });
  }
  this.postData = function(url, listname, elementName, metadata, id){
    let mapped = Map({});
    metadata.map(function(value, key){
        let upperKey = firstToUpper(key);
        mapped = mapped.set(upperKey, value);
    });
    var data = mapped.remove('Aprobadores').toJS();
    console.log(data);
    var item = $.extend({
        "__metadata": { "type": getListItemType(elementName)}
    }, data);
    if(id){
        $.ajax({
            url: url + "/_api/web/lists/getbytitle('" + listname + "')/items(" + id + ")",
            method: "PATCH",
            contentType: "application/json;odata=verbose",
            data:  JSON.stringify(item),
            headers: { 
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "If-Match": "*"
            },
            success: function(data){
                var message = "Su aprobacion ha sido guardada";
                alert(message);
                window.location.href = sharepointUrl;
            },
            error:  function(data){console.log(data);}
        });
    } else {
        $.ajax({
            url: url + "/_api/web/lists/getbytitle('" + listname + "')/items",
            type: 'POST',
            contentType: "application/json;odata=verbose",
            data:  JSON.stringify(item),
            headers: { 
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function(data){
                var id = data.d.Id;
                var message = "Su forma ha sido enviada correctamente. El id de la forma es '" + id + "'";
                alert(message);
                window.location.href = sharepointUrl;
            },
            error:  function(data){console.log(data);}
        });
    }
  }
  this.postBatchRequest = function(driversAsJson) {
      console.log('postBatchRequest()', driversAsJson);


      // generate a batch boundary
      var batchGuid = generateUUID();

      // creating the body
      var batchContents = new Array();
      var changeSetId = generateUUID();

      // get current host
      var temp = document.createElement('a');
      temp.href = _spPageContextInfo.webAbsoluteUrl;
      var host = temp.hostname;

      // for each driver...
      for (var driverIndex = 0; driverIndex < driversAsJson.length; driverIndex++) {

        var driver = driversAsJson[driverIndex];

        // create the request endpoint
        var endpoint = _spPageContextInfo.webAbsoluteUrl
                       + '/_api/web/lists/getbytitle(\'subvenciones\')'
                       + '/items';

        var item = $.extend({
            "__metadata": { "type": "SP.Data.SubvencionesListItem"}
        }, driver);

        // create the changeset
        batchContents.push('--changeset_' + changeSetId);
        batchContents.push('Content-Type: application/http');
        batchContents.push('Content-Transfer-Encoding: binary');
        batchContents.push('');
        batchContents.push('POST ' + endpoint + ' HTTP/1.1');
        batchContents.push('Content-Type: application/json;odata=verbose');
        batchContents.push('');
        batchContents.push(JSON.stringify(item));
        batchContents.push('');
      }
      // END changeset to create data
      batchContents.push('--changeset_' + changeSetId + '--');


      // generate the body of the batch
      var batchBody = batchContents.join('\r\n');

      // start with a clean array
      batchContents = new Array();

      // create batch for creating items
      batchContents.push('--batch_' + batchGuid);
      batchContents.push('Content-Type: multipart/mixed; boundary="changeset_' + changeSetId + '"');
      batchContents.push('Content-Length: ' + batchBody.length);
      batchContents.push('Content-Transfer-Encoding: binary');
      batchContents.push('');
      batchContents.push(batchBody);
      batchContents.push('');

      // create request in batch to get all items after all are created
      endpoint = _spPageContextInfo.webAbsoluteUrl
                    + '/_api/web/lists/getbytitle(\'subvenciones\')'
                    + '/items?$filter=idPadre eq 25';


      batchContents.push('--batch_' + batchGuid);
      batchContents.push('Content-Type: application/http');
      batchContents.push('Content-Transfer-Encoding: binary');
      batchContents.push('');
      batchContents.push('GET ' + endpoint + ' HTTP/1.1');
      batchContents.push('Accept: application/json;odata=verbose');
      batchContents.push('');

      batchContents.push('--batch_' + batchGuid + '--');

      batchBody = batchContents.join('\r\n');

      // create the batch
      console.log(batchBody);

      // create the request endpoint 
      var endpoint = _spPageContextInfo.webAbsoluteUrl
                     + '/_api/$batch';

      // batches need a specific header
      var batchRequestHeader = {
        'X-RequestDigest': jQuery("#__REQUESTDIGEST").val(),
        'Content-Type': 'multipart/mixed; boundary="batch_' + batchGuid + '"'
      };

      // create request
      jQuery.ajax({
        url: endpoint,
        type: 'POST',
        headers: batchRequestHeader,
        data: batchBody,
        success: function (response) {
          console.log('.. create driver PASS ', response);

          var responseInLines = response.split('\n');

          // read each line until you find JSON...
          for (var currentLine = 0; currentLine < responseInLines.length; currentLine++) {
            try {
              // parse the JSON response...
              var tryParseJson = JSON.parse(responseInLines[currentLine]);

              // clear the view model
              // set response > drivers collection
              console.log(tryParseJson.d.results);

            } catch (e) {
              // don't do anything... just keep moving
            }
          }
        },
        fail: function (error) {
          console.log('.. create driver FAIL ', error);
        }
      });
    }
}

function getListItemType(name) {
    return"SP.Data." + name[0].toUpperCase() + name.substring(1) + "ListItem";
}

//common functions
//** GET and POST mapping
let firstToLower = function(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
};

let firstToUpper = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

let mapToJsObject = function(o) {
    let r = {};
    $.map(o, function(item, index) {
        r[firstToLower(index)] = o[index];
    });
    return r;
};

let mapFromJsObject = function(o) {
    let r = {};
    $.map(o, function(item, index) {
        r[firstToUpper(index)] = o[index];
    });
    return r;
};

let generateUUID = function() {
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now();; //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

module.exports = formApi;