// Initialize button with user's preferred color

let submitBtn = document.getElementById("submitBtn");
let resultTable = document.getElementById("searchResult");
let ERP_textbox = document.getElementById("ERP_textbox");
document.getElementById('ERP_textbox').style.height="20px";
let Server_Address_textbox = document.getElementById("Server_Address_textbox");
let download_update = document.getElementById("download_update");
let rectangle = document.getElementById("rectangle");
let rectangle_bu = document.getElementById("rectangle_bu");
readTextFile_download("Server_Address.txt",download_update);
readTextFile("Server_Address.txt",Server_Address_textbox);

let server = Server_Address_textbox.value;
version_server = server.replace('search.php', 'manifest.json');
let search_ip = server.replace('search.php', 'debug_test/search.php')
let version = document.getElementById("version");
let version_info = document.getElementById("version_info");
let server_version;
var cls = document.querySelector('.cls');
var innt = document.querySelector('.innt');
var checkBox = document.getElementById("myCheck");

console.log(Server_Address_textbox)
function openurl() {
    window.open(search_ip);
}
function saveName(e){
  var str = ERP_textbox.value;
  localStorage.setItem('ERP',str);//save local storage item
}
function removelockstorage(e){
  localStorage.removeItem('ERP');//remove local storage item
  str = localStorage.getItem('ERP');
  ERP_textbox.value = str;
}


str = localStorage.getItem('ERP'); //get local storage item
ERP_textbox.value = str;
submitBtn.addEventListener('click',saveName);
cls.addEventListener('click',removelockstorage);
rectangle_bu.addEventListener('click',openurl);

fetch("./manifest.json")
.then(response => {
    return response.json();
})
.then(jsondata => {
    version.textContent = jsondata.version;
    version_info.textContent+=" 現在version ="+version.textContent;
});

fetch(version_server)
.then(response => {
   return response.json();
})
.then(jsondata => {server_version=jsondata.version;
rectangle.style="visibility:";
rectangle_bu.style="display:none";

if(server_version<=version.textContent){
    version_info.textContent=' 是最新版了';
  }else{
    version_info.textContent+=" 有最新版version ="+server_version;
    download_update.style="visibility:";
    }
});

