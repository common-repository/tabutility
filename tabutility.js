


TabUtility = {}

TabUtility.msLast 		= 0;

//-----------------------------------------------------------------------------------

TabUtility.Tag = function(query, createTag)
{
	var elementList = document.querySelectorAll(query); 
	
	for(var i = 0 ; i < elementList.length ; i++)
	{
		if( i == 0 ) 
		{
			this.element = elementList[i];
			
			var aType 	 = this.element.attributes["type"];
			var aHref 	 = this.element.attributes["href"];
			var aContent = this.element.attributes["content"];
		
			this.originalType 	 = aType 	 == null? null : aType.value;
			this.originalHref 	 = aHref 	 == null? null : aHref.value;
			this.originalContent = aContent == null? null : aContent.value;
		}
		
		else
			elementList[i].parentNode.removeChild(elementList[i]);
	}
	
	if( ! this.element ) 
	{
		var head = document.createElement( 'head' );
		head.innerHTML = createTag;
		this.element = head.firstChild;

		document.querySelector("head").appendChild(this.element);
	}
}

TabUtility.Tag.prototype.element = null;

TabUtility.Tag.prototype.originalType    = null;
TabUtility.Tag.prototype.originalHref    = null;
TabUtility.Tag.prototype.originalContent = null;

TabUtility.Tag.prototype.SetAttribute = function(name, val)
{
	if( val != null && val != undefined )
		this.element.setAttribute(name, val);
	
	else
		this.element.removeAttribute(name);
}

//--------------------------------------------------------------------------------------

TabUtility.ModeDormant = {};
TabUtility.ModeDormant.timeoutSecs 	= 2;
TabUtility.ModeDormant.timeout		= 0;

TabUtility.ModeDormant.Init = function()
{
	TabUtility.ModeDormant.timeout = 0;
}

TabUtility.ModeDormant.NextFrame = function(msTime, msDelta)
{
	if( document.hasFocus() || TabUtility.ModeDormant.timeout == 0 ) 
		TabUtility.ModeDormant.timeout = msTime + (TabUtility.ModeDormant.timeoutSecs * 1000);
	
	else if( msTime > TabUtility.ModeDormant.timeout )
		TabUtility.SetMode(TabUtility.ModeAttract);
}

//-----------------------------------------------------------------------------------

TabUtility.ModeAttract = {};
TabUtility.ModeAttract.baseAssetFolder	= "";
TabUtility.ModeAttract.iconTag			= null;
TabUtility.ModeAttract.themeTag			= null;
TabUtility.ModeAttract.iconHrefArray    = ["original","original","info","info"];
TabUtility.ModeAttract.frameCounter 	= 0;
TabUtility.ModeAttract.msFrameLength	= 500;
TabUtility.ModeAttract.titleArray    	= ["original","original","Hey!","Special Offer!"];
TabUtility.ModeAttract.themeColArray	= ["original","original","#ff0000", "#00FF00"];
TabUtility.ModeAttract.titleOriginal 	= null;
TabUtility.ModeAttract.msLastFrame		= 0;


TabUtility.ModeAttract.Init = function()
{
	TabUtility.ModeAttract.titleOriginal = document.title || "";
	
	TabUtility.ModeAttract.iconTag = new TabUtility.Tag("link[id='favicon'], link[rel='shortcut icon'], link[rel='icon']", "<link id='favicon' rel='shortcut icon' />")
	
	TabUtility.ModeAttract.themeTag = new TabUtility.Tag("meta[name='theme-color']", "<meta name='theme-color' />");	
}

TabUtility.ModeAttract.NextFrame = function(msTime, msDelta)
{
	if( document.hasFocus() ) 
	{
		TabUtility.SetMode(TabUtility.ModeOffer);
	}
	
	if( msTime > TabUtility.ModeAttract.msLastFrame + TabUtility.ModeAttract.msFrameLength )
	{
		TabUtility.ModeAttract.msLastFrame = msTime;
		
		TabUtility.ModeAttract.Advance();
	}
}

