<?php

add_action( 'admin_menu', 'tabutility_add_admin_menu' );
add_action( 'admin_init', 'tabutility_settings_init' );

function tabutility_add_admin_menu(  ) 
{ 

	add_options_page( 'TabUtility', 'TabUtility', 'manage_options', 'tabutility', 'tabutility_options_page' );

}

function tabutility_options_page(  )
{ 
	global $options;
	global $defaultOptions;
	
	$options = wp_parse_args( get_option( 'tabutility_settings', $defaultOptions ), $defaultOptions);
	
	?>
	<form action='options.php' method='post'>

		<?php
		settings_fields( 'tabutility_settings_page' );
		do_settings_sections( 'tabutility_settings_page' );
		submit_button();
		?>

	</form>
	<?php

}

function tabutility_settings_init(  )
{ 
	
	

	register_setting( 'tabutility_settings_page', 'tabutility_settings' );

	add_settings_section(
		'tabutility_pluginPage_section_attract', 
		__( 'Attract Settings', 'wordpress' ), 
		'tabutility_settings_section_attract_callback', 
		'tabutility_settings_page'
	);
	
	add_settings_section(
		'tabutility_pluginPage_section_offer', 
		__( 'Offer Settings', 'wordpress' ), 
		'tabutility_settings_section_offer_callback', 
		'tabutility_settings_page'
	);
	
	add_settings_section(
		'tabutility_pluginPage_section_help', 
		__( 'Help', 'wordpress' ), 
		'tabutility_settings_section_help_callback', 
		'tabutility_settings_page'
	);

	add_settings_field( 
		'attract_frame', 
		__( 'Controls the animation speed, the rate at which each animation frame passes.', 'wordpress' ), 
		'tabutility_attract_frame_render', 
		'tabutility_settings_page', 
		'tabutility_pluginPage_section_attract' 
	);
	
	add_settings_field( 
		'attract_title', 
		__( 'Comma-separated list of what to change the page title to on each frame.  "original" represents the original page title.', 'wordpress' ), 
		'tabutility_attract_title_render', 
		'tabutility_settings_page', 
		'tabutility_pluginPage_section_attract' 
	);
	
	add_settings_field( 
		'attract_icons', 
		__( 'Comma-separated list of which icon to display each frame.  "original" represents the original icon, if any.', 'wordpress' ), 
		'tabutility_attract_icons_render', 
		'tabutility_settings_page', 
		'tabutility_pluginPage_section_attract' 
	);
	
	add_settings_field( 
		'attract_timeout', 
		__( 'How long to wait in a period of inactivity before beginning the flash.', 'wordpress' ), 
		'tabutility_attract_timeout_render', 
		'tabutility_settings_page', 
		'tabutility_pluginPage_section_attract' 
	);
	
	//-------------------------------------------------------------------
	
	add_settings_field( 
		'offer_font_family', 
		__( 'Typeface to use', 'wordpress' ), 
		'tabutility_offer_font_family_render', 
		'tabutility_settings_page', 
		'tabutility_pluginPage_section_offer' 
	);
	
	add_settings_field( 
		'offer_font_size', 
		__( 'Typeface size', 'wordpress' ), 
		'tabutility_offer_font_size_render', 
		'tabutility_settings_page', 
		'tabutility_pluginPage_section_offer' 
	);
	
	add_settings_field( 
		'offer_heading_text', 
		__( 'Heading text for the offer.', 'wordpress' ), 
		'tabutility_offer_heading_text_render', 
		'tabutility_settings_page', 
		'tabutility_pluginPage_section_offer' 
	);
	add_settings_field( 
		'offer_bg_col', 
		__( 'Color of the background on the offer popup.', 'wordpress' ), 
		'tabutility_offer_bg_col_render', 
		'tabutility_settings_page', 
		'tabutility_pluginPage_section_offer' 
	);
	add_settings_field( 
		'offer_text_col', 
		__( 'Color of all text on the offer popup.', 'wordpress' ), 
		'tabutility_offer_text_col_render', 
		'tabutility_settings_page', 
		'tabutility_pluginPage_section_offer' 
	);
	add_settings_field( 
		'offer_text', 
		__( 'Text to appear underneath the heading.', 'wordpress' ), 
		'tabutility_offer_text_render', 
		'tabutility_settings_page', 
		'tabutility_pluginPage_section_offer' 
	);
	add_settings_field( 
		'offer_button', 
		__( 'Which button graphic to show', 'wordpress' ), 
		'tabutility_offer_button_render', 
		'tabutility_settings_page', 
		'tabutility_pluginPage_section_offer' 
	);
	add_settings_field( 
		'offer_link', 
		__( 'URL that the offer button redirects to.', 'wordpress' ), 
		'tabutility_offer_link_render', 
		'tabutility_settings_page', 
		'tabutility_pluginPage_section_offer' 
	);
	add_settings_field( 
		'offer_timeout', 
		__( 'Seconds before offer expires, 0 to not show a timer.', 'wordpress' ), 
		'tabutility_offer_timeout_render', 
		'tabutility_settings_page', 
		'tabutility_pluginPage_section_offer' 
	);
	add_settings_field( 
		'offer_redirect', 
		__( 'Redirect to the specified link instead of showing the popup.', 'wordpress' ), 
		'tabutility_offer_redirect_render', 
		'tabutility_settings_page', 
		'tabutility_pluginPage_section_offer' 
	);


	

}