//click event
submitBtn.addEventListener("click", async () => {

  //potentiallyBuggyCode()
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(tab);
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    // files: ["checkBOM.js"],
    func: checkBOM,
    args: [ERP_textbox.value,Server_Address_textbox.value]
  },
  (injectionResults) => {
      var table_list = resultTable.getElementsByTagName("tr");
      for (var i = 5; i < table_list.length-1; i++) {
          var crow1 = resultTable.getElementsByTagName("tr")[i];
          var crow12 = crow1.getElementsByTagName("td")[2];
          crow12.innerText = "";
      }
    console.log("injectionResults", injectionResults);
    for (const frameResult of injectionResults){
      let data = frameResult.result;

      console.log(data);
      check_result = data["check_result"];
      console.log("checkresult", check_result);
      err_msg = data["err_msg"];

      // 初始化表格
      let row = document.getElementById("result_table").getElementsByTagName("tr");
      for (let i = 0; i < row.length; i++){
        let cells = row[i].getElementsByTagName("td");
        for (let j = 0; j < cells.length; j++)
          cells[j].className = "";
        if(i > 4 && i < row.length - 1)
          cells[0].innerText = "?";
      }

      for (const[key, value] of Object.entries(check_result)){
        //console.log(key, value)
        row = document.getElementById(key);
        cells = row.getElementsByTagName("td");
        for(var i=0; i<cells.length; i++){
          cells[i].className=value
        }
        state_cell = cells[0];
        state_cell.innerText = value;
      }
      recommend_item = data["recommend_item"];
      for (const[key, value] of Object.entries(recommend_item)){
        //console.log(key, value)
        if(value!=''){
        row = document.getElementById(key);
        cells = row.getElementsByTagName("td");
        state_cell = cells[2];
        state_cell.innerText = value;
        state_cell.style.height ="29px";
      }
      }
      row = document.getElementById("IPC_check");
      cells = row.getElementsByTagName("td");

      for(var i=0; i<cells.length; i++){
        cells[i].className=data["IPC_number"][0];
      }
      cells[2].innerText = data["IPC_number"][1];
      cells[1].innerText = data["IPC_number"][2];
      row = document.getElementById("ERP_check");
      cells = row.getElementsByTagName("td");
      for(var i=0; i<cells.length; i++){
        cells[i].className=data["ERP_number"][0];
      }
      cells[1].innerText = data["ERP_number"][2];
      row = document.getElementById("ERP_check2");
      cells = row.getElementsByTagName("td");
      for(var i=0; i<cells.length; i++){
        cells[i].className=data["ERP_number"][0];
      }
      cells[0].innerText = data["ERP_number"][1];
      // Partname
      row = document.getElementById("ERP_partname_check");
      cells = row.getElementsByTagName("td");
      for(var i=0; i<cells.length; i++){
        cells[i].className=data["ERP_P_number"][0];
      }
      cells[1].innerText = data["ERP_P_number"][2];
      row = document.getElementById("ERP_partname_check2");
      cells = row.getElementsByTagName("td");
      for(var i=0; i<cells.length; i++){
        cells[i].className=data["ERP_P_number"][0];
      }
      cells[0].innerText = data["ERP_P_number"][1];
      document.getElementById("err_msg").innerText = "";
      for (const[key, value] of Object.entries(err_msg)){
        document.getElementById("err_msg").innerText = document.getElementById("err_msg").innerText +key+"=>"+value;
      }
    }
  });
});
//click event
//input enter event

ERP_textbox.addEventListener("keypress", function(event) {
  if (event.key == "Enter") {
    document.getElementById("submitBtn").click();
  }
});

//input enter event
// When the button is clicked, inject setPageBackgroundColor into current page
innt.addEventListener("click", async () => {
    var style_txt = {v:""};
    var style_table = {v:""};
    var html1 = {v:""};
    var html2 = {v:""};
    var style_move = {v:""};
    var style_move_all = {v:""};
    var style_button = {v:""};
    var style_button_zoom = {v:""};
    var style_zoom_frame = {v:""};
    var fame_survive = 0;
    var svg = {v:""};
    function readtextinnt(file,obj){
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    get_innt(allText,obj);
                }
            }
        }
        rawFile.send(null);
    }
    function get_innt(allText,obj){
        obj.v = allText;
    }
    //sytle & html read txt
    readtextinnt("output_txt/style1.txt",style_txt);
    readtextinnt("output_txt/style_table.txt",style_table);
    readtextinnt("output_txt/style_move.txt",style_move);
    readtextinnt("output_txt/style_move_all.txt",style_move_all);
    readtextinnt("output_txt/html1.txt",html1);
    readtextinnt("output_txt/html2.txt",html2);
    readtextinnt("output_txt/button.txt",style_button);
    readtextinnt("output_txt/button_zoom.txt",style_button_zoom);
    readtextinnt("output_txt/zoom_frame.txt",style_zoom_frame);
    html1.v = html1.v.concat("<span style='color:white;'>Server Address:</span><br><span id='server_address' style='color:white;'>",Server_Address_textbox.value,"</span>");
    //potentiallyBuggyCode()
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
    target: { tabId: tab.id },
    // files: ["innt.js"],
    func: hemlinnt,
    args: [style_txt.v,style_table.v,style_move.v,html1.v,html2.v,style_button.v,style_move_all.v,style_button_zoom.v,style_zoom_frame.v]
    },
    (injectionResults) => {
    fame_survive = injectionResults;

    });
    if(fame_survive==0){
        console.log("fame :", fame_survive);
        chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["output_txt/move.js"],

        },
        (injectionResults) => {


        });
        chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["output_txt/injection_input_event.js"],

        },
        (injectionResults) => {


        });

    }
});

