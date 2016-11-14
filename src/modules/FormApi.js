import $ from 'jquery';
import { Map, fromJS, List } from 'immutable';

function formApi() {
  this.getData = function(url, listname, keysNames, formId, form, callback) {
    let mapped = Map({});
    let filteredData = Map({});
    let id = formId;
    $.ajax({
        url: url + "/_api/web/lists/getbytitle('" + listname + "')/items(" + id + ")",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
			// Returning the results
            console.log(data);
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
  this.postData = function(url, listname, elementName, metadata){
    let mapped = Map({});
    metadata.map(function(value, key){
        let upperKey = firstToUpper(key);
        mapped = mapped.set(upperKey, value);
    });
    var data = mapped.toJS();
    var item = $.extend({
        "__metadata": { "type": getListItemType(elementName)}
    }, data);
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
            var message = "You form has been sumitted correctly, you form id is '" + id + "'";
            alert(message);
        },
        error:  function(data){console.log(data);}
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

module.exports = formApi;