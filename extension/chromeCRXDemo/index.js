
    var HelloTutorialModule = null; // Global application object.
    var statusText = 'NO-STATUS';
    var word = document.getElementById('root');
    var HttpClient = function() {
        this.get = function(aUrl, aCallback) {
            anHttpRequest = new XMLHttpRequest();
            anHttpRequest.onreadystatechange = function() { 
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
    //var result = this.requestBonjour();
    //this.handleBonjourJSON(result);

    this.requestBonjour();
  },

  requestBonjour:function (event)
 {  //var BonjourData = "";
  
  var aClient = new HttpClient();
  aClient.get('http://localhost:8888/restdemo', function(answer) {
      // do something with answer
     // var root = document.getElementById("root");
    //root.innerHTML = answer;
      BrowseBonjour.handleBonjourJSON(answer);
      //$('#container').jstree();
  });
  //return '{"RCSCO-New._csco-sb._tcp.local.":{"MACAddress":"0000cb123458","PIDVID":"CSCONEW V1.0","deviceDescr":"Some New Cisco Box","deviceType":"New","fmVersion":"1.0.1","fullname":"RCSCO-New._csco-sb._tcp.local.","hostname":"CSCO-New","hosttarget":"xingwan2-mac.local.","model":"NEW100","serialNo":"CBT123458"},"cameraabc123._csco-sb._tcp.local.":{"MACAddress":"123123abc123","PIDVID":"VC220 V1.1","deviceDescr":"Fake Camera service","deviceType":"IPCamera","fmVersion":"1.2.1","fullname":"cameraabc123._csco-sb._tcp.local.","hostname":"FrontDoor","hosttarget":"xingwan2-mac.local.","model":"VC220","serialNo":"CAM111222"},"cameraabc456._csco-sb._tcp.local.":{"MACAddress":"123123abc456","PIDVID":"VC220 V1.1","deviceDescr":"Another Fake Camera service","deviceType":"IPCamera","fmVersion":"1.2.1","fullname":"cameraabc456._csco-sb._tcp.local.","hostname":"BackDoor","hosttarget":"xingwan2-mac.local.","model":"VC220","serialNo":"CAM333444"},"myBE3000._csco-sb._tcp.local.":{"MACAddress":"0000cb123457","PIDVID":"MCS7890-C1 V1.0","deviceType":"Voice Platform","fmVersion":"8.6.4.10000-15","fullname":"myBE3000._csco-sb._tcp.local.","hostname":"myBE3000","hosttarget":"xingwan2-mac.local.","model":"MCS7890-C1","serialNo":"CSCO1234567"},"mySPA112._csco-sb._tcp.local.":{"MACAddress":"0000cb123456","PIDVID":"SPA112 V1.0","deviceDescr":"Fake Payton service","deviceType":"Phone Adapter","fmVersion":"1.0.1","fullname":"mySPA112._csco-sb._tcp.local.","hostname":"mySPA112","hosttarget":"xingwan2-mac.local.","model":"SPA112","serialNo":"CBT123456"},"nas7890ab._csco-sb._tcp.local.":{"MACAddress":"1234567890ab","PIDVID":"NSS322 V1.0","deviceDescr":"Fake NAS service","deviceType":"NAS","fmVersion":"1.1.0","fullname":"nas7890ab._csco-sb._tcp.local.","hostname":"TheNas","hosttarget":"xingwan2-mac.local.","model":"NSS322","serialNo":"QNP123456"},"onpluscbacba._csco-sb._tcp.local.":{"MACAddress":"012012cbacba","PIDVID":"ON100 V1.1","deviceDescr":"A Fake ONplus Appliance","deviceType":"Service Appliance","fmVersion":"5.2.1","fullname":"onpluscbacba._csco-sb._tcp.local.","hostname":"","hosttarget":"xingwan2-mac.local.","model":"ON100","serialNo":"TBA555666"},"router456789._csco-sb._tcp.local.":{"MACAddress":"00000c456789","PIDVID":"SRP527W V3.0","deviceDescr":"Fake router","deviceType":"Router","fmVersion":"1.01.16","fullname":"router456789._csco-sb._tcp.local.","hostname":"Gateway","hosttarget":"xingwan2-mac.local.","model":"SRP527W","serialNo":"CBT123456"},"thedump._csco-sb._tcp.local.":{"MACAddress":"1234567890ab","PIDVID":"NSS326 V1.0","deviceDescr":"Fake","deviceType":"NAS","fmVersion":"1.1.0","fullname":"thedump._csco-sb._tcp.local.","hostname":"Test","hosttarget":"xingwan2-mac.local.","model":"NSS326","serialNo":"QNP123456"},"wirelessaabbcc._csco-sb._tcp.local.":{"MACAddress":"001122aabbcc","PIDVID":"AP541N-A-K9 V1.0","deviceDescr":"Fake Wifi service","deviceType":"WAP","fmVersion":"1.6.2","fullname":"wirelessaabbcc._csco-sb._tcp.local.","hostname":"MyWAP","hosttarget":"xingwan2-mac.local.","model":"AP541N-A-K9","serialNo":"WIFI1000"}}';
 },
 handleBonjourJSON:function (sourceStr){
  var BonjourObj = JSON.parse(sourceStr);

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
    var device = source;
    if (device.hasOwnProperty("hostname")){
      var hostname = device.hostname;
      var root = document.getElementById("root");
      var ul;//root.childNodes[];
      if(ul==undefined){
        ul = document.createElement("ul");
      }
      
      var li = document.createElement("li");
      var aLink = document.createElement("a");
      //aLink.setAttribute("class","btn btn-default");
      aLink.setAttribute("data-toggle","tooltip");
      aLink.setAttribute("data-placement","right");
      aLink.setAttribute("data-html","true");
      aLink.setAttribute("data-html","true");
      aLink.setAttribute("onClick","BrowseBonjour.deviceClick();");

      ul.setAttribute("class","nav nav-list tree");
      aLink.innerHTML= hostname;
      li.appendChild(aLink);
      //li.value = hostname;
      ul.appendChild(li);
      /*
      var ul2 = document.createElement("ul");
      ul2.setAttribute("class","nav nav-list tree");
      ul2.setAttribute("style","display: none;");
      for (var key in device) {
        var value = device[key];
        if(key!="hostname"){
          
          var li2 = document.createElement("li");
          var aLink = document.createElement("a");
          aLink.setAttribute("href","#");
          
          li2.appendChild(aLink);
          ul2.appendChild(li2);
          aLink.innerHTML = key+':'+value;
          li.appendChild(ul2);
        }
        
      }
      */
      var tooltipContent="";
      for (var key in device) {
        var value = device[key];

        if(key!="hostname"){
          
          
          tooltipContent += key+':'+value+'<br>';
          
        }
        
      }
      aLink.setAttribute("title",tooltipContent);
      root.appendChild(ul);
    }
    
  },
  deviceClick:function(){
    var iframe = document.getElementById("mainIframe");
    iframe.src = "http://www.baidu.com"
  },
  emptyTree:function(){
    var root = document.getElementById("root");
    root.innerHTML = "<label class='tree-toggle nav-header'>FindIT</label>";
  }
  };
document.addEventListener('DOMContentLoaded', function () {
  BrowseBonjour.refresh();
  //setInterval("BrowseBonjour.refresh();", 10000);
  
  //var result = BrowseBonjour.requestBonjour();
  //BrowseBonjour.handleBonjourJSON(result);
  

});

//contextMenu subscribe to elements
$(function() {
  
  var $contextMenu = $("#contextMenu");
  
  $("body").on("contextmenu", "div ul li a", function(e) {
    $contextMenu.css({
      display: "block",
      left: e.pageX,
      top: e.pageY
    });
    return false;
  });
  
  $contextMenu.on("click", "a", function() {
     $contextMenu.hide();
  });
  
});