function readTextFile(file,Server_Address_textbox)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                ch_server(allText,Server_Address_textbox);
            }
        }
    }
    rawFile.send(null);
}

function readTextFile_download(file,download_update)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                rawFile.writeText
                download_server(allText,download_update);
            }
        }
    }
    rawFile.send(null);
}

function download_server(value,server){
  value = value.replace('search.php','update.zip');
  server.href = value;
}

function ch_server(value,server){
  server.value = value;
}

function hemlinnt(style_txt,style_table,style_move,html1,html2,style_button,style_move_all,style_button_zoom,style_zoom_frame){
    // var head = document.getElementsByTagName('head')[0];
    // var link = document.createElement('link');
    // link.type='text/css';
    // link.rel = 'stylesheet';
    // link.href = 'frame.css';
    // head.appendChild(link);
    if(document.getElementsByClassName("all frame").length>0){
        console.log(document.getElementsByClassName("all frame"));
        return 1;
    }
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = style_txt;
    document.getElementsByTagName('head')[0].appendChild(style);
    var style_table_innt = document.createElement('style');
    style_table_innt.type = 'text/css';
    style_table_innt.innerHTML = style_table;
    document.getElementsByTagName('head')[0].appendChild(style_table_innt);
    var style_move_innt = document.createElement('style');
    style_move_innt.type = 'text/css';
    style_move_innt.innerHTML = style_move;
    document.getElementsByTagName('head')[0].appendChild(style_move_innt);
    var style_button_zoom_innt = document.createElement('style');
    style_button_zoom_innt.type = 'text/css';
    style_button_zoom_innt.innerHTML = style_button_zoom;
    document.getElementsByTagName('head')[0].appendChild(style_button_zoom_innt);
    var html = document.createElement('div');
    html.className = "all frame";//.id extraframe ||.className move bg1
    html.id = "all frame";
    html.innerHTML = html1;
    document.getElementsByTagName('body')[0].appendChild(html);
    var html_innt = document.createElement('div');
    html_innt.id = "zoom_frame";
    html_innt.style = "display: none;";
    html_innt.innerHTML = html2;
    document.getElementsByTagName('body')[0].appendChild(html_innt);
    var style_button_innt = document.createElement('style');
    style_button_innt.type = 'text/css';
    style_button_innt.innerHTML = style_button;
    document.getElementsByTagName('head')[0].appendChild(style_button_innt);
    var style_move_all_innt = document.createElement('style');
    style_move_all_innt.type = 'text/css';
    style_move_all_innt.innerHTML = style_move_all;
    document.getElementsByTagName('head')[0].appendChild(style_move_all_innt);
    var style_zoom_frame_innt = document.createElement('style');
    style_zoom_frame_innt.type = 'text/css';
    style_zoom_frame_innt.innerHTML = style_zoom_frame;
    document.getElementsByTagName('head')[0].appendChild(style_zoom_frame_innt);
    //var js_move_innt = document.createElement('script');
    //js_move_innt.type = "module";//XSS def
    // js_move_innt.innerHTML = "var i =10;";
    // document.getElementsByTagName('body')[0].appendChild(js_move_innt);
    // document.body.innerHTML += html1;
    return 0;
}
// addlistener runtime debug_test

