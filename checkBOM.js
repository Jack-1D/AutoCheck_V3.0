var BOM = getBOM()
// loading item config from database
fetch("http://localhost/xampp/search.php",{
  method:'POST',
  headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
  body:JSON.stringify({
    'BOM': BOM
  })
})
.then(response=> response.json())
.then(data => {
  //console.clear()
  console.log(data)
  return data;
});

function getBOM(){
  var BOM = [];
  var Item = document.getElementById("ITEMTABLE_BOM").getElementsByClassName("GMSection")[3].getElementsByClassName("GMDataRow")
  for (var i = 0; i < Item.length; i++){
    var Findnum = Item[i].getElementsByClassName("GMColorNoFocus GMRow GMText GMCell")[0].innerText.trim();
    var itemNumber = Item[i].getElementsByClassName("GMColorNoFocus GMRow GMText GMCell")[1].innerText.trim();
    var SAPRelese = Item[i].getElementsByClassName("GMColorNoFocus GMRow GMText GMCell")[6].innerText.trim();
    var Substitute = Item[i].getElementsByClassName("GMColorNoFocus GMRow GMText GMCell")[8].innerText.trim();
    var Qty = Item[i].getElementsByClassName("GMColorNoFocus GMRow GMText GMCell")[9].innerText.trim();
    BOM.push({"Findnum":Findnum,"itemNumber":itemNumber, "SAPRelese":SAPRelese, "Substitute":Substitute, "Qty":Qty})
  }
  return BOM
}
