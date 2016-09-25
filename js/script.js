/************************
Custom JS Script
Author : Sayanraj Guha
fileName : script.js
All rights reserved.
************************/
$(document).ready(function() {
  $('#btnAdd').on('click',function(e) {
    e.preventDefault();
    var type = $('#type').val();
    var make = $('#make').val().trim();
    var model = $('#model').val().trim();
    if(validateInput(type,make,model)) {
      var row = createRow($('#type').find(':selected').text(),make,model);
      $('#vehicleTable').find('tbody').append(row);
      clearFields();
      $('#type').focus();
    }
  });

  $("#search").on("keyup", function() {
    performSearch($(this).val());
  });
  $("#searchButton").on("click", function() {
    performSearch($('#search').val());
  });
  $('#btnConvert').on('click',function() {
    var record = {};
    var records = [];
    $.each($("#vehicleTable tbody").find("tr"), function(i,tr) {
      //console.log($(this)[0].childNodes);
      record = {};
      var childNodes = tr.childNodes;
      console.dir(childNodes);
      if(childNodes.length == 3) {
          record.vehicleType = childNodes[0].innerText;
          record.make = childNodes[1].innerText;
          record.model = childNodes[2].innerText;
          records.push(record);
      }
    });
    openModal(records);
  });
});

function validateInput(type,make,model) {
  if(type == "-1" || make == "" || model == "") {
    return false;
  }
  return true;
}
function performSearch(value) {
  if(value != undefined && value.length >= 3) {
    $.each($("#vehicleTable tbody").find("tr"), function() {
      var highlightFlag = false;
      $.each($(this)[0].childNodes, function(i,td) {
        if(td.innerText.toLowerCase().indexOf(value.toLowerCase()) === -1) {

        }
        else {
          highlightFlag = true;
        }
      });
      if(highlightFlag == true) {
        $(this).addClass('highlight');
      } else {
        $(this).removeClass('highlight');
      }
    });
  } else {
    $.each($("#vehicleTable tbody").find("tr"), function() {
      $(this).removeClass('highlight');
    });
  }
}
function createRow(type, make, model) {
  var data ='<td>'+type+'</td><td>'+make+'</td><td>'+model+'</td>';
  var row = '<tr>'+data+'</tr>';
  return row;
}
function clearFields() {
  $('#type').val("-1");
  $('#make').val("");
  $('#model').val("");
}
function openModal(records) {
  $('#jsonModal').find('.modal-body').html('<pre>'+JSON.stringify(records,null,4)+'</pre>');
  $('#jsonModal').modal('show');
}