function checkBOM(ERP_info,Server_Address){
  var BOM = [];
  var IPC_number=document.getElementsByClassName("column_one layout")[0].getElementsByTagName("h2")[0].textContent;
  var Item = document.getElementById("ITEMTABLE_BOM").getElementsByClassName("GMPageOne")[1].getElementsByClassName("GMSection")[0].getElementsByTagName("tbody")[0].children;
  for (var i = 0; i < Item.length; i++){
    if(Item[i].hasAttribute('class')){
      if(Item[i].attributes['class'].value=="GMDataRow"){
        var row_context = Item[i].innerText;
        row_context = row_context.split("\t");
        var Findnum = row_context[2].trim();
        var itemNumber = row_context[4].trim();
        var SAPRelese = row_context[25].trim();
        var Substitute = row_context[9].trim();
        var Qty = row_context[10].trim();
        BOM.push({"Findnum":Findnum,"itemNumber":itemNumber, "SAPRelese":SAPRelese, "Substitute":Substitute, "Qty":Qty})
      }
    }
  }
  console.clear()
  console.log(BOM)

  check_result = fetch(Server_Address,{
        method:'POST',
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body:JSON.stringify({
          'BOM': BOM,
          'ERP_info':ERP_info,
          'IPC_number':IPC_number
        })
      })
      .then(response=> response.json())
      .then(data => {
        //color RGB https://www.ifreesite.com/color/
        for (var i = 1; i < Item.length; i++){
          if(Item[i].hasAttribute('style')){
            if(Item[i].style.display=="none")
              Item[i].style.display='';
          }
          if((Item[i].hasAttribute('style') || Item[i].getElementsByTagName("tr"))&& !Item[i].hasAttribute('class')){
            var Item2 = Item[i];
            Item2 = Item2.getElementsByClassName("GMSection")[0].getElementsByTagName("tbody")[0].children;
            for (var i2 = 1; i2 < Item2.length; i2++){
              var row_context = Item2[i2].innerText;
              row_context = row_context.split("\t");
              var itemNumber = row_context[4].trim();
              if(data['uncheck'].includes(itemNumber)){
                var cells = Item2[i2].getElementsByTagName("td");
                for (var j = 0; j<cells.length; j++){
                  cells[j].style.backgroundColor = '#95CACA';
                }
              }else if(data['mark_item'][itemNumber]=="pass"){
                  var cells = Item2[i2].getElementsByTagName("td");
                  for (var j = 0; j<cells.length; j++){
                    cells[j].style.backgroundColor = "#28FF28";
                  }
              }else if(data['mark_item'][itemNumber]=="warning"){
                  var cells = Item2[i2].getElementsByTagName("td");
                  for (var j = 0; j<cells.length; j++){
                    cells[j].style.backgroundColor = "#FFFF37";
                  }
              }else if(data['mark_item'][itemNumber]=="failed"){
                  var cells = Item2[i2].getElementsByTagName("td");
                  for (var j = 0; j<cells.length; j++){
                    cells[j].style.backgroundColor = "#FF9797";
                  }
              }
              console.log("item number:",data['mark_item'][itemNumber],":",itemNumber);
            }
          }
          if(Item[i].hasAttribute('class')){
            if(Item[i].attributes['class'].value=="GMDataRow"){
              var row_context = Item[i].innerText;
              row_context = row_context.split("\t");
              var itemNumber = row_context[4].trim();
              if(data['uncheck'].includes(itemNumber)){
                var cells = Item[i].getElementsByTagName("td");
                for (var j = 0; j<cells.length; j++){
                  cells[j].style.backgroundColor = '#95CACA';
                }
              }else if(data['mark_item'][itemNumber]=="pass"){
                  var cells = Item[i].getElementsByTagName("td");
                  for (var j = 0; j<cells.length; j++){
                    cells[j].style.backgroundColor = "#28FF28";
                  }
              }else if(data['mark_item'][itemNumber]=="warning"){
                  var cells = Item[i].getElementsByTagName("td");
                  for (var j = 0; j<cells.length; j++){
                    cells[j].style.backgroundColor = "#FFFF37";
                  }
              }else if(data['mark_item'][itemNumber]=="failed"){
                  var cells = Item[i].getElementsByTagName("td");
                  for (var j = 0; j<cells.length; j++){
                    cells[j].style.backgroundColor = "#FF9797";
                  }
              }
                console.log("item number:",data['mark_item'][itemNumber],":",itemNumber)
            }
          }
        }

        return data;
      });
  return check_result;
}