TabUtility.ModeAttract.Advance = function()
{
	var index;
	
	if( TabUtility.ModeAttract.titleArray != null )
	{
		index = TabUtility.ModeAttract.frameCounter % TabUtility.ModeAttract.titleArray.length;
		
		var str = TabUtility.ModeAttract.titleArray[index];
		
		if( str == "original" )
			str = TabUtility.ModeAttract.titleOriginal;
		
		document.title = str;
	}
	
	if( TabUtility.ModeAttract.themeColArray != null )
	{
		index = TabUtility.ModeAttract.frameCounter % TabUtility.ModeAttract.themeColArray.length;
		var col = TabUtility.ModeAttract.themeColArray[index];
		
		if( col == "original" )
			col = TabUtility.ModeAttract.themeTag.originalContent;
		
		TabUtility.ModeAttract.themeTag.SetAttribute("content", col);
	}	
	
	if( TabUtility.ModeAttract.iconHrefArray != null )
	{
		index = TabUtility.ModeAttract.frameCounter % TabUtility.ModeAttract.iconHrefArray.length;
		var href = TabUtility.ModeAttract.iconHrefArray[index];
		var type = "image/png";
		
		if( href == "original" )
		{
			if( TabUtility.ModeAttract.iconTag.originalHref )
			{
				href = TabUtility.ModeAttract.iconTag.originalHref;
				type = TabUtility.ModeAttract.iconTag.originalType;
			}
			
			else
			{
				href = TabUtility.ModeAttract.baseAssetFolder + "blank.png";
			}
		}
		
		else
		{
			href = TabUtility.ModeAttract.baseAssetFolder + href + ".png";
		}
		
		TabUtility.ModeAttract.iconTag.SetAttribute("type", type);
		TabUtility.ModeAttract.iconTag.SetAttribute("href", href);
	}	
	
	TabUtility.ModeAttract.frameCounter++;
}

//-----------------------------------------------------------------------------------

TabUtility.ModeOffer = {};
TabUtility.ModeOffer.strHeading 	= "Special Offer";
TabUtility.ModeOffer.colBackground  = "red";
TabUtility.ModeOffer.colText		= "white";
TabUtility.ModeOffer.strText 		= "Limited time offer";
TabUtility.ModeOffer.buttonType		= 1;
TabUtility.ModeOffer.hrefLink		= "http://www.example.com";
TabUtility.ModeOffer.secsTimeout	= 30;
TabUtility.ModeOffer.boolRedirect	= false;
TabUtility.ModeOffer.strFontFamily  = "Arial, Helvetica, sans-serif";
TabUtility.ModeOffer.sizeText		= 12;

TabUtility.ModeOffer.eParent		= null;
TabUtility.ModeOffer.eTimer			= null;
TabUtility.ModeOffer.msStart		= 0;