function tabutility_settings_section_attract_callback(  ) { 

	echo __( 'These settings are to attract attention:', 'wordpress' );
}

function tabutility_settings_section_offer_callback(  ) { 

	echo __( 'These settings present an offer to the user:', 'wordpress' );
}

function tabutility_settings_section_help_callback(  ) { 

	?>
	<p>
	Place this shortcode on every page where you want to use TabUtility:
	</p>
	<p>
	[tabutility]
	</p>
	<p>
	You can override the general settings on this page by using shortcode attributes, for example:
	</p>
	<p>
	[tabutility offer_redirect="true" offer_bg_col="#ff0000" ]
	</p>
	
	
	<?php
}

$defaultOptions = array(
			"attract_frame" 		=> "500",
			"attract_title" 		=> "original,original,Hey!,Special Offer!",
			"attract_icons" 		=> "original,original,info,info",
			"attract_timeout" 	=> "10",
			
			"offer_font_family" 	=> 'Arial, Helvetica, sans-serif',
			"offer_font_size" 	=> '12',
			"offer_heading_text" 	=> 'Special Offer',
			"offer_bg_col" 		=> '#ff0000',
			"offer_text_col" 		=> '#ffffff',
			"offer_text" 			=> 'Click here for a limited time offer',
			"offer_button" 		=> 'salered',
			"offer_link" 			=> 'http://www.example.com',
			"offer_timeout" 		=> '30',
			"offer_redirect" 		=> '',
    		);
			
$options = array();			


function tabutility_attract_frame_render(  )
{ 
	global $options;
	echo "<label><input type='number' min='1' max='5000' name='tabutility_settings[attract_frame]'  value='".$options['attract_frame']."' />attract_frame</label>";
	
}

function tabutility_attract_title_render(  )
{ 
	global $options;
	echo "<label><input type='text' size='100' name='tabutility_settings[attract_title]'  value='".$options['attract_title']."' />attract_title</label>";
	
}

function tabutility_attract_icons_render(  )
{ 
	global $options;
	echo "<label><input id='tabutility_icons' size='100' type='text' name='tabutility_settings[attract_icons]'  value='".$options['attract_icons']."' />attract_icons</label>";
	
	$paths = list_files( plugin_dir_path( __FILE__ )."icons" );

	foreach($paths as $path )
	{
		$name = basename($path, ".png");
		$path = basename($path);
		
		$url = plugin_dir_url( __FILE__ )."icons/".$path;
 	
		print <<<END
<img  src="{$url}" style="border:1px solid black;margin:1px" onclick="javascript:document.getElementById('tabutility_icons').value += ',{$name}'" />
END;
	}
	
	require("includeIcons.php");
	
}

