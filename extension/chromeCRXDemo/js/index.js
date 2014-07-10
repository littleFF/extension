
    var HelloTutorialModule = null; // Global application object.
    var statusText = 'NO-STATUS';
    var token = '';
    var word = document.getElementById('root');
    var HttpClient = function() {
        this.get = function(aUrl, aCallback) {
            anHttpRequest = new XMLHttpRequest();
            anHttpRequest.onreadystatechange = function() { 
              //debugger;
                if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                    aCallback(anHttpRequest.responseText);
            }

            anHttpRequest.open( "GET", aUrl, true );            
            anHttpRequest.send( null );
        }
    };
    
var BrowseBonjour = {
    // Indicate load success.

  refresh:function(){
    this.emptyTree();
    var aClient = new HttpClient();
    aClient.get('http://localhost:8888/devices/refresh', function(answer) {
      if(!answer) return;
      var responseJson = JSON.parse(answer);
      token = responseJson.token;
      var data = responseJson.data;
      if(data=="NO CHANGE"){
        return;
      }else if(data=="Refreshed"){
        setTimeout("BrowseBonjour.browseLoop();", 5000);
      }else{
        BrowseBonjour.handleBonjourJSON(data);
      }
        
        //$('#container').jstree();
    });
  },
  browseLoop:function(){

    this.requestBonjour();
  },
  OpenInNewTap:function(url,type,winAgus){
    var win= window.open(url,type,winAgus);
    win.focus();
    if (widget) widget.openURL(url);
  },
  requestBonjour:function (event)
 {  //var BonjourData = "";
  var aClient = new HttpClient();
  aClient.get('http://localhost:8888/devices/?token='+token, function(answer) {
    if(!answer) return;
    //debugger;
    var responseJson = JSON.parse(answer);
    token = responseJson.token;
    var data = responseJson.data;
    if(data=="NO CHANGE"){
      return;
    }else if(data=="Refreshed"){
      BrowseBonjour.browseLoop();
    }else{
      BrowseBonjour.emptyTree();
      BrowseBonjour.handleBonjourJSON(data);
    }
      
      //$('#container').jstree();
  });
  //return '{"RCSCO-New._csco-sb._tcp.local.":{"MACAddress":"0000cb123458","PIDVID":"CSCONEW V1.0","deviceDescr":"Some New Cisco Box","deviceType":"New","fmVersion":"1.0.1","fullname":"RCSCO-New._csco-sb._tcp.local.","hostname":"CSCO-New","hosttarget":"xingwan2-mac.local.","model":"NEW100","serialNo":"CBT123458"},"cameraabc123._csco-sb._tcp.local.":{"MACAddress":"123123abc123","PIDVID":"VC220 V1.1","deviceDescr":"Fake Camera service","deviceType":"IPCamera","fmVersion":"1.2.1","fullname":"cameraabc123._csco-sb._tcp.local.","hostname":"FrontDoor","hosttarget":"xingwan2-mac.local.","model":"VC220","serialNo":"CAM111222"},"cameraabc456._csco-sb._tcp.local.":{"MACAddress":"123123abc456","PIDVID":"VC220 V1.1","deviceDescr":"Another Fake Camera service","deviceType":"IPCamera","fmVersion":"1.2.1","fullname":"cameraabc456._csco-sb._tcp.local.","hostname":"BackDoor","hosttarget":"xingwan2-mac.local.","model":"VC220","serialNo":"CAM333444"},"myBE3000._csco-sb._tcp.local.":{"MACAddress":"0000cb123457","PIDVID":"MCS7890-C1 V1.0","deviceType":"Voice Platform","fmVersion":"8.6.4.10000-15","fullname":"myBE3000._csco-sb._tcp.local.","hostname":"myBE3000","hosttarget":"xingwan2-mac.local.","model":"MCS7890-C1","serialNo":"CSCO1234567"},"mySPA112._csco-sb._tcp.local.":{"MACAddress":"0000cb123456","PIDVID":"SPA112 V1.0","deviceDescr":"Fake Payton service","deviceType":"Phone Adapter","fmVersion":"1.0.1","fullname":"mySPA112._csco-sb._tcp.local.","hostname":"mySPA112","hosttarget":"xingwan2-mac.local.","model":"SPA112","serialNo":"CBT123456"},"nas7890ab._csco-sb._tcp.local.":{"MACAddress":"1234567890ab","PIDVID":"NSS322 V1.0","deviceDescr":"Fake NAS service","deviceType":"NAS","fmVersion":"1.1.0","fullname":"nas7890ab._csco-sb._tcp.local.","hostname":"TheNas","hosttarget":"xingwan2-mac.local.","model":"NSS322","serialNo":"QNP123456"},"onpluscbacba._csco-sb._tcp.local.":{"MACAddress":"012012cbacba","PIDVID":"ON100 V1.1","deviceDescr":"A Fake ONplus Appliance","deviceType":"Service Appliance","fmVersion":"5.2.1","fullname":"onpluscbacba._csco-sb._tcp.local.","hostname":"","hosttarget":"xingwan2-mac.local.","model":"ON100","serialNo":"TBA555666"},"router456789._csco-sb._tcp.local.":{"MACAddress":"00000c456789","PIDVID":"SRP527W V3.0","deviceDescr":"Fake router","deviceType":"Router","fmVersion":"1.01.16","fullname":"router456789._csco-sb._tcp.local.","hostname":"Gateway","hosttarget":"xingwan2-mac.local.","model":"SRP527W","serialNo":"CBT123456"},"thedump._csco-sb._tcp.local.":{"MACAddress":"1234567890ab","PIDVID":"NSS326 V1.0","deviceDescr":"Fake","deviceType":"NAS","fmVersion":"1.1.0","fullname":"thedump._csco-sb._tcp.local.","hostname":"Test","hosttarget":"xingwan2-mac.local.","model":"NSS326","serialNo":"QNP123456"},"wirelessaabbcc._csco-sb._tcp.local.":{"MACAddress":"001122aabbcc","PIDVID":"AP541N-A-K9 V1.0","deviceDescr":"Fake Wifi service","deviceType":"WAP","fmVersion":"1.6.2","fullname":"wirelessaabbcc._csco-sb._tcp.local.","hostname":"MyWAP","hosttarget":"xingwan2-mac.local.","model":"AP541N-A-K9","serialNo":"WIFI1000"}}';
 },
 handleBonjourJSON:function (sourceJson){
  var BonjourObj = sourceJson;

  for (var instanceName in BonjourObj) {
    if (BonjourObj.hasOwnProperty(instanceName)){
      var bonjour = BonjourObj[instanceName];
      this.addNode(bonjour,instanceName);
    }
  }
  $('a').tooltip();
  $('.tree-toggle').click(function () {
    $(this).parent().children('ul.tree').toggle(200);
  });
 },
  
  addNode:function (source,id){
    //debugger;
    var device = source;
    if (device.hasOwnProperty("hostname")){
      var hostname = device.hostname;
      var categoryID,treeID;
      var deviceType = device.deviceType.toLowerCase();
      var root=document.getElementById("root");
      var ul=document.getElementById("rootul");
      if(!ul){
        ul = document.createElement("ul");
        ul.setAttribute("id","rootul");
        ul.setAttribute("class","nav nav-list tree");
        root.appendChild(ul);
      }


        if(deviceType.indexOf("camera") > -1){
            this.isCameraSorted = false;
            categoryID = "camera";
            treeID = "camera16";
        }else if(deviceType.indexOf("nas") > -1){
            this.isStorageSorted = false;
            categoryID = "storage";
            treeID = "storage16";
        }else if(deviceType.indexOf("phone") > -1){
             this.isPhoneSorted = false;
             categoryID = "phone";
             treeID = "phone16";
        }else if(deviceType.indexOf("router") > -1){
            this.isRouterSorted = false;
            categoryID = "router";
            treeID = "router16";
        }else if(deviceType.indexOf("stackable") > -1){
            
        }else if(deviceType.indexOf("stackable") == -1 && deviceType.indexOf("switch") > -1){
            this.isSwitchSorted = false;
            categoryID = "switch";
            treeID = "switch16";
        }else if(deviceType.indexOf("voice") > -1){
            this.isVoiceSorted = false;
            categoryID = "voice";
            treeID = "voicePlatform16";
        }else if(deviceType.indexOf("wap") > -1){
            this.isWirelessSorted = false;
            categoryID = "wireless";
            treeID = "wap16";
        }else if(deviceType.indexOf("appliance") > -1){
            this.isTBASorted = false;
            categoryID = "appliance";
            treeID = "serviceAppliance16";
        } else {
            this.isOtherSorted = false;
            categoryID = "other";
            treeID = "otherDevice16";           
        }
        deviceTypeEle = document.getElementById(categoryID);
        var deviceUl=document.getElementById(categoryID+"ul");
        if(!deviceTypeEle) {
          deviceTypeEle = document.createElement("li");
          deviceTypeEle.setAttribute("id",categoryID);
          //deviceUl=document.getElementById(categoryID+"ul");
          if(!deviceUl){
            deviceUl = document.createElement("ul");
            deviceUl.setAttribute("id",categoryID+"ul");
            deviceUl.setAttribute("class","nav nav-list tree");
            deviceTypeEle.innerHTML = "<img src='images/category/"+treeID+".png' ><label class='tree-toggle nav-header'>"+categoryID+"</label>";
            
          }
        }
        deviceTypeEle.appendChild(deviceUl);
        ul.appendChild(deviceTypeEle);
        //deviceTypeEle.innerHTML = "<label class='tree-toggle nav-header'>"+categoryID+"</label>";
      
      var li = document.createElement("li");
      var aLink = document.createElement("a");
      //aLink.setAttribute("class","btn btn-default");
      aLink.setAttribute("data-toggle","tooltip");
      aLink.setAttribute("data-placement","auto");
      aLink.setAttribute("data-html","true");
      aLink.setAttribute("style","color:black;");
      aLink.setAttribute("onClick","BrowseBonjour.deviceClick();");

      
      aLink.innerHTML= hostname;
      li.appendChild(aLink);
      //li.value = hostname;
      deviceUl.appendChild(li);

      var tooltipContent="";
      for (var key in device) {
        var value = device[key];

        if(key!="hostname"){
          
          
          tooltipContent += key+':'+value+'<br>';
          
        }
        
      }
      aLink.setAttribute("title",tooltipContent);
      //root.appendChild(ul);
    }
    
  },
  deviceClick:function(){
    var iframe = document.getElementById("mainIframe");
    iframe.src = "https://www.ciscofeedback.vovici.com/se.ashx?s=6A5348A7619E59BC"
  },
  emptyTree:function(){
    var root = document.getElementById("root");
    root.innerHTML = "<label class='tree-toggle nav-header'>FindIT</label>";
  }
  };
document.addEventListener('DOMContentLoaded', function () {
  BrowseBonjour.browseLoop();
  setInterval("BrowseBonjour.browseLoop();", 10000);
  
  //var result = BrowseBonjour.requestBonjour();
  //BrowseBonjour.handleBonjourJSON(result);
  

});

//contextMenu subscribe to elements
$(function() {
  
  var $contextMenu = $("#contextMenu");
  
  $("body").on("contextmenu", "ul#rootul a", function(e) {
    $contextMenu.css({
      display: "block",
      left: e.pageX,
      top: e.pageY
    });
    return false;
  });

  //make sure menu closes on any click
  $(document).click(function () {
    $contextMenu.hide();
  });
  

jQuery.i18n.properties({// load language file
 name:'scriptStrings', // file name
 path:'resources/locale/', // file directory
 mode:'map', // use map to store
 language:'zh-CN',
 callback: function() {// loaded callback function
   $('#LogoText').html($.i18n.prop('FindIT')); 
 } 
 });
  
});