TabUtility.ModeOffer.Init = function()
{
	if( TabUtility.ModeOffer.boolRedirect )
	{
		window.location.href = TabUtility.ModeOffer.hrefLink;
		return;
	}
	
	TabUtility.ModeOffer.msStart = new Date().getTime();
	
	TabUtility.ModeOffer.eParent = document.createElement("div");
	TabUtility.ModeOffer.eParent.style.position = "fixed";
	TabUtility.ModeOffer.eParent.style.left = "1em";
	TabUtility.ModeOffer.eParent.style.top = "1em";
	TabUtility.ModeOffer.eParent.style.margin   = "1em";
	TabUtility.ModeOffer.eParent.style.textAlign = "center";
	TabUtility.ModeOffer.eParent.style.borderRadius = "1em";
	TabUtility.ModeOffer.eParent.style.backgroundColor = TabUtility.ModeOffer.colBackground;
	
	TabUtility.ModeOffer.eParent.style.fontFamily = TabUtility.ModeOffer.strFontFamily;
	
	 
	var eHeading = document.createElement("h1");
	eHeading.style.margin = "1em";
	eHeading.style.color = TabUtility.ModeOffer.colText;
	eHeading.innerText = TabUtility.ModeOffer.strHeading;
	TabUtility.ModeOffer.eParent.appendChild(eHeading);
	
	eHeading.style.fontSize = "" + (TabUtility.ModeOffer.sizeText * 2) + "px";
	
	
	
	var eText = document.createElement("p");
	eText.style.margin = "1em";
	eText.style.color = TabUtility.ModeOffer.colText;
	eText.style.textAlign = "center";
	eText.innerText = TabUtility.ModeOffer.strText;
	TabUtility.ModeOffer.eParent.appendChild(eText);
	
	eText.style.fontSize = "" + (TabUtility.ModeOffer.sizeText * 1) + "px";
	
	if( TabUtility.ModeOffer.secsTimeout != 0 )
	{
		TabUtility.ModeOffer.eTimer = document.createElement("p");
		TabUtility.ModeOffer.eTimer.style.margin = "1em";
		TabUtility.ModeOffer.eTimer.style.color = TabUtility.ModeOffer.colText;
		TabUtility.ModeOffer.eTimer.style.textAlign = "center";
		TabUtility.ModeOffer.eParent.appendChild(TabUtility.ModeOffer.eTimer);
	}
	
	var eLink = document.createElement("a");
	eLink.href = TabUtility.ModeOffer.hrefLink;
	TabUtility.ModeOffer.eParent.appendChild(eLink);
	eLink.style.margin = "1em";
	
	var eButton = document.createElement("img");
	eButton.src = TabUtility.ModeOffer.buttonType.indexOf("data:") == 0? TabUtility.ModeOffer.buttonType : TabUtility.ModeOffer.baseAssetFolder + TabUtility.ModeOffer.buttonType + ".png";
	eLink.appendChild(eButton);
	
	
	document.documentElement.appendChild(TabUtility.ModeOffer.eParent);
}

TabUtility.ModeOffer.NextFrame = function(msTime, msDelta)
{
	if( TabUtility.ModeOffer.eTimer != null ) 
	{
		var msRemain = Math.max(0, (TabUtility.ModeOffer.secsTimeout * 1000) - (msTime - TabUtility.ModeOffer.msStart) );
		
		if( msRemain == 0 )
		{
			document.documentElement.removeChild(TabUtility.ModeOffer.eParent);
			TabUtility.SetMode(TabUtility.ModeLapsed);
		}
		
		else
		{
			var secs = Math.floor(msRemain / 1000.0);
			var ms   = msRemain - (secs * 1000);
			
			var strMs = "" + ms;
			while(strMs.length != 3)
				strMs = "0" + strMs;
			
			TabUtility.ModeOffer.eTimer.innerText = "" + secs + ":" + strMs;
		}
	}
		
}

//-----------------------------------------------------------------------------------

TabUtility.ModeLapsed = {};

TabUtility.ModeLapsed.Init = function()
{
	
}

TabUtility.ModeLapsed.NextFrame = function(msTime, msDelta)
{
}

//-----------------------------------------------------------------------------------

TabUtility.mode = null;

TabUtility.SetMode = function(mode)
{
	TabUtility.mode = mode;
	mode.Init();
}

TabUtility.OnFrame = function()
{
	var msTime  = new Date().getTime();
	var msDelta = msTime - TabUtility.msLast;
	TabUtility.msLast = msTime;
	
	TabUtility.mode.NextFrame(msTime, msDelta);
}



TabUtility.Init = function()
{
	TabUtility.SetMode(TabUtility.ModeDormant);
	
	setInterval(TabUtility.OnFrame, 1000/60 );
}

TabUtility.Reset = function()
{
	TabUtility.Init();
}

TabUtility.Trim = function(str)
{
	if( String.prototype.trim )
		return str.trim();
	
	else
		 return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}


TabUtility.CleanInt = function(str, min, max)
{
	var n = parseFloat(TabUtility.Trim(str));
	
	if( isNaN(n) ) 
		return min;
	
	return Math.floor(Math.max(min, Math.min(max, n)));
}

TabUtility.CleanNumber   = function(str, min, max)
{
	var n = parseFloat( TabUtility.Trim(str) );
	
	if( isNaN(n) )
		return min;
	
	return Math.max(min, Math.min(max, n));
}