function tabutility_attract_timeout_render(  )
{ 
	global $options;
	echo "<label><input type='number' min='0' max='300' name='tabutility_settings[attract_timeout]'  value='".$options['attract_timeout']."' />attract_timeout</label>";
}

//-------------------------------------------------------------

function tabutility_offer_font_family_render(  )
{ 
	global $options;
	
	echo "<label><select name='tabutility_settings[offer_font_family]' value='".$options['offer_font_family']."' >";
 	?>
	<option style='font-family:Arial, Helvetica, sans-serif' 	  value='Arial, Helvetica, sans-serif'		<?php selected( $options['offer_font_family'], "Arial, Helvetica, sans-serif" );        ?> >Arial</option>
	<option style='font-family:"Courier New", Courier, monospace' value='"Courier New", Courier, monospace' <?php selected( $options['offer_font_family'], "\"Courier New\", Courier, monospace" ); ?> >Courier</option>
	<?php
	
	require("includeFonts1.php");
	
	echo "</select>offer_font_family</label>";
	
	require("includeFonts2.php");
	
	
}

function tabutility_offer_font_size_render(  )
{ 
	global $options;
	echo "<label><input type='number' min='0' max='300' name='tabutility_settings[offer_font_size]'  value='".$options['offer_font_size']."' />offer_font_size</label>";
}

function tabutility_offer_heading_text_render(  )
{ 
	global $options;
	echo "<label><input type='text' size='100' name='tabutility_settings[offer_heading_text]'  value='".$options['offer_heading_text']."' />offer_heading_text</label>";
}

function tabutility_offer_bg_col_render(  )
{ 
	global $options;
	echo "<label><input type='color' name='tabutility_settings[offer_bg_col]'  value='".$options['offer_bg_col']."' />offer_bg_col<label>";
}

function tabutility_offer_text_col_render(  )
{ 
	global $options;
	echo "<label><input type='color'  name='tabutility_settings[offer_text_col]'  value='".$options['offer_text_col']."' />offer_text_col</label>";
}

function tabutility_offer_text_render(  )
{ 
	global $options;
	echo "<label><input type='text' size='100' name='tabutility_settings[offer_text]'  value='".$options['offer_text']."' />offer_text</label>";
}

function tabutility_offer_button_render(  )
{ 
	global $options;
	echo "<label><input id='tabutility_buttons' type='text' size='100' name='tabutility_settings[offer_button]'  value='".$options['offer_button']."' />offer_button</label>";
	
	$paths = list_files( plugin_dir_path( __FILE__ )."buttons" );

	foreach($paths as $path )
	{
		$name = basename($path, ".png");
		$path = basename($path);
		
		$url = plugin_dir_url( __FILE__ )."buttons/".$path;
 	
		print <<<END
<img  src="{$url}" style="border:1px solid black;margin:1px;width:40px" onclick="javascript:document.getElementById('tabutility_buttons').value = '{$name}'" />
END;
	}
	
	require("includeButton.php");
}

function tabutility_offer_link_render(  )
{ 
	global $options;
	echo "<label><input type='text' size='100' name='tabutility_settings[offer_link]'  value='".$options['offer_link']."' />offer_link</label>";
}

function tabutility_offer_timeout_render(  )
{ 
	global $options;
	echo "<label><input type='number' min='0' max='300' name='tabutility_settings[offer_timeout]'  value='".$options['offer_timeout']."' />offer_timeout</label>";
}

function tabutility_offer_redirect_render(  )
{ 
	global $options;
	
	?>
	<label>
	<input type='checkbox' value='true' name='tabutility_settings[offer_redirect]' <?php checked( $options['offer_redirect'] , 'true' ); ?>  />
	offer_redirect</label>
	<?php


}

/*


			
	
*/














	?>