TabUtility.CleanStr = function(str)
{
	return TabUtility.Trim(str);
}

TabUtility.CleanBool = function(str)
{
	str = TabUtility.Trim(str).toLowerCase();
	
	return ( str == "" || str == "0" || str == "false" )? false : true;
}

TabUtility.CleanCol = function(str, defaultCol)
{
	var c = TabUtility.Trim(str);
	
	return ( c.length < 4 || c.charAt(0) != "#" )? defaultCol : c; 
}

TabUtility.CleanStrArray = function(str)
{
	var arr = str.split(",");
	var brr = [];
	
	for(var i = 0 ; i < arr.length ; i++)
	{
		var s = TabUtility.Trim(arr[i]);
		
		if( s != "" ) 
			brr.push(s);
	}
	
	return brr;
}

//TabUtilityScriptSetup = {"attract_frame"

TabUtility.Boot = function()
{
	var SP = TabUtilityScriptSetup;
	
	if( SP.attract_base_asset_folder ) TabUtility.ModeAttract.baseAssetFolder = SP.attract_base_asset_folder;
	if( SP.offer_base_asset_folder   ) TabUtility.ModeOffer.baseAssetFolder   = SP.offer_base_asset_folder;
	
	if( SP.attract_frame ) 		TabUtility.ModeAttract.msFrameLength 	= TabUtility.CleanNumber(SP.attract_frame, 16, 2000);
	if( SP.attract_title ) 		TabUtility.ModeAttract.titleArray 		= TabUtility.CleanStrArray(SP.attract_title);
	if( SP.attract_icons ) 		TabUtility.ModeAttract.iconHrefArray  	= TabUtility.CleanStrArray(SP.attract_icons);	
	
	if( SP.attract_timeout )	TabUtility.ModeDormant.timeoutSecs		= TabUtility.CleanNumber(SP.attract_timeout, 0, 300);
	
	if( SP.offer_font_family )	TabUtility.ModeOffer.strFontFamily 		= TabUtility.CleanStr(SP.offer_font_family);
	if( SP.offer_font_size )    TabUtility.ModeOffer.sizeText	   		= TabUtility.CleanNumber(SP.offer_font_size, 5, 100);
	if( SP.offer_heading_text ) TabUtility.ModeOffer.strHeading			= TabUtility.CleanStr(SP.offer_heading_text);
	if( SP.offer_bg_col )  		TabUtility.ModeOffer.colBackground		= TabUtility.CleanCol(SP.offer_bg_col, "#ff0000");
	if( SP.offer_text_col )		TabUtility.ModeOffer.colText			= TabUtility.CleanCol(SP.offer_text_col, "#ffffff");
	if( SP.offer_text ) 		TabUtility.ModeOffer.strText			= TabUtility.CleanStr(SP.offer_text);
	if( SP.offer_button )  		TabUtility.ModeOffer.buttonType			= TabUtility.CleanStr(SP.offer_button);
	if( SP.offer_link ) 		TabUtility.ModeOffer.hrefLink			= TabUtility.CleanStr(SP.offer_link);
	if( SP.offer_timeout )		TabUtility.ModeOffer.secsTimeout 		= TabUtility.CleanNumber(SP.offer_timeout, 0, 300);
	if( SP.offer_redirect ) 	TabUtility.ModeOffer.boolRedirect		= TabUtility.CleanBool(SP.offer_redirect) ;
	
	TabUtility.Reset();
}

TabUtility.Boot();




/*if( TabUtility.iconHrefArray[index] == "original" && TabUtility.iconHrefOriginal == null ) 
{
	if( TabUtility.iconElement.parentNode != null )
		TabUtility.iconElement.parentElement.removeChild(TabUtility.iconElement);
}

else
{
	if( TabUtility.iconElement.parentNode == null ) 
		document.querySelector("head").appendChild(TabUtility.iconElement);
		
	TabUtility.iconElement.setAttribute("type", type);
	TabUtility.iconElement.setAttribute("href", href);
}*/


